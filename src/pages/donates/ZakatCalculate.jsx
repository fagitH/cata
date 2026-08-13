import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../../assets/image/Banner_orphan.jpg';

function ZakatCalculator() {
  const navigate = useNavigate();
  const campaignTitle = 'Zakat & Sadaqah Jariyah';

  // Navigation step state (1: Amount & Calc, 2: Details, 3: Payment)
  const [currentStep, setCurrentStep] = useState(1);

  // Zakat Calculator Inputs
  const [cashInHand, setCashInHand] = useState(0);
  const [cashInBank, setCashInBank] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [valueofStock, setValueofStock] = useState(0);
  const [loansGiven, setLoansGiven] = useState(0);
  const [loansTaken, setLoansTaken] = useState(0);

  // Nisab threshold values
  const silverNisab = 612.85;
  const goldNisab = 7644.00;

  // Calculation Logic
  const totalAssets = Number(cashInHand) + Number(cashInBank) + Number(investments) + Number(valueofStock) + Number(loansGiven);
  const netWealth = Math.max(0, totalAssets - Number(loansTaken));
  const zakatPayable = netWealth >= silverNisab ? netWealth * 0.025 : 0;

  // Form States
  const [contribution, setContribution] = useState('1.00');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  
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
    email: ''
  });

  const paymentMethodLabels = {
    bank_transfer: 'Direct bank transfer',
    acleda_khqr: 'ACLEDA PAY KHQR',
    acleda_card: 'ACLEDA PAY Credit/Debit Card',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyToContribution = () => {
    setContribution(zakatPayable.toFixed(2));
  };

  const handleNext = (e) => {
    e?.preventDefault();
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleDonateSubmit = (e) => {
    e?.preventDefault();

    if (!captchaChecked) {
      alert("Please confirm you are not a robot.");
      return;
    }

    const dynamicOrderId = Math.floor(100000 + Math.random() * 900000).toString();
    const currentDateFormatted = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTotal = `$${parseFloat(contribution || 0).toFixed(2)}`;

    const billingAddressLines = [
      `${donorDetails.firstName} ${donorDetails.lastName}`.trim(),
      donorDetails.companyName,
      donorDetails.streetAddress1,
      donorDetails.streetAddress2,
      `${donorDetails.city}, ${donorDetails.state} ${donorDetails.postcode}`.trim(),
      donorDetails.country,
      donorDetails.phone,
      donorDetails.email,
    ].filter(Boolean);

    navigate(`/donate-payment/received/${dynamicOrderId}`, {
      state: {
        donationNumber: dynamicOrderId,
        date: currentDateFormatted,
        total: formattedTotal,
        paymentMethod: paymentMethodLabels[paymentMethod] || paymentMethod,
        itemTitle: campaignTitle,
        billingDetails: {
          lines: billingAddressLines,
        },
      },
    });
  };

  return (
    <div className="min-h-[150px] font-sans bg-slate-50 text-slate-700">
  {/* ===== HERO BANNER ===== */}
  <section className="relative w-full h-48 sm:h-54 md:h-80 bg-[#0a3b80] text-white flex items-center justify-center overflow-hidden">
    {/* Background Image with Low Opacity */}
    <img
      src={banner}
      alt="Hero Background"
      className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none opacity-35"
    />
  </section>

  <div className="max-w-4xl mx-auto space-y-8 mt-8 px-4">
    {/* HEADER */}
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-light tracking-tight sm:text-4xl text-slate-800">
        Zakat &amp; Sadaqah Jariyah Calculator
      </h1>
      <p className="max-w-xl mx-auto text-sm text-slate-500">
        Ensure your contribution matches the nisab accurately with our simple Zakat al-Mal calculator.
      </p>
    </div>

    {/* STEPPER PROGRESS BAR */}
    <div className="p-4 bg-white border shadow-xs rounded-xl border-slate-200">
      <div className="flex items-center justify-center gap-8 text-xs font-medium text-slate-500">
        <button type="button" onClick={() => setCurrentStep(1)} className={`flex items-center gap-2 ${currentStep === 1 ? 'text-emerald-600 font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
          <span>Amount</span>
        </button>
        <button type="button" onClick={() => setCurrentStep(2)} className={`flex items-center gap-2 ${currentStep === 2 ? 'text-emerald-600 font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
          <span>Details</span>
        </button>
        <button type="button" onClick={() => setCurrentStep(3)} className={`flex items-center gap-2 ${currentStep === 3 ? 'text-emerald-600 font-bold' : ''}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
          <span>Payment</span>
        </button>
      </div>
    </div>

    {/* STEP 1: CALCULATOR & AMOUNT SELECTION */}
    {currentStep === 1 && (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="p-5 space-y-1 text-white rounded-lg shadow-sm bg-amber-500">
            <span className="text-xs font-semibold tracking-wider uppercase opacity-90">Silver Nisab</span>
            <div className="text-2xl font-bold">${silverNisab.toFixed(2)} USD</div>
            <p className="text-xs opacity-80">(Based on 595 grams of Silver)</p>
          </div>

          <div className="p-5 space-y-1 text-white rounded-lg shadow-sm bg-sky-600">
            <span className="text-xs font-semibold tracking-wider uppercase opacity-90">Gold Nisab</span>
            <div className="text-2xl font-bold">${goldNisab.toFixed(2)} USD</div>
            <p className="text-xs opacity-80">(Based on 87.48 grams / 21 Karat)</p>
          </div>
        </div>

        <div className="overflow-hidden bg-white border shadow-xs rounded-xl border-slate-200">
          <div className="px-6 py-4 border-b bg-slate-100 border-slate-200">
            <h2 className="text-lg font-medium text-slate-800">Calculate Your Zakat</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-wider uppercase text-emerald-600">1. Cash &amp; Bank Balances</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Cash In Hand ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={cashInHand || ''}
                    onChange={(e) => setCashInHand(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Cash In Bank ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={cashInBank || ''}
                    onChange={(e) => setCashInBank(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-wider uppercase text-sky-600">2. Investments &amp; Business Assets</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Investments ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={investments || ''}
                    onChange={(e) => setInvestments(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Value of Stock / Inventory ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={valueofStock || ''}
                    onChange={(e) => setValueofStock(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-wider uppercase text-rose-500">3. Loans &amp; Liabilities</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Loans Given ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={loansGiven || ''}
                    onChange={(e) => setLoansGiven(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Loans Taken ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={loansTaken || ''}
                    onChange={(e) => setLoansTaken(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 p-5 border rounded-lg bg-slate-50 border-slate-200 sm:flex-row">
              <div>
                <span className="block text-xs font-semibold tracking-wider uppercase text-slate-500">Net Wealth</span>
                <span className="text-xl font-bold text-slate-800">${netWealth.toFixed(2)} USD</span>
              </div>

              <div className="text-right">
                <span className="block text-xs font-semibold tracking-wider uppercase text-slate-500">Calculated Zakat (2.5%)</span>
                <span className="text-2xl font-bold text-emerald-600">${zakatPayable.toFixed(2)} USD</span>
              </div>

              <button
                type="button"
                onClick={handleApplyToContribution}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-4 py-2.5 rounded-md transition-colors"
              >
                Apply to Donation
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-md p-6 mx-auto space-y-4 text-center bg-white border shadow-xs rounded-xl border-slate-200">
          <label className="block text-xs font-bold text-slate-800">
            Your Contribution <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center gap-2">
            <span className="text-base font-bold text-slate-700">$</span>
            <input
              type="number"
              min="1"
              placeholder="1.00"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              className="w-40 px-3 py-2 text-base font-semibold text-center border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-md transition-colors"
          >
            Next Step »
          </button>
        </div>
      </>
    )}

    {/* STEP 2: DONOR DETAILS FORM */}
    {currentStep === 2 && (
      <form onSubmit={handleNext} className="p-6 space-y-6 bg-white border shadow-xs rounded-xl border-slate-200 sm:p-8">
        <h2 className="pb-4 text-2xl font-light border-b text-slate-800 border-slate-100">
          Donor details
        </h2>

        <div className="space-y-4">
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
                className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-700">
              Company name (optional)
            </label>
            <input
              type="text"
              name="companyName"
              value={donorDetails.companyName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full px-3 py-2 text-sm bg-white border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Cambodia">Cambodia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Singapore">Singapore</option>
              <option value="United States">United States</option>
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
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="text"
              name="streetAddress2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={donorDetails.streetAddress2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

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
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

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
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleBack}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium px-5 py-2.5 rounded-md transition-colors"
          >
            « Back
          </button>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            Next »
          </button>
        </div>
      </form>
    )}

    {/* STEP 3: PAYMENT */}
    {currentStep === 3 && (
      <form onSubmit={handleDonateSubmit} className="space-y-6">
        <div className="p-6 space-y-6 bg-white border rounded-lg shadow-xs border-slate-300 sm:p-8">
          
          {/* YOUR DONATION SUMMARY TABLE */}
          <div className="space-y-3">
            <h2 className="text-2xl font-normal text-slate-800">Your Donation</h2>
            <div className="text-sm border divide-y border-slate-300 divide-slate-300">
              <div className="flex justify-between items-center px-4 py-2.5 bg-slate-50">
                <span className="text-slate-700">Zakat</span>
                <span className="font-medium text-slate-800">${parseFloat(contribution || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5 font-bold text-slate-800">
                <span>Donation Amount</span>
                <span>${parseFloat(contribution || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* RECAPTCHA BOX */}
          <div className="inline-flex items-center gap-4 p-3 border rounded shadow-xs border-slate-300 bg-slate-50 w-fit">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={captchaChecked}
                onChange={(e) => setCaptchaChecked(e.target.checked)}
                className="w-6 h-6 text-blue-600 rounded cursor-pointer border-slate-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">I'm not a robot</span>
            </label>
            <div className="flex flex-col items-center justify-center pl-4 border-l border-slate-200 text-[10px] text-slate-400">
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>reCAPTCHA</span>
              <div className="flex gap-1 text-[8px]">
                <a href="#" className="hover:underline">Privacy</a>
                <span>-</span>
                <a href="#" className="hover:underline">Terms</a>
              </div>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="pt-2 space-y-4">
            
            {/* DIRECT BANK TRANSFER */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm font-medium cursor-pointer text-slate-800">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>Direct bank transfer</span>
              </label>

              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 space-y-1 font-sans text-xs leading-relaxed rounded-md bg-slate-200/60 sm:p-5 text-slate-700">
                  <p className="font-semibold tracking-wide uppercase text-slate-800">
                    CAMBODIAN AMANAH TAKAFUL ASSOCIATION – CATA
                  </p>
                  <p><span className="font-medium">Contact person:</span> Mr. Saman Sen, Executive Director</p>
                  <p><span className="font-medium">Contact number:</span> +855 89 333 782 / +855 69 939 398</p>
                  <p><span className="font-medium">Email:</span> sensaman@takafulcambodia.org; saman.sen089@gmail.com</p>
                  <p><span className="font-medium">Address:</span> #116D, Russian Federation, Sangkat Srah Chak, Khan Daun Penh, Phnom Penh, Cambodia</p>
                  <p><span className="font-medium">Website:</span> <a href="http://www.takafulcambodia.org" target="_blank" rel="noreferrer" className="underline hover:text-slate-900">www.takafulcambodia.org</a></p>
                </div>
              )}
            </div>

            {/* ACLEDA PAY KHQR */}
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="acleda_khqr"
                name="paymentMethod"
                value="acleda_khqr"
                checked={paymentMethod === 'acleda_khqr'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600 cursor-pointer focus:ring-blue-500"
              />
              <label htmlFor="acleda_khqr" className="flex items-center gap-2 text-sm font-medium cursor-pointer text-slate-800">
                <span>ACLEDA PAY KHQR</span>
                <span className="bg-red-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded border border-red-700 tracking-tighter">
                  KHQR
                </span>
              </label>
            </div>

            {/* ACLEDA PAY CREDIT/DEBIT CARD */}
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="acleda_card"
                name="paymentMethod"
                value="acleda_card"
                checked={paymentMethod === 'acleda_card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-blue-600 cursor-pointer focus:ring-blue-500"
              />
              <label htmlFor="acleda_card" className="flex flex-wrap items-center gap-2 text-sm font-medium cursor-pointer text-slate-800">
                <span>ACLEDA PAY</span>
                <span className="text-xs font-normal text-slate-500">Credit/Debit Card</span>
                <div className="flex items-center gap-1">
                  <span className="bg-blue-900 text-white font-bold text-[9px] px-1 rounded italic">VISA</span>
                  <span className="bg-red-500 text-white font-bold text-[9px] px-1 rounded">MC</span>
                  <span className="bg-blue-600 text-white font-bold text-[9px] px-1 rounded">JCB</span>
                  <span className="bg-emerald-600 text-white font-bold text-[9px] px-1 rounded">UnionPay</span>
                </div>
              </label>
            </div>

          </div>

          {/* PRIVACY POLICY DISCLAIMER */}
          <p className="pt-2 text-xs leading-normal text-slate-600">
            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
            <a href="#" className="underline text-rose-700 hover:text-rose-800">
              privacy policy
            </a>.
          </p>

          {/* ACTION BUTTON (DONATE NOW) */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-[#7A4B92] hover:bg-[#683e7d] text-white text-sm font-semibold px-6 py-2 rounded shadow-xs transition-colors cursor-pointer"
            >
              Donate now
            </button>
          </div>

        </div>

        {/* BACK BUTTON */}
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 text-xs font-semibold transition-colors rounded cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700"
          >
            « Back
          </button>
        </div>
      </form>
    )}

    {/* INFORMATIONAL TEXT */}
    <div className="p-6 space-y-6 text-xs leading-relaxed bg-white border shadow-xs rounded-xl border-slate-200 sm:p-8 sm:text-sm text-slate-600">
      
      <div className="space-y-3">
        <h2 className="text-2xl font-light tracking-tight sm:text-3xl text-slate-800">
          Calculate zakat for 2024 with our easy to use zakat calculator
        </h2>
        
        <h3 className="text-xl font-light tracking-tight sm:text-2xl text-slate-800">
          How to calculate Zakat: Use our Zakat Calculator to see how much you owe this year.
        </h3>

        <p>
          To use our Zakat calculator, enter all the assets that have been in your possession over the course of a lunar year into the Zakat calculator. This will then give you the total amount of the Zakat you owe.
        </p>

        <p>
          Breaking your assets down into different categories makes the Zakat calculation process easier. The process presented on the calculator is broken up by Zakatable assets which include gold, silver, cash, savings, business assets etc. and deductible liabilities money you owe, other outgoings due so you can calculate the Zakat you owe easily. The amount of Zakat that appears will be what you need to pay.
        </p>

        <p>
          Zakat, one of the Five Pillars of Islam, is a form of almsgiving treated in Islam as a religious obligation or tax, which, by Quranic ranking, is next after prayer in importance. As a religious obligation, it is deeply embedded in the Islamic faith, and its calculation is an essential practice for Muslims worldwide. With the advent of technology, the process has been simplified through the use of a Zakat Calculator, making it easier for Muslims to fulfill this crucial duty.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-light tracking-tight sm:text-3xl text-slate-800">
          Learn how to calculate zakat, we make it simple
        </h2>

        <p>
          Calculating Zakat involves several steps and considerations to ensure one fulfills this religious obligation accurately. The process starts by evaluating all assets subject to Zakat, which include cash, gold, silver, business inventory, and other income-generating assets. The Zakat Calculator 2024 simplifies this task by providing a user-friendly interface where individuals can input their asset values, and the calculator will automatically compute the Zakat due.
        </p>

        <p>
          To calculate Zakat, one must first determine the Nisab value, which is the minimum amount of wealth a Muslim must possess before they are liable to pay Zakat. This value is typically based on the current price of gold or silver. Once the Nisab is determined, Muslims who own wealth above this threshold must pay 2.5% of their total qualifying assets as Zakat.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-light tracking-tight sm:text-3xl text-slate-800">
          Zakat calculator for gold: Use our gold zakat calculator to see what you owe
        </h2>

        <p>
          Gold is a significant asset in Zakat calculation due to its intrinsic value and common possession among Muslims. The Zakat Calculator on Gold simplifies the computation by considering the current gold prices and the weight of the gold owned. Whether you have gold in the form of jewelry, coins, or bars, the Gold Zakat Calculator allows you to input the total weight in grams or tolas and calculates the Zakat due based on the current gold Nisab value.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-light tracking-tight sm:text-3xl text-slate-800">
          Zakat calculator for cash: Use our cash zakat calculator to see what you owe
        </h2>

        <p>
          Zakat on cash involves assessing all liquid assets, including money in bank accounts, savings, and even cash at hand. The UK Zakat Calculator provides an easy-to-use platform for UK residents, ensuring they can calculate their Zakat on cash accurately, taking into account any region-specific considerations.
        </p>

        <p>
          To calculate Zakat on cash, one must sum up all liquid assets and apply the 2.5% rate. This includes checking and savings account balances, cash at home, and any other liquid assets. It is crucial to ensure that the total amount meets or exceeds the Nisab threshold for Zakat to be obligatory.
        </p>
      </div>

    </div>

  </div>
</div>
  );
}

export default ZakatCalculator;