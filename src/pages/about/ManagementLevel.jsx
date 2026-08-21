import React, { useEffect, useState } from 'react';
import { api, toAssetUrl } from '../../utils/api.js';

export default function CATAManagementLevel() {
  const [managementMembers, setManagementMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/management_members')
      .then((members) => setManagementMembers(Array.isArray(members) ? members : []))
      .catch(() => setManagementMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
      {/* ===== HERO BANNER SECTION ===== */}
      <section className="relative bg-[#0b3d3a] text-white py-16 sm:py-20 px-4 overflow-hidden">
        {/* Decorative Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
            CATA Governance
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Management Level
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-slate-200">
            The executive leadership team tasked with implementing board decisions, overseeing daily operations, and ensuring Shariah-compliant growth across all administrative functions.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT AREA ===== */}
      <main className="max-w-5xl px-4 py-12 mx-auto sm:py-16">
        <div className="space-y-8">
          {loading && <p className="py-8 text-center text-slate-500">Loading management members...</p>}
          {!loading && managementMembers.length === 0 && <p className="py-8 text-center text-slate-500">No management members are available yet.</p>}
          {managementMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 bg-white border-4 border-sky-100 rounded-3xl transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
                {/* MEMBER IMAGE */}
                <div className="w-full md:w-64 h-60 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                  {member.image ? (
                    <img src={toAssetUrl(member.image)} alt={member.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-sky-100 text-5xl font-bold text-sky-600" aria-label={`${member.name} photo pending`}>
                      {member.name?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* MEMBER CONTENT */}
                <div className="flex flex-col justify-center w-full space-y-3">
                  <h3 className="text-2xl font-bold text-sky-600 sm:text-3xl">
                    {member.name}
                  </h3>
                  <p className="text-base font-bold text-sky-600 sm:text-lg">
                    {member.title}
                  </p>
                  <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
