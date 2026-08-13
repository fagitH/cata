import React from 'react';
import manage1 from '../../assets/image/datuk_OH.png';
import manage2 from '../../assets/image/manage.jpg';
import manage3 from '../../assets/image/manage2.jpg';
import manage4 from '../../assets/image/boss.png';
import manage5 from '../../assets/image/sariah4.jpg';

const managementMembers = [
  {
    id: 1,
    name: 'Neak Oknha Datuk Dr. Othsman Hassan',
    title: 'Chair of Board Director',
    image: manage1,
    bio: "Provides overall leadership, chairs meetings, and ensures the board's effectiveness in governance.",
  },
  {
    id: 2,
    name: 'His Excellency Mr. Sman Manan',
    title: 'Vice Chair of Board Director',
    image: manage2,
    bio: 'Supports the Chair, steps in when the Chair is unavailable, and may oversee specific projects or initiatives and collaborate with partners/donors overseas.',
  },
  {
    id: 3,
    name: 'His Excellency Mr. Rofy Othsman',
    title: 'Vice Chair of Board Director',
    image: manage3,
    bio: 'Supports the Chair, steps in when the Chair is unavailable, and may oversee specific projects or initiatives and leading The Muslim Youth Cambodia.',
  },
  {
    id: 4,
    name: 'Mr. Saman SEN',
    title: 'Executive Director',
    image: manage4,
    bio: "Manages day-to-day CATA's operations, leads the strategic implementation of programs, and reports to the board.",
  },
  {
    id: 5,
    name: 'Her Excellency Mrs. Loh Saroh',
    title: 'Board Members (Treasurer)',
    image: manage5,
    bio: "Oversees the association's financial health, including budgeting, audits, and financial reporting.",
  },
];

export default function CATAManagementLevel() {
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
          {managementMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 bg-white border-4 border-sky-100 rounded-3xl transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
                {/* MEMBER IMAGE */}
                <div className="w-full md:w-64 h-60 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
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