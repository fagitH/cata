import React, { useEffect, useState } from 'react';
import { api, toAssetUrl } from '../../utils/api.js';
import bgImage from '../../assets/image/pattern.png';

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
    <div className="min-h-screen font-sans  text-slate-800 " >
      {/* ===== HERO BANNER SECTION ===== */}
      <section
  className="relative px-4 bg-center py-14"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Light Overlay */}
  <div className="absolute inset-0 pointer-events-none bg-white/55" />

  {/* ===== HERO BANNER SECTION ===== */}
  
    {/* Decorative Grid Pattern Overlay */}
    <div className="absolute opacity-100  [background-size:16px_16px]" />
    
    <div className="relative text-center">
      {/* <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
        CATA Governance
      </span> */}
      <h1 className="text-3xl font-extrabold tracking-tight text-sky-600 sm:text-6xl">
        Management Level
      </h1>
      <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-sky-600">
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
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          {/* MEMBER IMAGE */}
          <div className="w-full sm:w-64 aspect-[3/4] md:aspect-auto md:h-80 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
            {member.image ? (
              <img 
                src={toAssetUrl(member.image)} 
                alt={member.name} 
                className="object-cover object-top w-full h-full" 
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-sky-100 text-5xl font-bold text-sky-600" aria-label={`${member.name} photo pending`}>
                {member.name?.charAt(0)}
              </div>
            )}
          </div>

          {/* MEMBER CONTENT */}
          <div className="flex flex-col justify-center w-full space-y-3 text-center md:text-left">
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
