import React, { useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { api } from '../../utils/api';

export default function Payment() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const campaignTitle = location.state?.campaignTitle || (id ? id.replaceAll('-', ' ') : 'General Donation');
  const queryAmount = searchParams.get('amount');
  const initialAmount = location.state?.amount || (queryAmount ? parseFloat(queryAmount) : 1.0);

  const [contribution, setContribution] = useState(initialAmount);
  const [paymentMethod, setPaymentMethod] = useState(location.state?.paymentMethod || 'bank_transfer');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [khqrSession, setKhqrSession] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');

  const [donorDetails, setDonorDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Cambodia',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    ...(location.state?.donorDetails || {}),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();

    if (!captchaChecked) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        donor_name: `${donorDetails.firstName} ${donorDetails.lastName}`.trim(),
        donor_email: donorDetails.email,
        donor_phone: donorDetails.phone,
        donor_address: {
          company: donorDetails.companyName,
          street1: donorDetails.streetAddress1,
          street2: donorDetails.streetAddress2,
          city: donorDetails.city,
          state: donorDetails.state,
          postcode: donorDetails.postcode,
          country: donorDetails.country,
        },
        amount: parseFloat(contribution || 0),
        payment_method: paymentMethod,
        campaign_title: campaignTitle,
      };

      if (paymentMethod === 'acleda_card') {
        const response = await api.post('/acleda/card-session', payload);
        const redirectForm = response?.redirect_form;

        if (!redirectForm?.action_url || !redirectForm?.fields) {
          throw new Error('ACLEDA did not provide a payment session.');
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = redirectForm.action_url;

        Object.entries(redirectForm.fields).forEach(([name, value]) => {
          const field = document.createElement('input');
          field.type = 'hidden';
          field.name = name;
          field.value = String(value ?? '');
          form.appendChild(field);
        });

        document.body.appendChild(form);
        form.submit();
        return;
      }

      if (paymentMethod === 'acleda_khqr') {
        // The bank returns the KHQR payload; it is encoded in this browser so
        // it is never sent to an image-rendering service.
        const response = await api.post('/acleda/qr-session', payload);
        if (!response?.transaction_id || !response?.qr_value) {
          throw new Error('ACLEDA did not provide a KHQR payment session.');
        }

        const qrImage = await QRCode.toDataURL(response.qr_value, {
          width: 320,
          margin: 2,
          errorCorrectionLevel: 'M',
        });

        setKhqrSession({ ...response, qrImage });
        setPaymentStatus('Waiting for verified payment confirmation…');

        const pollingStartedAt = Date.now();
        const pollStatus = async () => {
          try {
            const donation = await api.get(`/acleda/donations/${response.transaction_id}/status`);
            if (donation.status === 'completed') {
              navigate(`/donate-payment/received/${response.transaction_id}`, {
                state: { paymentVerified: true },
              });
              return;
            }
            if (donation.status === 'failed') {
              setPaymentStatus('The payment was not completed. Please try again.');
              return;
            }
          } catch {
            // Keep the QR visible; temporary network failures must not be
            // reported as a failed bank payment.
          }

          if (Date.now() - pollingStartedAt < 15 * 60 * 1000) {
            window.setTimeout(pollStatus, 3000);
          } else {
            setPaymentStatus('Payment confirmation timed out. Please check your transaction before trying again.');
          }
        };

        window.setTimeout(pollStatus, 3000);
        return;
      }

      const res = await api.post('/donations', payload);

      const paymentMethodLabels = {
        bank_transfer: 'Direct bank transfer',
        acleda_khqr: 'ACLEDA PAY KHQR',
        acleda_card: 'ACLEDA PAY (Credit/Debit Card)',
      };

      const billingAddressLines = [
        `${donorDetails.firstName} ${donorDetails.lastName}`.trim(),
        donorDetails.companyName,
        donorDetails.streetAddress1,
        donorDetails.streetAddress2,
        [donorDetails.city, donorDetails.state, donorDetails.postcode].filter(Boolean).join(', '),
        donorDetails.country,
        donorDetails.phone ? `Phone: ${donorDetails.phone}` : '',
        donorDetails.email ? `Email: ${donorDetails.email}` : '',
      ].filter((line) => line && line.trim() !== '');

      const currentDateFormatted = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      navigate(`/donate-payment/received/${res.transaction_id}`, {
        state: {
          donationNumber: res.transaction_id,
          date: currentDateFormatted,
          total: `$${Number(contribution || 0).toFixed(2)}`,
          paymentMethod: paymentMethodLabels[paymentMethod] || paymentMethod,
          itemTitle: campaignTitle,
          billingDetails: {
            lines: billingAddressLines,
          },
        },
      });
    } catch (err) {
      alert(err.message || 'Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 font-sans bg-slate-50 text-slate-700">
      <div className="max-w-5xl mx-auto space-y-8">
        {khqrSession && (
          <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xs">
            <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">ACLEDA PAY KHQR</span>
            <h1 className="mt-4 text-2xl font-semibold text-slate-900">Complete your donation</h1>
            <p className="mt-2 text-sm text-slate-600">Scan this code with your bank app. We will show your receipt only after ACLEDA verifies the payment.</p>
            <img src={khqrSession.qrImage} alt="ACLEDA KHQR payment code" className="mx-auto mt-5 w-full max-w-xs rounded-lg border border-slate-200" />
            <p className="mt-4 text-lg font-bold text-slate-900">${Number(contribution || 0).toFixed(2)} USD</p>
            <p className="mt-2 text-xs text-slate-500">Transaction: {khqrSession.transaction_id}</p>
            <p className="mt-4 text-sm font-medium text-amber-700" role="status">{paymentStatus}</p>
          </section>
        )}

        {!khqrSession && <>
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">Checkout</h1>
          <p className="mt-1 text-xs text-slate-500">Complete your contribution to support this cause.</p>
        </div>

        <form onSubmit={handleDonateSubmit} className="grid items-start grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="p-6 space-y-6 bg-white border shadow-xs rounded-xl border-slate-200 sm:p-8 lg:col-span-7">
            <h2 className="text-xl font-medium text-slate-800">Donor Details</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="firstName"
                  value={donorDetails.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="lastName"
                  value={donorDetails.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-700">Company name (optional)</label>
              <input
                type="text"
                name="companyName"
                value={donorDetails.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-700">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={donorDetails.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm bg-white border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cambodia">Cambodia</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Street address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="streetAddress1"
                placeholder="House number and street name"
                value={donorDetails.streetAddress1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="streetAddress2"
                placeholder="Apartment, suite, unit, etc. (optional)"
                value={donorDetails.streetAddress2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={donorDetails.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">
                  State / County <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="state"
                  value={donorDetails.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">
                  Postcode / ZIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="postcode"
                  value={donorDetails.postcode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={donorDetails.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-700">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={donorDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-200">
              <h2 className="text-xl font-medium text-slate-800">Your Donation</h2>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Your Contribution <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 px-3 py-2 border rounded-md border-slate-300 focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="font-medium text-slate-500">$</span>
                  <input
                    type="number"
                    min="1"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="w-full font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 space-y-2 text-sm border-t border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Cause</span>
                  <span className="font-medium text-right capitalize text-slate-800">{campaignTitle}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-bold border-t border-slate-100 text-slate-900">
                  <span>Total Amount</span>
                  <span>${parseFloat(contribution || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 bg-white border shadow-xs rounded-xl border-slate-200">
              <h2 className="text-lg font-medium text-slate-800">Payment Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 transition-colors border rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-800">Direct bank transfer</span>
                </label>

                {paymentMethod === 'bank_transfer' && (
                  <div className="space-y-1.5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                    <p className="font-bold text-slate-800">CAMBODIAN AMANAH TAKAFUL ASSOCIATION � CATA</p>
                    <p><span className="font-medium">Contact:</span> Mr. Saman Sen</p>
                    <p><span className="font-medium">Phone:</span> +855 89 333 782 / +855 69 939 398</p>
                    <p><span className="font-medium">Email:</span> sensaman@takafulcambodia.org</p>
                    <p><span className="font-medium">Address:</span> #116D, Russian Federation, Sangkat Srah Chak, Khan Daun Penh, Phnom Penh, Cambodia</p>
                  </div>
                )}

                <label className="flex items-center gap-3 p-3 transition-colors border rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="acleda_khqr"
                    checked={paymentMethod === 'acleda_khqr'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    ACLEDA PAY KHQR <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">KHQR</span>
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 transition-colors border rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="acleda_card"
                    checked={paymentMethod === 'acleda_card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-800">
                    ACLEDA PAY <span className="text-xs font-normal text-slate-500">(Credit/Debit Card)</span>
                  </span>
                </label>
              </div>

              {paymentMethod === 'acleda_khqr' && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-relaxed text-red-800">
                  Select KHQR here, then click Donate Now to create a secure, time-limited ACLEDA payment QR code.
                </p>
              )}

              {paymentMethod === 'acleda_card' && (
                <p className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs leading-relaxed text-blue-800">
                  You will be securely redirected to ACLEDA PAY to complete your card payment.
                </p>
              )}

              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer border-slate-200 bg-slate-50">
                  <input
                    type="checkbox"
                    checked={captchaChecked}
                    onChange={(e) => setCaptchaChecked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-slate-700">I'm not a robot</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-[#7A4B92] py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#683e7d] disabled:opacity-50"
              >
                {loading ? 'Connecting to ACLEDA...' : paymentMethod === 'acleda_card' ? 'Pay by Card' : 'Donate Now'}
              </button>
            </div>
          </div>
        </form>
        </>}
      </div>
    </div>
  );
}
