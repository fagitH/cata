import React from 'react';
import { Link } from 'react-router-dom';

// Image Imports
import bannerHeaderImg from '../../assets/image/food_bank/banner01.jpg';
import img1 from '../../assets/image/food_bank/img1.jpg';
import img01 from '../../assets/image/food_bank/img01.jpg';
import img02 from '../../assets/image/food_bank/img02.jpg';
import img03 from '../../assets/image/food_bank/img03.jpg';
import img04 from '../../assets/image/food_bank/img04.jpg';
import img05 from '../../assets/image/food_bank/img05.jpg';
import img06 from '../../assets/image/food_bank/img06.jpg';
import img07 from '../../assets/image/food_bank/img07.png';
import img08 from '../../assets/image/food_bank/img08.jpg';
import img09 from '../../assets/image/food_bank/img09.webp';
import khqrKhrImg from '../../assets/image/food_bank/ac1.jpg';
import khqrUsdImg from '../../assets/image/food_bank/ac2.jpg';

export default function FoodBankInitiative() {
  return (
    <div className="min-h-screen bg-white text-[#555555] font-sans antialiased pb-20">
      
      {/* HEADER BANNER */}
      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
          <img
            src={bannerHeaderImg}
            alt="DMDI Cambodia Food Bank Banner"
            className="w-full h-auto object-cover block"
          />
        </div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="max-w-6xl mx-auto px-4 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-sm leading-relaxed text-[#555555]">
          <p>
            We are honored to announce that <strong className="text-slate-800">His Excellency Dr. Othsman Hassan</strong>, Senior Minister in Charge of Islamic Affairs, has officially authorized the <strong className="text-slate-800">Cambodian Amanah Takaful Association (CATA)</strong> to <strong className="text-slate-800">exclusively operate the DMDI Cambodia Food Bank</strong>.
          </p>
          <p>
            The <strong className="text-slate-800">DMDI Cambodia Food Bank</strong> is a vital humanitarian arm of <strong className="text-slate-800">Dewan Dakwah Islamiyah Malaysia (DMDI)</strong> - the <strong className="text-slate-800">Malay Islamic World Secretariat</strong>, an international network representing <strong className="text-slate-800">23 Muslim-majority countries</strong> and comprising over <strong className="text-slate-800">500 associations, NGOs, and businesses</strong>.
          </p>
          <p>
            This exclusive appointment recognizes CATA's commitment to uplifting and supporting vulnerable communities in Cambodia through transparent, sustainable, and faith-driven charitable services.
          </p>
        </div>
        <div>
          <img
            src={img1}
            alt="Authorization Ceremony"
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 object-cover aspect-[4/3]"
          />
        </div>
      </section>

      {/* MAIN INITIATIVE & PROGRAMME DETAILS */}
      <section className="max-w-6xl mx-auto px-4 pt-12">
        <div className="flex flex-col items-center mb-8">
          <img
            src={img01}
            alt="Food Bank Initiative"
            className="w-full max-w-md rounded-2xl bg-slate-100 object-cover aspect-[16/10] mb-6"
          />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0073B7] tracking-tight uppercase">
            FOOD BANK INITIATIVE
          </h2>
          <Link to="/volunter-staff">
            <button className="mt-4 px-6 py-2.5 bg-[#F99D1C] hover:bg-[#e08913] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-md shadow-md transition-all">
              STAFF VOLUNTEER FORM
            </button>
          </Link>
        </div>

        {/* MISSION & CORE PROGRAMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
          
          {/* Side Image Column displaying all core program images */}
          <div className="md:col-span-3 space-y-6">
            <img src={img02} alt="Food Contribution & Distribution" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
            <img src={img03} alt="Zakat for Food Security" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
            <img src={img04} alt="Qurban for the Hungry" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
            <img src={img05} alt="Waqf for Sustainable Food Supply" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
            <img src={img06} alt="Ramadan & Emergency Food Packages" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
            <img src={img08} alt="Partnerships & Awareness Campaigns" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
          </div>

          {/* Program Descriptions Column */}
          <div className="md:col-span-8 space-y-8 text-xs sm:text-sm text-[#555555]">
            
            {/* Mission */}
            <div>
              <h3 className="text-lg font-bold text-[#0073B7] uppercase tracking-wide">MISSION</h3>
              <p className="mt-1 leading-relaxed">
                To combat food insecurity by promoting sustainable food contributions through community donations, Zakat, Qurban, Waqf projects, and other charitable activities that align with Islamic principles of giving and community support.
              </p>
            </div>

            {/* Core Programs */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#0073B7] uppercase tracking-wide">CORE PROGRAMS & ACTIVITIES</h3>
              
              <div>
                <h4 className="font-bold text-[#0073B7]">1. Food Contribution & Distribution</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Collect and distribute essential food items to poor families</li>
                  <li>Partner with local businesses, farmers, and donors for ongoing supplies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">2. Zakat for Food Security</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Allow donors to contribute their Zakat directly to feeding the needy</li>
                  <li>Create a transparent system to manage Zakat-based food distribution</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">3. Qurban for the Hungry</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Facilitate Qurban donations during Eid al-Adha</li>
                  <li>Organize fresh meat distribution to poor Muslim families</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">4. Waqf for Sustainable Food Supply</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Establish a Waqf fund to purchase land, farms, or food production assets</li>
                  <li>Invest in self-sustaining food sources, like community farms or livestock</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">5. Ramadan & Emergency Food Packages</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Provide food baskets during holy Ramadan month and emergency periods</li>
                  <li>Support vulnerable families in maintaining nutrition during crisis</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">6. Partnerships & Awareness Campaigns</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Engage with mosques, NGOs, businesses, and donors to expand support</li>
                  <li>Educate communities on Sadaqah Jariyah (ongoing charity) and collective giving</li>
                </ul>
              </div>
            </div>

            {/* Program Benefits */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-[#0073B7] uppercase tracking-wide">PROGRAM BENEFITS</h3>
              
              <div>
                <h4 className="font-bold text-[#0073B7]">For Recipients</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li><strong className="text-slate-700">Immediate Relief:</strong> Access to nutritious food for families facing hardship</li>
                  <li><strong className="text-slate-700">Dignity Preservation:</strong> Receive assistance through a culturally-sensitive, respectful system</li>
                  <li><strong className="text-slate-700">Community Connection:</strong> Remain connected to the broader Muslim community during difficult times</li>
                  <li><strong className="text-slate-700">Seasonal Support:</strong> Special assistance during significant Islamic months like Ramadan and Eid</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">For Donors</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li><strong className="text-slate-700">Spiritual Fulfillment:</strong> Fulfill Islamic obligations of Zakat, Qurban, and Sadaqah</li>
                  <li><strong className="text-slate-700">Transparent Impact:</strong> Receive regular updates on how donations directly impact lives</li>
                  <li><strong className="text-slate-700">Convenient Giving:</strong> Easy contribution methods through digital banking and QR codes</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">For the Community</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li><strong className="text-slate-700">Enhanced Food Security:</strong> Reduction in hunger and malnutrition within the community</li>
                  <li><strong className="text-slate-700">Strengthened Solidarity:</strong> Practical implementation of Islamic principles of mutual care</li>
                  <li><strong className="text-slate-700">Crisis Preparedness:</strong> Established systems for food distribution during emergencies</li>
                  <li><strong className="text-slate-700">Economic Support:</strong> Partnerships with local farmers and food producers strengthen the community economy</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW THE PROGRAM WORKS & COMMUNITY IMPACT */}
      <section className="max-w-6xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-3 space-y-6">
            <img src={img07} alt="Children support" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
            <img src={img09} alt="Livestock program" className="w-full rounded-xl bg-slate-100 object-cover aspect-[4/3]" />
          </div>

          <div className="md:col-span-8 space-y-8 text-xs sm:text-sm text-[#555555]">
            
            {/* How Program Works */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0073B7] uppercase tracking-wide">HOW THE PROGRAM WORKS</h3>
              
              <div>
                <h4 className="font-bold text-[#0073B7]">For Food Recipients</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li><strong className="text-slate-700">Registration Process:</strong> Vulnerable families register through CATA or partner organizations</li>
                  <li><strong className="text-slate-700">Needs Assessment:</strong> CATA evaluates family circumstances and specific needs</li>
                  <li><strong className="text-slate-700">Regular Distribution:</strong> Eligible families receive scheduled food packages</li>
                  <li><strong className="text-slate-700">Emergency Assistance:</strong> Immediate support available during crises or urgent needs</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">For Food Donors</h4>
                <p className="font-semibold text-slate-700 mt-2">Contribution Options:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>One-Time Donations: Provide immediate food support through cash or food items</li>
                  <li>Zakat Designation: Allocate Zakat funds specifically for food security programs</li>
                  <li>Qurban Participation: Register for Qurban service with meat distribution</li>
                  <li>Waqf Endowment: Contribute to long-term food production assets</li>
                  <li>Monthly Giving: Join the regular donor program with automatic contributions</li>
                </ul>

                <p className="font-semibold text-slate-700 mt-3">Donation Methods:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Online transfers through banking partners</li>
                  <li>Direct food contributions to collection centers</li>
                  <li>Scan the KHQR code for instant monetary donations</li>
                  <li>In-person donations at CATA offices</li>
                </ul>
              </div>
            </div>

            {/* Community Impact */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-[#0073B7] uppercase tracking-wide">COMMUNITY IMPACT</h3>
              <p>The CATA Food Bank Initiative creates meaningful change through:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-slate-700">Immediate Hunger Reduction:</strong> Hundreds of families receive regular nutritious meals</li>
                <li><strong className="text-slate-700">Child Nutrition Improvement:</strong> Special focus on providing nutrition for growing children</li>
                <li><strong className="text-slate-700">Elderly Support:</strong> Dedicated assistance for elderly community members</li>
                <li><strong className="text-slate-700">Sustainable Food Sources:</strong> Development of community farms and food production capabilities</li>
                <li><strong className="text-slate-700">Emergency Resilience:</strong> Established systems for rapid food distribution during crises</li>
                <li><strong className="text-slate-700">Religious Observance:</strong> Supporting families to maintain dignity during Ramadan and Eid celebrations</li>
                <li><strong className="text-slate-700">Community Cohesion:</strong> Strengthening ties between donors and recipients within the Muslim community</li>
              </ul>
            </div>

            {/* Join Today */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-[#0073B7] uppercase tracking-wide">JOIN TODAY</h3>
              
              <div>
                <h4 className="font-bold text-[#0073B7]">As a Recipient</h4>
                <p className="mt-1">If you or someone you know is facing food insecurity:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li>Visit the CATA office to register for assistance</li>
                  <li>Contact our helpline: +855 90 311 195</li>
                  <li>Have a community leader or Imam refer your case</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0073B7]">As a Donor</h4>
                <p className="mt-1">Become part of this vital community initiative:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 pl-2">
                  <li><strong className="text-slate-700">Regular Giving:</strong> Register for monthly food bank contributions</li>
                  <li><strong className="text-slate-700">Zakat Allocation:</strong> Designate your Zakat specifically to food security</li>
                  <li><strong className="text-slate-700">Qurban Registration:</strong> Register early for upcoming Eid al-Adha</li>
                  <li><strong className="text-slate-700">Waqf Contribution:</strong> Invest in sustainable food production</li>
                  <li><strong className="text-slate-700">Volunteer:</strong> Offer your time and skills to support operations</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PAYMENT / KHQR PAYMENT STANDS SECTION */}
      <section className="max-w-4xl mx-auto px-4 pt-16 flex flex-col sm:flex-row justify-center items-center gap-8">
        {/* KHR QR Code Standee Image */}
        <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg border border-slate-200  flex items-center justify-center">
          <img 
            src={khqrKhrImg} 
            alt="KHQR KHR Payment Stand" 
            className="w-full h-full object-contain" 
          />
        </div>

        {/* USD QR Code Standee Image */}
        <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg border border-slate-200  flex items-center justify-center">
          <img 
            src={khqrUsdImg} 
            alt="KHQR USD Payment Stand" 
            className="w-full h-full object-contain" 
          />
        </div>
      </section>

    </div>
  );
}