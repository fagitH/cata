import { useEffect, useRef, useState, React } from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../assets/image/images.jpg';
import director from '../assets/image/about_us/about_us.jpg';
import aboutUs from '../assets/image/about_us/about_us2.jpg';
import bgImage2 from '../assets/image/pattern.png';

/* ---------------------------------------------------------------- */
/*  Animation helpers — self-contained, smooth scroll reveal        */
/* ---------------------------------------------------------------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function Reveal({ children, className = '', delay = 0, direction = 'up', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return 'translate-x-12'
      case 'right':
        return '-translate-x-12'
      case 'down':
        return '-translate-y-8'
      case 'up':
      default:
        return 'translate-y-8'
    }
  }

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getInitialTransform()}`
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

/* ---------------------------------------------------------------- */
/*  Page Content Data                                              */
/* ---------------------------------------------------------------- */
const keyProgramsData = [
  {
    num: 1,
    title: "1. My Community Fund Program",
    desc: 'The "My Community Fund," formally recognized as the "Community-Based Tabarru\' Mutual Assistance Fund," signifies a critical initiative by the Cambodian Amanah Takaful Association (CATA) to nurture ta\'awun (mutual assistance) and foster collective responsibility within the Muslim community in Cambodia.',
    icon: (
      /* Family/Community Icon */
      <svg className="w-10 h-10 text-[#d8315b] flex-shrink-0" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="5" />
        <circle cx="32" cy="16" r="5" />
        <path d="M8 34c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M24 34c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M20 10a3 3 0 014-2.8 3 3 0 014 2.8" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "2. Luy Khnum Saat Program (Interest-free)",
    desc: "Also called the Wealth Purification Program, A Shariah-compliant solution designed to help Muslim individuals and businesses transition away from interest-based (riba) financial obligations toward ethical and permissible financial arrangements.",
    icon: (
      /* Plant/Coin Growth Icon */
      <svg className="w-10 h-10 text-[#d8315b] flex-shrink-0" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="8" />
        <text x="24" y="20" fontSize="12" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="bold">$</text>
        <path d="M24 24v16" />
        <path d="M24 32c-4 0-8-3-8-7" />
        <path d="M24 28c4 0 8-3 8-7" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "3. Hajj Fund Program",
    desc: "A structured savings and support mechanism that enables Muslims to prepare financially for their Hajj pilgrimage in a disciplined, Shariah-compliant manner.",
    icon: (
      /* Wallet / Card Icon */
      <svg className="w-10 h-10 text-[#d8315b] flex-shrink-0" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="36" height="24" rx="4" />
        <path d="M6 22h36" />
        <circle cx="34" cy="30" r="2" />
        <path d="M12 10h24" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "4. CATA Business Cooperative Hybrid",
    desc: "CATA Business Cooperative Hybrid unites Muslim-owned businesses, NGOs, and MSMEs across Cambodia around Ta'awun (mutual assistance), transparent risk-sharing, and Riba-free enterprise.",
    icon: (
      /* Storefront / Shop Icon */
      <svg className="w-10 h-10 text-[#d8315b] flex-shrink-0" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18h32l-2-8H10l-2 8z" />
        <path d="M8 18v22h32V18" />
        <path d="M18 40V28h12v12" />
        <path d="M8 18c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5" />
        <path d="M16 18c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5" />
        <path d="M24 18c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5" />
        <path d="M32 18c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5" />
      </svg>
    ),
  },
];

const coreObjectives = [
  "Promote peace of mind in Islamic financial matters",
  "Strengthen youth development and education",
  "Encourage ethical entrepreneurship aligned with Islamic values",
  "Boost the Islamic economy in Cambodia",
  "Foster unity and resilience within the Muslim community",
];

export default function AboutUs() {
  return (
    <div className="min-h-screen  text-slate-800">
      {/* ===== HERO / PAGE TITLE WITH FIXED BACKGROUND IMAGE ===== */}
      <section className="relative py-20 overflow-hidden lg:py-28">
        {/* Background Image Layer (Set to bg-fixed) */}
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Dark Overlay for High Contrast */}
          <div className="absolute inset-0 bg-slate-800/35" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <Reveal direction="down">
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight uppercase text-sky-600 sm:text-6xl">
              About Us
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-white/90">
              Empowering communities, nurturing solidarity, and fostering Shariah-compliant sustainable development across Cambodia.
            </p>
          </Reveal>
        </div>
      </section>

      <div 
        className="relative bg-center"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        {/* Light Overlay for Readability */}
        <div className="absolute inset-0 pointer-events-none bg-white/70" />

        {/* Decorative Radial Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none [background-size:16px_16px]" />

        {/* Content Wrapper */}
        <div className="relative z-10">
          {/* ===== Top About Section ===== */}
          <section className="py-12 lg:py-16">
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_380px] lg:gap-12">
                
                {/* Left Column: Text Content */}
                <Reveal direction="right">
                  <div className="space-y-3 text-xs leading-relaxed sm:text-sm text-slate-700">
                    <p>
                      The Cambodian Amanah Takaful Association (CATA) is a Muslim non-profit organization committed to promoting solidarity, mutual assistance, and sustainable development within Cambodia’s Muslim community through Shariah-compliant and ethical initiatives.
                    </p>
                    <p>
                      CATA is honored to have HE Neak Oknha Dato Dr. Othsman Hassan, Senior Minister in charge of Special Mission, serving as Chair of the Board of Directors, with Mr. Sen Saman serving as Executive Director.
                    </p>

                    {/* VISION Block */}
                    <div className="pt-1">
                      <h3 className="text-sm font-bold uppercase text-[#1974b5] tracking-wide">
                        VISION
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                        CATA envisions the Islamic community in Cambodia endowed with elevated capacity, profound knowledge, and progressive development across all spheres of living with utmost respect and an improved standard of life. CATA is rebuilding the core values of the Muslim nation and establishing a sustainable action plan that engages Muslims from all sectors in Cambodia.
                      </p>
                    </div>

                    {/* MISSION Block */}
                    <div className="pt-1">
                      <h3 className="text-sm font-bold uppercase text-[#1974b5] tracking-wide">
                        MISSION
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                        CATA focuses on charity-based, cooperative, and community empowerment programs that enable Muslim individuals and businesses to participate actively in Cambodia’s national economy while upholding Islamic principles and values.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Right Column: Image Container */}
                <Reveal direction="left" delay={150}>
                  <div className="relative w-full max-w-[380px] mx-auto overflow-hidden bg-white/90 backdrop-blur-sm rounded-xl aspect-[4/5] shadow-sm border border-slate-200">
                    <img
                      src={director}
                      alt="CATA Leadership"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </Reveal>

              </div>
            </div>
          </section>

          {/* ===== Key Programs & Objectives Section ===== */}
          <section className="py-12 border-t border-slate-200/60 font-sans">
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
              
              {/* SECTION HEADINGS */}
              <div className="grid grid-cols-1 gap-8 mb-6 lg:grid-cols-2">
                <div>
                  <h2 className="text-xl font-extrabold uppercase text-[#1e6f9f] tracking-tight">
                    KEY PROGRAMS
                  </h2>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold uppercase text-[#1e6f9f] tracking-tight">
                    OUR OBJECTIVES
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    CATA is guided by five core objectives:
                  </p>
                </div>
              </div>

              {/* CONTENT GRID */}
              <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
                
                {/* LEFT COLUMN: CARDS */}
                <div className="space-y-3.5">
                  {keyProgramsData.map((prog, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm transition-all hover:shadow-md"
                    >
                      {/* Icon Container */}
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-sky-50 text-sky-600">
                        {prog.icon}
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-sm font-bold text-[#2b3a67]">
                          {prog.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#4a5568]">
                          {prog.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RIGHT COLUMN: LIST */}
                <div className="pt-2 space-y-4">
                  {coreObjectives.map((text, i) => (
                    <div key={i} className="flex items-center gap-3.5 p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm">
                      {/* 4-Arrow Cross Diamond Icon */}
                      <span className="flex-shrink-0 text-[#d8315b]">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                          <path d="M12 6L13.5 10.5L18 12L13.5 13.5L12 18L10.5 13.5L6 12L10.5 10.5L12 6Z" fill="white" />
                        </svg>
                      </span>

                      {/* Objective Text */}
                      <p className="text-sm font-bold text-[#1e6f9f]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </section>
        </div>
      </div>

      {/* ===== OUR APPROACH ===== */}
      <section className="py-8 bg-[#ebedee]">
        <div className="max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <Reveal direction="up">
            
            {/* HEADING */}
            <h2 className="text-lg font-extrabold uppercase tracking-wide text-[#1f6393]">
              OUR APPROACH
            </h2>

            {/* PARAGRAPH TEXT */}
            <p className="max-w-3xl mx-auto mt-2 text-xs font-normal leading-relaxed sm:text-sm text-slate-700">
              Through strategic collaboration with government institutions, development partners, and the private sector, CATA contributes to inclusive national development while ensuring that Cambodia’s Muslim community remains financially empowered, socially responsible, and spiritually aligned.
            </p>

            {/* CONTROLLED IMAGE CONTAINER */}
            <div className="max-w-2xl mx-auto mt-5 overflow-hidden rounded-2xl">
              <img
                src={aboutUs}
                alt="CATA Collaboration & Impact Group"
                className="object-cover w-full h-auto rounded-2xl"
              />
            </div>

          </Reveal>
        </div>
      </section>

      {/* ===== JOIN US CTA ===== */}
      <section className="py-6 bg-slate-100">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          
          {/* CYAN BANNER */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-8 rounded-xl bg-[#1bc8ca] shadow-md">
            
            {/* TEXT CONTENT */}
            <div className="max-w-2xl text-left text-white">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Join Us As Membership
              </h2>
              <p className="mt-2 text-xs font-normal leading-relaxed sm:text-sm text-white/95">
                CATA's commitment to "Seek Support and Cooperation" signifies their proactive approach to building strong relationships and partnerships.
              </p>
            </div>

            {/* BUTTON WITH MEGAPHONE / MICROPHONE ICON */}
            <div className="flex-shrink-0">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-3 py-1 pl-1 transition-transform duration-200 bg-white rounded-l-full rounded-br-none shadow-md pr-7 rounded-tr-3xl hover:scale-105"
              >
                {/* Pink Circle Badge */}
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ff2a85] text-white flex-shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M21.53 4.309a.75.75 0 01.22.53v14.322a.75.75 0 01-1.218.595L13.882 14.5H9.75a2.25 2.25 0 01-2.25-2.25v-3.5A2.25 2.25 0 019.75 6.5h4.132l6.43-5.226a.75.75 0 011.218.595zM7.5 13.5v3.25a2.25 2.25 0 002.25 2.25h1.5a.75.75 0 00.75-.75V15.5H9.75a.75.75 0 01-.75-.75v-1.25H7.5z" />
                  </svg>
                </span>

                {/* Label */}
                <span className="text-sm font-semibold text-[#405060]">
                  Join us
                </span>
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}