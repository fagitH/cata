import React from 'react';
import bgImage from '../../assets/image/pattern.png';
import cataLogoImage from '../../assets/image/Cata_logo.jpg';

const GovernanceStructuralOfCATA = () => {
  return (
    <div className="min-h-screen font-sans text-slate-800">
      {/* ===== HERO HEADER SECTION WITH BACKGROUND IMAGE ===== */}
      <section
        className="relative px-4 bg-center py-14"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Light Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-white/55" />

        {/* Decorative Grid Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-100  [background-size:16px_16px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-[11px] sm:text-xs font-semibold tracking-widest uppercase border rounded-full bg-black/20 border-amber-400/50 text-amber-300 backdrop-blur-xs">
            <span>Official Governance Structure</span>
          </div> */}

          <h1 className="text-3xl font-extrabold tracking-tight text-sky-600 sm:text-6xl">
            Governance Structure of CATA
          </h1>

          <p className="max-w-3xl mx-auto mt-4 text-sm leading-relaxed sm:text-base text-sky-600">
            The governance framework of CATA is centered around the General Assembly, supported by
            specialized advisory bodies, executive leadership, and operational committees to guarantee
            Shariah compliance and strategic execution.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <section className="max-w-6xl px-4 py-12 mx-auto lg:py-16 sm:px-6 lg:px-8">
        <div className="relative p-6 overflow-hidden bg-white border shadow-xl rounded-3xl border-slate-200/80 sm:p-10 lg:p-12">
          
          {/* CATA LOGO WATERMARK BACKGROUND */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
            <img
              src={cataLogoImage}
              alt="CATA Logo"
              className="max-w-[800px] w-full h-auto object-contain"
            />
          </div>

          {/* ===== DIAGRAM TITLE HEADER ===== */}
          <div className="relative z-10 max-w-xl mx-auto mb-12 text-center">
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase border rounded-full text-amber-600 bg-amber-50 border-amber-200">
              Institutional Framework
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              CATA Governance Hierarchy
            </h2>
            <div className="w-12 h-1 bg-[#0b223d] mx-auto mt-3 rounded-full" />
          </div>

          {/* ===== ORGANIZATIONAL TREE ===== */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
            
            {/* 1. GENERAL ASSEMBLY (APEX) */}
            <div className="relative w-full max-w-md p-6 text-center text-white transition-transform duration-300 shadow-lg bg-gradient-to-br from-[#0b3d3a] to-[#072826] rounded-2xl border-2 border-amber-400/40 hover:scale-[1.01]">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-widest uppercase px-3 py-0.5 rounded-full shadow-sm">
                Supreme Authority
              </div>
              <h3 className="mt-1 text-xl font-extrabold tracking-wide text-white uppercase sm:text-2xl">
                General Assembly
              </h3>
              <p className="mt-1 text-xs font-semibold tracking-wider text-amber-300">
                (Supreme Governing Body)
              </p>
            </div>

            {/* CONNECTOR SECTION WITH ADVISORY BOARD */}
            <div className="relative flex flex-col items-center w-full max-w-md">
              
              {/* VERTICAL TRUNK LINE */}
              <div className="w-0.5 h-20 bg-slate-300 relative flex items-center justify-center">
                {/* NODE ON TRUNK LINE */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#0b103d] ring-4 ring-white border border-slate-300 z-10" />
              </div>

              {/* HORIZONTAL BRANCH LINE */}
              <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-y-1/2 w-[calc(50%+2rem)] h-0.5 bg-slate-300 z-0" />

              {/* Side Branch Card: International Advisory Board */}
              <div className="relative w-full mb-3 sm:absolute sm:left-[calc(100%+2rem)] sm:top-1/2 sm:-translate-y-1/2 sm:w-64 sm:mb-0 z-10">
                <div className="p-4 text-center border-2 shadow-sm bg-amber-50/90 rounded-2xl border-amber-300/80 sm:text-left">
                  <h4 className="mt-0.5 text-center text-xs sm:text-sm font-extrabold text-slate-900 uppercase">
                    International Advisory Board Members
                  </h4>
                </div>
              </div>

            </div>

            {/* 2. BOARD OF DIRECTORS (DARK SKY BLUE) */}
            <div className="relative w-full max-w-md p-5 text-center text-white transition-all duration-300 border-2 shadow-md bg-sky-900 border-sky-800 rounded-2xl hover:bg-sky-950">
              <h3 className="text-lg font-extrabold tracking-wide uppercase text-white sm:text-xl">
                Board of Directors
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-sky-200">
                (Policy & Fiduciary Oversight)
              </p>
            </div>

            {/* VERTICAL LINE DOWN TO SPLIT */}
            <div className="w-0.5 h-8 bg-slate-300 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0b3d3a]" />
            </div>

            {/* HORIZONTAL BRANCH LINE FOR SPLIT */}
            <div className="w-[80%] max-w-2xl h-0.5 bg-slate-300 relative">
              <div className="absolute top-0 left-0 w-0.5 h-6 bg-slate-300" />
              <div className="absolute top-0 right-0 w-0.5 h-6 bg-slate-300" />
            </div>

            {/* 3. SPLIT BRANCH GRID: SHARIAH COMMITTEE & EXECUTIVE MANAGEMENT */}
            <div className="grid w-full max-w-3xl grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
              
              {/* LEFT BRANCH: SHARIAH ADVISORY COMMITTEE (SKY BLUE) */}
              <div className="flex flex-col items-center">
                <div className="w-full p-5 text-center text-white transition-all duration-300 border-2 shadow-md bg-sky-700 border-sky-400 rounded-2xl hover:bg-sky-600 hover:shadow-lg">
                  <div className="inline-flex p-2 mb-2 rounded-lg">
                    
                  </div>
                  <h3 className="text-base font-extrabold tracking-wide uppercase text-white sm:text-lg">
                    Shariah Advisory Committee
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-sky-100">
                    (Shariah Compliance Oversight)
                  </p>
                </div>
              </div>

              {/* RIGHT BRANCH: EXECUTIVE MANAGEMENT (SKY BLUE) & SUB-COMMITTEES */}
              <div className="flex flex-col items-center">
                {/* Executive Management */}
                <div className="w-full p-5 text-center text-white border-2 shadow-md bg-sky-700 border-sky-400 rounded-2xl hover:bg-sky-600">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300">Executive Leadership</span>
                  <h3 className="text-base font-extrabold tracking-wide text-white uppercase sm:text-lg">
                    Executive Management
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-sky-100">
                    (Executive Director & Secretariat)
                  </p>
                </div>

                {/* CONNECTOR LINE DOWN TO STANDING COMMITTEES */}
                <div className="w-0.5 h-8 bg-slate-300 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0b3d3a]" />
                </div>

                {/* STANDING COMMITTEES */}
                <div className="w-full p-4 text-center transition-all duration-200 border-2 shadow-sm bg-slate-100 border-slate-300 rounded-2xl hover:bg-white hover:border-slate-400">
                  <h4 className="text-sm font-extrabold tracking-wide uppercase text-slate-900">
                    Standing Committees
                  </h4>
                  <p className="mt-0.5 text-xs font-semibold text-slate-600">
                    (Finance, Membership, Audit, etc.)
                  </p>
                </div>

                {/* CONNECTOR LINE DOWN TO PROVINCIAL COMMITTEES */}
                <div className="w-0.5 h-8 bg-slate-300 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0b3d3a]" />
                </div>

                {/* PROVINCIAL COMMITTEES */}
                <div className="w-full p-4 text-center transition-all duration-200 border-2 border-dashed shadow-sm bg-slate-50 border-slate-300 rounded-2xl hover:bg-white">
                  <h4 className="text-sm font-extrabold tracking-wide uppercase text-slate-900">
                    Provincial Committees
                  </h4>
                  <p className="mt-0.5 text-xs font-semibold text-slate-600">
                    (Agent and Membership)
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default GovernanceStructuralOfCATA;