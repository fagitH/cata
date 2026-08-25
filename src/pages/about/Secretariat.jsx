import React, { useEffect, useState } from 'react';
import { api, toAssetUrl } from '../../utils/api.js';
import bgImage from '../../assets/image/pattern.png';

export default function CATASecretariatPage() {
  const [secretariatMembers, setSecretariatMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/secretariat_members')
      .then((members) => setSecretariatMembers(Array.isArray(members) ? members : []))
      .catch(() => setSecretariatMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
      
      {/* ===== HERO BANNER SECTION ===== */}
      <section
  className="relative px-4 bg-center py-14"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Light Overlay */}
  <div className="absolute inset-0 pointer-events-none bg-white/55" />

  {/* Decorative Grid Pattern Overlay */}
  <div className="absolute inset-0 pointer-events-none opacity-100 [background-size:16px_16px]" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
      CATA Leadership
    </span> */}

    <h1 className="text-3xl font-extrabold tracking-tight text-sky-600 sm:text-6xl">
      Secretariat
    </h1>

    <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-sky-600">
      The operational backbone of Cambodian Amanah Takaful Association (CATA), managing day-to-day administration, membership services, and financial integrity.
    </p>
  </div>
</section>
  
     {/* ===== MAIN CONTENT AREA ===== */}
<main className="max-w-5xl px-4 py-12 mx-auto sm:py-16">

  {/* ===== HORIZONTAL PROFILE CARDS CONTAINER ===== */}
  <div className="flex flex-col gap-6">
    {loading && <p className="py-8 text-center text-slate-500">Loading Secretariat members...</p>}
    {!loading && secretariatMembers.length === 0 && <p className="py-8 text-center text-slate-500">No Secretariat members are available yet.</p>}
    {secretariatMembers.map((member) => (
      <div
        key={member.id}
        className="bg-white border-2 border-sky-100 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
      >
        {/* MEMBER IMAGE CONTAINER - UPDATED ASPECT RATIO & SIZING */}
        <div className="w-full sm:w-64 aspect-[3/4] sm:aspect-auto sm:h-80 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
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

        {/* MEMBER DETAILS */}
        <div className="flex flex-col justify-center flex-1 py-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0284c7] tracking-tight">
            {member.name}
          </h3>
          <h4 className="mt-1 text-base sm:text-lg font-bold text-[#0284c7]">
            {member.title}
          </h4>
          <p className="max-w-2xl mt-3 text-sm leading-relaxed sm:text-base text-slate-600">
            {member.role}
          </p>
        </div>
      </div>
    ))}
  </div>

</main>

    </div>
  );
}
