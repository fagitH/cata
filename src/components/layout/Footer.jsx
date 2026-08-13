import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import playStore from '../../assets/image/footer/googleplay.png';
import appStore from '../../assets/image/footer/appstore.png';
import visa from '../../assets/image/footer/visa.png';
import master from '../../assets/image/footer/master.png';
import union from '../../assets/image/footer/unionpay-logo-china.png';
import jcb from '../../assets/image/footer/jcb.jpg';

export default function Footer() {
  return (
    <footer className="bg-[#0a192f] text-white py-12 px-6 font-sans">
      <div className="grid items-start grid-cols-1 gap-10 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Logo, Copyright, Social Icons */}
        <div className="space-y-4">
          <Link to="/" className="inline-block">
            <img
              src="https://www.takafulcambodia.org/wp-content/uploads/2024/09/Asset-1-1024x260.png"
              alt="Cambodian Amanah Takaful Association"
              className="object-contain w-auto h-14"
            />
          </Link>

          <div className="space-y-1 text-sm leading-tight text-slate-300">
            <p>©2026 Takaful Cambodia</p>
            <p>All rights reserved.</p>
          </div>

          {/* Social Media Buttons (SVG) */}
          <div className="flex items-center gap-2 pt-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/%E1%9E%9F%E1%9E%98%E1%9E%B6%E1%9E%82%E1%9E%98%E1%9E%A2%E1%9E%B6%E1%9E%8E%E1%9F%87%E1%9E%8F%E1%9E%B6%E1%9E%80%E1%9E%B6%E1%9E%A0%E1%9F%92%E1%9E%9C%E1%9E%BB%E1%9E%9B%E1%9E%80%E1%9E%98%E1%9F%92%E1%9E%96%E1%9E%BB%E1%9E%87%E1%9E%B6/100088893735790/"
              className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.412 22.027 24 17.062 24 12.073z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-[#00acee] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UCwbNKD6eeq_zE5Zz8EpznDg"
              className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/amanahtakafulassociation"
              className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Telegram"
            >
              <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.02 9.51c-.15.68-.56.84-1.13.52l-3.1-2.28-1.5 1.44c-.17.17-.31.31-.63.31l.22-3.17 5.77-5.21c.25-.22-.05-.35-.39-.13l-7.14 4.5-3.08-.96c-.67-.21-.68-.67.14-.99l12.03-4.64c.56-.2 1.05.13.85.91z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-[#262626] border border-slate-700 flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Get in Touch */}
        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">Get in Touch</h3>
          <ul className="space-y-3 text-sm italic leading-relaxed list-disc list-inside text-slate-200">
            <li className="pl-1">
              <span className="not-italic">
                Al-Serkal International Mosque, #1, St 86, Sangkat Srah Chak ,
                Khan Daun Penh, Phnom Penh
              </span>
            </li>
            <li className="pl-1 not-italic">
              <a
                href="mailto:info@takafulcambodia.org"
                className="hover:underline"
              >
                info@takafulcambodia.org
              </a>
            </li>
            <li className="pl-1 not-italic">
              +855 99 311 195/ 98 311 195/ 90 311 195
            </li>
          </ul>
        </div>

        {/* Column 3: Learn More */}
     <div>
  <h3 className="mb-4 text-2xl font-bold text-white">Learn More</h3>
  <ul className="space-y-2.5 text-sm">
    <li>
      <Link
        to="/about-us"
        className="flex items-center gap-2 transition-colors group"
      >
        <ChevronRight className="w-4 h-4 text-white transition-colors shrink-0 group-hover:text-amber-400" />
        <span className="transition-colors group-hover:text-amber-400">About us</span>
      </Link>
    </li>
    <li>
      <Link
        to="/partnership"
        className="flex items-center gap-2 transition-colors group"
      >
        <ChevronRight className="w-4 h-4 text-white transition-colors shrink-0 group-hover:text-amber-400" />
        <span className="transition-colors group-hover:text-amber-400">Partner</span>
      </Link>
    </li>
    <li>
      <Link
        to="/blogs"
        className="flex items-center gap-2 transition-colors group"
      >
        <ChevronRight className="w-4 h-4 text-white transition-colors shrink-0 group-hover:text-amber-400" />
        <span className="transition-colors group-hover:text-amber-400">Blog</span>
      </Link>
    </li>
    <li>
      <Link
        to="/annual-reports"
        className="flex items-center gap-2 font-semibold transition-colors group"
      >
        <ChevronRight className="w-4 h-4 transition-colors text-amber-500 shrink-0 group-hover:text-amber-400" />
        <span className="transition-colors text-amber-500 group-hover:text-amber-400">Annual Report</span>
      </Link>
    </li>
    <li>
      <Link
        to="/contact"
        className="flex items-center gap-2 transition-colors group"
      >
        <ChevronRight className="w-4 h-4 text-white transition-colors shrink-0 group-hover:text-amber-400" />
        <span className="transition-colors group-hover:text-amber-400">Contact us</span>
      </Link>
    </li>
    <li>
      <Link
        to="/privacy-policy"
        className="flex items-center gap-2 pt-1 transition-colors group"
      >
        <Check className="w-4 h-4 text-white shrink-0 stroke-[3] transition-colors group-hover:text-amber-400" />
        <span className="transition-colors group-hover:text-amber-400">Privacy Policy</span>
      </Link>
    </li>
    <li>
      <Link
        to="/terms-refund"
        className="flex items-center gap-2 transition-colors group"
      >
        <Check className="w-4 h-4 text-white shrink-0 stroke-[3] transition-colors group-hover:text-amber-400" />
        <span className="transition-colors group-hover:text-amber-400">Terms & Refunds</span>
      </Link>
    </li>
  </ul>
</div>

        {/* Column 4: We Accept & App Store Links */}
        <div>
          <h3 className="mb-4 text-2xl font-bold text-white">We Accept</h3>
          <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
  {/* VISA */}
  <div className="flex items-center justify-center h-7 px-1 bg-[#093ca9] rounded-md shadow-sm">
    <img
      src={visa}
      alt="VISA"
      className="object-contain w-auto h-8 brightness-0 invert"
    />
  </div>

  {/* Mastercard */}
  <div className="flex items-center justify-center px-1 bg-black border rounded-md shadow-sm h-7 border-slate-800">
    <img
      src={master}
      alt="Mastercard"
      className="object-contain w-auto h-8"
    />
  </div>

  {/* UnionPay */}
  <div className="flex items-center justify-center h-6 px-1 bg-[#e7eeef] rounded-md shadow-sm overflow-hidden">
    <img
      src={union}
      alt="UnionPay"
      className="object-contain w-auto h-5"
    />
  </div>

  {/* JCB */}
  <div className="flex items-center justify-center h-6 px-1 bg-white rounded-md shadow-sm">
    <img
      src={jcb}
      alt="JCB"
      className="object-contain w-auto h-5"
    />
  </div>
</div>

       <div className="flex flex-col gap-3 pt-2">
  <a
    href="https://play.google.com/store/apps/details?id=com.takaful.cata"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block transition-transform hover:scale-105"
  >
    <img
      src={playStore}
      alt="Google Play"
      className="object-contain w-auto border rounded-lg h-11 border-slate-400"    />
  </a>

  <a
    href="https://apps.apple.com/kh/app/cata-community/id6753057481"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block transition-transform hover:scale-105"
  >
    <img
      src={appStore}
      alt="App Store"
      className="object-contain w-auto h-11"
    />
  </a>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
}