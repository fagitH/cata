import React, { useEffect, useState } from 'react';
import heroBg from '../assets/image/partnershipBanner.png';
import { api, toAssetUrl } from '../utils/api.js';

function PartnerLogo({ partner, maxHeight = 'max-h-24' }) {
  const [errored, setErrored] = useState(false);
  const src = partner.logo ? toAssetUrl(partner.logo) : null;

  if (!src || errored) {
    return (
      <div className="flex items-center justify-center w-full h-full rounded-lg bg-slate-100 p-3 text-center text-xs font-medium text-slate-500 leading-tight">
        {partner.name}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={partner.name}
      className={`object-contain max-w-full ${maxHeight}`}
      onError={() => setErrored(true)}
    />
  );
}

export default function PartnershipPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/partners')
      .then((data) => setPartners(Array.isArray(data) ? data : []))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  }, []);

  const organizations = partners.filter((p) => p.type === 'organization');
  const companies = partners.filter((p) => p.type === 'company');
  const internationalPartners = partners.filter((p) => p.type === 'international');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ===== HERO BANNER SECTION ===== */}
      <section className="relative bg-[#0b3d3a] text-white py-16 sm:py-20 px-4 overflow-hidden">
        {/* Background Image with Low Opacity */}
        <img
          src={heroBg}
          alt="Partnership Background"
          className="absolute inset-0 object-cover object-center w-full h-full pointer-events-none opacity-35"
        />

        {/* Content Layer */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
            OUR PARTNERS
          </span> */}
          <h1 className="text-3xl font-extrabold tracking-tight text-sky-600 sm:text-6xl uppercase drop-shadow-sm">
            Partnership
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-slate-200">
            Building strong alliances to advance community welfare and ethical financial solutions.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="px-4 py-2 mx-auto space-y-2 max-w-7xl sm:py-6">

        {/* Overview Section */}
        <div className="py-12">
          <div className="max-w-4xl px-1 mx-auto text-center">
            {/* Description Paragraphs */}
            <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                Through your support, together we can provide crucial resources, training, and aid to those in need,
                all while fostering a strong network of organizations dedicated to ethical and impactful work.
                CATA's collaborative environment allows partners to engage in charitable initiatives, share knowledge,
                and build connections with like-minded organizations.
              </p>
              <p>
                Your partnership is a step toward meaningful change. Join us in supporting community growth,
                sustainability, and well-being.
              </p>
            </div>

            {/* Subheading CTA */}
            <h3 className="mt-8 text-xl sm:text-2xl font-bold text-[#0070ba]">
              Get Involved and Make a Difference Today!
            </h3>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-12 text-center text-slate-500">Loading partners...</div>
        )}

        {/* ===== LOCAL PARTNERSHIP ===== */}
        {!loading && (organizations.length > 0 || companies.length > 0) && (
          <section className="p-4 sm:p-6 md:p-8 bg-[#0070ba] rounded-3xl max-w-7xl mx-auto my-8">
            <h2 className="pl-2 mb-6 text-2xl font-bold text-white sm:text-3xl">
              Local Partnership
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Organizations */}
              {organizations.length > 0 && (
                <div className="flex flex-col p-6 bg-white shadow-sm rounded-2xl sm:p-8">
                  <h3 className="text-2xl font-bold text-[#0070ba] mb-6">Organizations</h3>
                  <div className="grid items-center grid-cols-2 gap-6 sm:grid-cols-3 justify-items-center">
                    {organizations.map((org) => (
                      <div
                        key={org.id}
                        className="flex items-center justify-center w-full p-2 transition-transform duration-200 aspect-square hover:scale-105"
                      >
                        <PartnerLogo partner={org} maxHeight="max-h-34" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Companies */}
              {companies.length > 0 && (
                <div className="flex flex-col p-6 bg-white shadow-sm rounded-2xl sm:p-8">
                  <h3 className="text-2xl font-bold text-[#0070ba] mb-6">Companies</h3>
                  <div className="grid items-center grid-cols-2 gap-6 sm:grid-cols-3 justify-items-center">
                    {companies.map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center justify-center w-full p-2 transition-transform duration-200 aspect-square hover:scale-105"
                      >
                        <PartnerLogo partner={comp} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {/* ===== INTERNATIONAL PARTNERSHIP ===== */}
        {!loading && internationalPartners.length > 0 && (
          <section className="p-4 sm:p-6 md:p-8 bg-[#0070ba] rounded-3xl max-w-7xl mx-auto my-8">
            <h2 className="pl-2 mb-6 text-2xl font-bold text-white sm:text-3xl">
              International Partnership
            </h2>
            <div className="p-6 bg-white shadow-sm rounded-2xl sm:p-8">
              <div className="grid items-center grid-cols-2 gap-6 sm:grid-cols-4 justify-items-center">
                {internationalPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center justify-center w-full p-2 transition-transform duration-200 hover:scale-105"
                  >
                    <PartnerLogo partner={partner} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty state when no partners exist yet */}
        {!loading && partners.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm">
            No partners have been added yet.
          </div>
        )}

      </section>
    </div>
  );
}
