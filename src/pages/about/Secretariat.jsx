import React from 'react';

// Official Secretariat team members list
const secretariatMembers = [
  {
    id: 1,
    name: 'Saman SEN',
    title: 'Executive Director',
    role: 'Overall Executive Management & Strategic Execution',
    image: '/images/secretariat/sen-saman.jpg', // Replace with your image source
  },
  {
    id: 2,
    name: 'Sokry Fy',
    title: 'Administration and Senior Finance Officer',
    role: 'Financial Operations & Administrative Management',
    image: '/images/secretariat/fy-sokry.jpg', // Replace with your image source
  },
  {
    id: 3,
    name: 'Sapirin Soprey',
    title: 'Program Innovation & Senior Marketing Officer',
    role: 'Program Development & Outreach Marketing',
    image: '/images/secretariat/sapirin-soprey.jpg', // Replace with your image source
  },
  {
    id: 4,
    name: 'Neang Bovyna',
    title: 'Membership Services Executive (Internship)',
    role: 'Member Support & Community Relations',
    image: '/images/secretariat/neang-bovyna.jpg', // Replace with your image source
  },
  {
    id: 5,
    name: 'Solaiman Rohanan',
    title: 'Membership Services Executive (Internship)',
    role: 'Member Relations & Onboarding Assistance',
    image: '/images/secretariat/solaiman-rohanan.jpg', // Replace with your image source
  },
  {
    id: 6,
    name: 'Hosanita Hosen',
    title: 'Graphic Design Assistant (Internship)',
    role: 'Media Design & Visual Branding Support',
    image: '/images/secretariat/hosanita-hosen.jpg', // Replace with your image source
  },
  {
    id: 7,
    name: 'EL SUFINA',
    title: 'Membership Services Executive (Internship)',
    role: 'Member Services & Operational Operations',
    image: '/images/secretariat/el-sufina.jpg', // Replace with your image source
  },
];

export default function CATASecretariatPage() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800">
      
      {/* ===== HERO BANNER SECTION ===== */}
      <section className="relative bg-[#0b3d3a] text-sky-600 py-16 sm:py-20 px-4 overflow-hidden">
        {/* Subtle Decorative Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-widest uppercase border rounded-full bg-amber-500/10 border-amber-400/30 text-amber-300">
            CATA Leadership
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-sky-600 sm:text-5xl">
            Secretariat
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-slate-200">
            The operational backbone of Cambodian Amanah Takaful Association (CATA), managing day-to-day administration, membership services, and financial integrity.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT AREA ===== */}
      <main className="max-w-5xl px-4 py-12 mx-auto sm:py-16">
  
        {/* ===== HORIZONTAL PROFILE CARDS CONTAINER ===== */}
        <div className="flex flex-col gap-6">
          {secretariatMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border-2 border-sky-100 rounded-[28px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
            >
              {/* MEMBER IMAGE CONTAINER */}
              <div className="w-full sm:w-64 sm:min-w-[16rem] h-56 sm:h-52 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
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