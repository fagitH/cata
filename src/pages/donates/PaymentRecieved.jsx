import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function OrderReceived() {
  const location = useLocation();

  // Purely dynamic state extraction without static hardcoded defaults
  const orderData = location.state;

  if (!orderData) {
    return (
      <div className="max-w-4xl p-10 mx-auto text-center text-slate-600">
        <p>No order details found.</p>
        <Link to="/" className="inline-block mt-4 underline text-amber-600">
          Return to Home
        </Link>
      </div>
    );
  }

  const {
    donationNumber,
    date,
    total,
    paymentMethod,
    itemTitle,
    billingDetails,
  } = orderData;

  return (
    <div className="min-h-screen font-sans bg-white text-slate-800">

      {/* MAIN CONTENT AREA */}
      <main className="max-w-4xl px-4 py-10 mx-auto space-y-8">
        
        {/* TITLES */}
        <section className="space-y-2">
          <h1 className="text-3xl font-normal text-slate-800">Order received</h1>
          <h2 className="text-2xl font-normal text-slate-800">Thank you for your donation</h2>
          <p className="pt-2 text-xs text-slate-600">
            Thank you. Your donation has been received.
          </p>
        </section>

        {/* ORDER SUMMARY META BAR (DYNAMIC) */}
        <div className="grid grid-cols-2 gap-4 py-4 text-xs border-dashed border-y border-slate-300 sm:grid-cols-4">
          <div>
            <span className="block text-[10px] font-medium uppercase text-slate-400">DONATION NUMBER:</span>
            <span className="font-bold text-slate-800">{donationNumber}</span>
          </div>
          <div>
            <span className="block text-[10px] font-medium uppercase text-slate-400">DATE:</span>
            <span className="font-bold text-slate-800">{date}</span>
          </div>
          <div>
            <span className="block text-[10px] font-medium uppercase text-slate-400">TOTAL:</span>
            <span className="font-bold text-slate-800">{total}</span>
          </div>
          <div>
            <span className="block text-[10px] font-medium uppercase text-slate-400">PAYMENT METHOD:</span>
            <span className="font-bold text-slate-800">{paymentMethod}</span>
          </div>
        </div>

        {/* BANK DETAILS SECTION */}
        <section className="pt-2 space-y-3">
          <p className="text-xs text-slate-600">Please transfer to our bank account below.</p>
          <h2 className="text-2xl font-normal text-slate-800">Our bank details</h2>
          <h3 className="text-xl font-bold text-slate-900">
            Cambodian Amanah Takaful Association:
          </h3>

          <div className="flex flex-wrap gap-8 pt-2 text-xs">
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">BANK:</span>
              <span className="font-semibold text-slate-800">Advanced Bank of Asia Ltd</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">ACCOUNT NUMBER:</span>
              <span className="font-bold text-slate-800">800002025</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">BIC:</span>
              <span className="font-semibold text-slate-800">ABAAKHPP</span>
            </div>
          </div>
        </section>

        {/* DONATION DETAILS TABLE (DYNAMIC) */}
        <section className="pt-4 space-y-4">
          <h2 className="text-2xl font-normal text-slate-800">Donation details</h2>

          <div className="overflow-x-auto border border-slate-300">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-white border-b border-slate-300">
                  <th className="p-3 font-bold text-slate-800">Donation</th>
                  <th className="p-3 font-bold text-slate-800">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium text-red-600 underline">
                    {itemTitle}
                  </td>
                  <td className="p-3 text-slate-800">{total}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Subtotal:</td>
                  <td className="p-3 font-semibold text-slate-800">{total}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Total:</td>
                  <td className="p-3 font-semibold text-slate-800">{total}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-800">Payment method:</td>
                  <td className="p-3 text-slate-700">{paymentMethod}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* BILLING ADDRESS SECTION (DYNAMIC) */}
        <section className="pt-2 space-y-4">
          <h2 className="text-2xl font-normal text-slate-800">Billing address</h2>

          <div className="max-w-xl p-4 space-y-1 text-xs border border-slate-200 text-slate-700">
            {billingDetails?.lines?.map((line, idx) => (
              <p key={idx} className={idx === 0 ? 'font-semibold text-slate-800' : ''}>
                {line}
              </p>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}

export default OrderReceived;