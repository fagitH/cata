import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Image Imports
import bannerImg from '../../assets/image/water_well_project/banner1.png';
import motorPumpImg from '../../assets/image/water_well_project/motor_pump.jpg';
import handPumpImg from '../../assets/image/water_well_project/hand_pump.jpg';
import tankFilterImg from '../../assets/image/water_well_project/tank_pump1.png';
import tankNoFilterImg from '../../assets/image/water_well_project/tank_pum2.png';
import img1 from '../../assets/image/water_well_project/img1.jpg';
import img2 from '../../assets/image/water_well_project/img2.jpg';
import img3 from '../../assets/image/water_well_project/img3.jpg';
import img4 from '../../assets/image/water_well_project/img4.jpg';
import img5 from '../../assets/image/water_well_project/img5.jpg';
import img6 from '../../assets/image/water_well_project/img6.jpg';
import img7 from '../../assets/image/water_well_project/img7.jpg';
import img8 from '../../assets/image/water_well_project/img8.jpg';

const WaterWellProject = () => {
  // State for dynamic percentage API integration
  const [projectData, setProjectData] = useState([
    {
      id: 'well-motor-pump',
      title: 'Water Wells with Motor Pump',
      price: 750,
      receivedPercentage: 28, // Dynamic value from API
      features: [
        'Digging 30-50 meters deep',
        'Layout of Well 2.5m x 2.5m',
        'Motor',
        'Construction Cost',
        'Labor Cost',
      ],
      image: motorPumpImg,
    },
    {
      id: 'well-hand-pump',
      title: 'Hand Pump Water Wells',
      price: 700,
      receivedPercentage: 28, // Dynamic value from API
      features: [
        'Digging 30-50meters deep',
        'Layout of Well 2.5m x 2.5m',
        'Construction Cost',
        'Labor Cost',
      ],
      image: handPumpImg,
    },
    {
      id: 'well-tank-filter',
      title: 'Tank Wells with Motor Pump and Filter',
      price: 1500,
      receivedPercentage: 10, // Dynamic value from API
      features: [
        'Digging 30-50meters deep',
        'Layout of Well 3m x 3m x 3m',
        'Construction Cost',
        'Labor Cost',
        'Motor',
        'Filter clean water',
        'Tank 500L',
      ],
      image: tankFilterImg,
    },
    {
      id: 'well-tank-no-filter',
      title: 'Tank Wells with Motor Pump and Filter',
      price: 1400,
      receivedPercentage: 0, // Dynamic value from API
      features: [
        'Digging 30-50meters deep',
        'Layout of Well 3m x 3m x 3m',
        'Construction Cost',
        'Labor Cost',
        'Motor',
        'Tank 500L',
      ],
      image: tankNoFilterImg,
    },
  ]);

  // Gallery Placeholders for the bottom section
  const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8];

  // API fetch simulation
  useEffect(() => {
    /*
    fetch('/api/water-wells-progress')
      .then((res) => res.json())
      .then((data) => {
        // Update percentages based on API response
      });
    */
  }, []);

  return (
    <div className="w-full bg-white font-sans text-slate-700">
      {/* 1. HERO BANNER */}
      <section className="relative w-full bg-slate-900 text-white min-h-[340px] flex items-center justify-center overflow-hidden px-4 py-10">
        {/* Banner Image Placeholder */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={bannerImg} 
            alt="Clean Water Banner" 
            className="w-full h-full object-cover opacity-80 transition-transform duration-700 ease-out hover:scale-105" 
          />
        </div>
      </section>

      {/* 2. DESCRIPTION SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-amber-700">Water.</h2>
        <p className="text-xl md:text-2xl font-semibold text-sky-600 leading-snug">
          It is the key to all life, and could be your key to Jannah. Use your Sadaqah to save lives by delivering clean water today.
        </p>

        <div className="text-sm md:text-base text-slate-600 space-y-4 max-w-3xl mx-auto text-left sm:text-center leading-relaxed">
          <p>
            Did you know that more than 780 million people lack access to safe and clean drinking water? That’s more than one in every 10 people on the planet!
          </p>
          <p>
            To add, nearly 1 million people die each year from waterborne diseases, with children being the most susceptible, affecting their ability to receive an education.
          </p>
          <p>
            For many living a life of poverty or living in conflict and natural disaster zones, safe and clean water can be the difference between life and death. At CATA we’re working towards a world without poverty, where access to life’s most basic necessities – like clean water – is available for everyone.
          </p>
          <p className="font-medium text-slate-800">
            We can’t do it without YOU. Use your Sadaqah and Zakat to help us deliver clean water today.
          </p>
        </div>

        <div className="pt-4">
          <a
            href="/pdf/Proposal-for-Well-water-Funding-Support-from-Partner_Donors.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 !text-white font-bold px-8 py-3 rounded-md shadow transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            See our proposal here
          </a>
        </div>
      </section>

      {/* 3. CARDS SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* TOP ROW: 2 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectData.slice(0, 2).map((item) => (
            <div 
              key={item.id} 
              className="bg-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Zoom Effect */}
                <div className="w-full h-56 bg-white rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden mb-6 group cursor-pointer">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110" 
                    />
                  ) : (
                    <span className="text-slate-400 text-sm font-medium">Image Placeholder</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-sky-600 text-center mb-4">
                  {item.title}
                </h3>

                <ul className="space-y-1.5 text-sm text-slate-700 mb-6">
                  {item.features.map((feat, idx) => (
                    <li key={idx}>– {feat}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="text-center text-2xl font-extrabold text-pink-600">
                  USD{item.price}
                </div>

                {/* DYNAMIC PROGRESS BAR */}
                <div className="relative w-full h-8 bg-slate-100 rounded-md overflow-hidden flex items-center border border-slate-300">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500 flex items-center justify-start px-3"
                    style={{ width: `${Math.max(item.receivedPercentage, 15)}%` }}
                  >
                    <span className="text-xs font-semibold text-white whitespace-nowrap">Received</span>
                  </div>
                  <span className="absolute right-3 text-xs font-bold text-slate-500">
                    {item.receivedPercentage}%
                  </span>
                </div>

                <div className="text-center">
                  <Link
                    to="/donate-water-well"
                    className="inline-block w-full sm:w-auto bg-amber-500 hover:bg-amber-600 !text-white font-bold px-8 py-2.5 rounded-md shadow transition-all duration-300 hover:scale-105 hover:shadow-md text-center"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ROW: 2 FULL-WIDTH HORIZONTAL LAYOUT CARDS */}
        <div className="space-y-8">
          {projectData.slice(2, 4).map((item) => (
            <div 
              key={item.id} 
              className="bg-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container with Zoom Effect */}
              <div className="w-full h-72 bg-white rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden group cursor-pointer">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110" 
                  />
                ) : (
                  <span className="text-slate-400 text-sm font-medium">Image Placeholder</span>
                )}
              </div>

              {/* Right Box Card Content */}
              <div className="bg-white rounded-xl p-6 shadow-xs flex flex-col justify-between h-full space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-sky-600 text-center mb-4">
                    {item.title}
                  </h3>

                  <ul className="space-y-1.5 text-sm text-slate-700 mb-6">
                    {item.features.map((feat, idx) => (
                      <li key={idx}>– {feat}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="text-center text-2xl font-extrabold text-pink-600">
                    USD{item.price}
                  </div>

                  {/* DYNAMIC PROGRESS BAR */}
                  <div className="relative w-full h-8 bg-slate-100 rounded-md overflow-hidden flex items-center border border-slate-200">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-500 flex items-center justify-start px-3"
                      style={{ width: `${Math.max(item.receivedPercentage, 12)}%` }}
                    >
                      <span className="text-xs font-semibold text-white whitespace-nowrap">Received</span>
                    </div>
                    <span className="absolute right-3 text-xs font-bold text-slate-500">
                      {item.receivedPercentage}%
                    </span>
                  </div>

                  <div className="text-center">
                    <Link
                      to="/donate-water-well"
                      className="inline-block w-full sm:w-auto bg-amber-500 hover:bg-amber-600 !text-white font-bold px-8 py-2.5 rounded-md shadow transition-all duration-300 hover:scale-105 hover:shadow-md text-center"
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMMUNITY PROJECT GALLERY SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-sky-600 flex items-center justify-center gap-2 mb-8 text-center">
          <span>🌍</span> Clean Water Well Project for the Community <span>💧</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              On February 10, 2025, the Executive Director of the Cambodian Amanah Takaful Association visited the clean water well project in Teuk Phos district, Kampong Chhnang province, focusing on providing clean water to needy families.
            </p>

            <div className="space-y-2">
              <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                <span className="text-green-600">✅</span> Main activities
              </p>
              <ul className="space-y-1 list-disc list-inside pl-1 text-slate-600">
                <li>Inspect the water well system</li>
                <li>Meet with community officials on the sustainability plan for support.</li>
                <li>Help listen to the problems of needy families.</li>
              </ul>
            </div>
          </div>

          {/* Right 8-Grid Photo Gallery */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {galleryImages.map((imgSrc, index) => (
              <div 
                key={index} 
                className="group relative aspect-square bg-slate-200 rounded-lg border border-slate-300 overflow-hidden flex items-center justify-center shadow-xs cursor-pointer"
              >
                {imgSrc ? (
                  <img 
                    src={imgSrc} 
                    alt={`Activity ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-115" 
                  />
                ) : (
                  <span className="text-xs text-slate-400">Image</span>
                )}
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaterWellProject;