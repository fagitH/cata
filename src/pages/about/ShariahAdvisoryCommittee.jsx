import React from 'react';
import sariah1 from '../../assets/image/sariah1.png';
import sariah2 from '../../assets/image/sariah3.jpg';
import sariah3 from '../../assets/image/sariah5.jpg';
import sariah5 from '../../assets/image/sariah2.png';

const committeeMembers = [
  {
    id: 1,
    name: 'H.E No Mathsath',
    role: 'Deputy Secretary General, Ministry of Culture and Religion',
    image: sariah1,
    education: [
      'Bachelor’s Degree in Business Management, National University of Management, Cambodia',
      'Completed Islamic Law and Discipline',
      'Completed the Highest Islamic Council Training',
    ],
  },
  {
    id: 2,
    name: 'Ustaz Sit ilyes',
    role: 'Islamic Teacher, Noorul Iman High School',
    image: sariah2,
    education: [
      'Bachelor’s Degree in Islamic Law, Imam Muhammad bin Saud Islamic University, Saudi Arabia',
      'Master’s Degree, Madinah International University, Malaysia',
      'Ph.D. Candidate, Madinah International University, Malaysia',
    ],
  },
  {
    id: 3,
    name: 'Ustaz. Aly Mosa',
    role: 'Assistant to H.E Neak Oknha Datuk Dr. Othsman Hassan, Senior Minister in Charge of Special Mission',
    image: '/images/ustaz-aly-mosa.jpg',
    education: [
      'Bachelor’s Degree in Islamic Law, Imam Muhammad bin Saud Islamic University, Saudi Arabia',
    ],
  },
  {
    id: 4,
    name: 'Ustaz. Tres Mansor',
    role: 'Islamic Teacher, Annikmah School Phnom Penh',
    image: sariah3,
    education: [
      'Bachelor Islamic Law at Islamic University Al Madinah Almunawwarah, Saudi Arabia',
    ],
  },
  {
    id: 5,
    name: 'Ustaz. Sary Sles',
    role: 'Teacher at Buranakarn Suksa Witya School, Pattani, Thailand',
    image: sariah5,
    education: [
      'Bachelor’s degree from Prince of Songkla University Pattani Campus (Major Islamic Studies International program)',
      'Master of Arts from Prince of Songkla University, Pattani campus',
    ],
  },
  {
    id: 6,
    name: 'Uztazah. Faridah Binti Yaakob',
    role: 'Vice Principal at Nural Imaan High School, Cambodia',
    image: '/images/uztazah-faridah-binti-yaakob.jpg',
    education: [
      'Master’s degree from the International Islamic University Malaysia (IIUM), Department of Islamic Reveal Knowledge and Human Sciences',
      'PhD from the International Islamic University Malaysia (IIUM)',
    ],
  },
  {
    id: 7,
    name: 'Uztazah. Mad Jariah',
    role: 'Teacher at International Institute of Islamic Thought in Kuala Lumpur',
    image: '/images/uztazah-mad-jariah.jpg',
    education: [
      'Master’s degree from the International Islamic University Malaysia (IIUM), Department of Islamic Reveal Knowledge and Human Sciences',
      'PhD Candidate from the International Islamic University Malaysia (IIUM), Department of Islamic Reveal Knowledge and Human Sciences',
    ],
  },
];

export default function ShariahAdvisoryCommittee() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* ORIGINAL HERO BANNER (UNCHANGED) */}
      <section className="relative overflow-hidden bg-[#0b3d3a] text-sky-600 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 text-amber-300 border-amber-400/30">
              Shariah Advisory Committee
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-sky-600">
              Advisory Committee
            </h1>
            <p className="mt-6 text-sm leading-7 text-slate-200 sm:text-base">
              The Shariah Advisory Committee provides expert Islamic guidance and oversight to ensure all CATA programs,
              policies and operations remain aligned with Shariah principles. The committee draws on experienced scholars and educators
              from Cambodia, Saudi Arabia, Malaysia and Thailand.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl px-4 py-12 mx-auto sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6">
          {committeeMembers.map((member) => (
            <article key={member.id} className="overflow-hidden bg-white border-2 shadow-sm rounded-3xl border-sky-100 p-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                
                {/* BALANCED MEDIUM-SIZED IMAGE */}
                <div className="relative shrink-0 w-40 h-40 sm:w-58 sm:h-68 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-sm text-slate-400">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* MEMBER DETAILS */}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-sky-600 sm:text-2xl">{member.name}</h2>
                      <p className="mt-1 text-sm font-semibold text-[#0b3d3a]">{member.role}</p>
                    </div>
                    <span className="self-start inline-flex items-center px-3 py-1 text-xs font-semibold tracking-widest uppercase border rounded-full text-amber-700 bg-amber-50 border-amber-200 shrink-0">
                      Advisory Member
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-800">Educational Background:</p>
                    <ul className="mt-2 space-y-1 text-sm leading-6 list-disc list-inside text-slate-600">
                      {member.education.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}