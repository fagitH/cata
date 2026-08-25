import React, { useEffect, useState } from 'react';
import { api, toAssetUrl } from '../../utils/api';
import bgImage from '../../assets/image/pattern.png';

export default function ShariahAdvisoryCommittee() {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/shariah_advisory_members')
      .then((members) => setCommitteeMembers(Array.isArray(members) ? members : []))
      .catch(() => setCommitteeMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
  <section
  className="relative px-4 bg-center py-14"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Light Overlay */}
  <div className="absolute inset-0 pointer-events-none bg-white/55" />

  {/* Decorative Grid Pattern Overlay */}
  <div className="absolute inset-0 pointer-events-none opacity-100 [background-size:16px_16px]" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="max-w-3xl mx-auto text-center">
      {/* <span className="inline-flex items-center px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 text-amber-300 border-amber-400/30">
        Shariah Advisory Committee
      </span> */}

      <h1 className="text-3xl font-extrabold tracking-tight text-sky-600 sm:text-6xl">
        Advisory Committee
      </h1>

      <p className="mt-4 text-sm leading-relaxed sm:text-base text-sky-600">
        The Shariah Advisory Committee provides expert Islamic guidance and oversight to ensure all CATA programs, policies and operations remain aligned with Shariah principles.
      </p>
    </div>
  </div>
</section>

  <main className="max-w-6xl px-4 py-12 mx-auto sm:px-6 sm:py-16 lg:px-8">
    {loading ? (
      <p className="text-center text-slate-500">Loading committee members...</p>
    ) : committeeMembers.length === 0 ? (
      <p className="text-center text-slate-500">Committee members are not available yet.</p>
    ) : (
      <div className="grid gap-6">
        {committeeMembers.map((member) => (
          <article key={member.id} className="p-6 overflow-hidden bg-white border-2 shadow-sm rounded-3xl border-sky-100">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* MEMBER IMAGE CONTAINER - UPDATED SIZING & TOP ALIGNMENT */}
              <div className="relative w-full sm:w-56 aspect-[3/4] sm:aspect-auto sm:h-72 overflow-hidden border rounded-2xl shrink-0 bg-slate-100 border-slate-200">
                {member.image ? (
                  <img 
                    src={toAssetUrl(member.image)} 
                    alt={member.name} 
                    className="object-cover object-top w-full h-full" 
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-sm text-slate-400">
                    No Image Available
                  </div>
                )}
              </div>

              {/* MEMBER CONTENT */}
              <div className="flex-1 w-full space-y-3 text-center sm:text-left">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-sky-600 sm:text-2xl">{member.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-[#0b3d3a]">{member.role}</p>
                  </div>
                  <span className="self-center sm:self-start inline-flex items-center px-3 py-1 text-xs font-semibold tracking-widest uppercase border rounded-full text-amber-700 bg-amber-50 border-amber-200 shrink-0">
                    Advisory Member
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-800">Educational Background:</p>
                  <ul className="mt-2 space-y-1 text-sm leading-6 list-disc list-inside text-slate-600">
                    {(member.education || []).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </main>
</div>
  );
}
