import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { routes } from '../../data/routes.js'

// Separate "about" route items if defined in routes, or separate normal routes from about sub-routes
const navLinks = routes.filter(
  (route) => route.path !== '/' && route.path !== '/donate' && !route.path.startsWith('/about')
)

// About dropdown items for the About Us menu
const aboutDropdownItems = [
  { label: 'Who We Are', path: '/about-us' },
  { label: 'Governance & Structure', path: '/about/governance-structure' },
  { label: 'Management Level', path: '/about/management-level' },
  { label: 'Secretariat', path: '/about/secretariat' },
  { label: 'Shariah Advisory Committee', path: '/about/shariah-advisory-committee' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-amber-100 bg-gradient-to-r from-amber-50/80 via-white to-orange-50/80 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900">
          <img
            src="https://www.takafulcambodia.org/wp-content/uploads/2024/09/Asset-1-1024x260.png"
            alt="Takaful Cambodia"
            className="w-auto h-15"
          />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex items-center justify-center w-10 h-10 transition bg-white border rounded-full shadow-sm border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 lg:hidden"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-6 text-base text-slate-700 lg:flex">
         {/* About Us Dropdown Container */}
<div className="relative py-2 group">
  <button
    type="button"
    className="inline-flex items-center gap-1.5 text-slate-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-orange-500 focus:outline-none"
  >
    <Link
    to="/about-us"
    className="inline-flex items-center gap-1.5 text-slate-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-orange-500 focus:outline-none"
  >
    <span>About Us</span>
    <svg
      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
    </Link>
  </button>

  {/* Dropdown Menu (hidden by default, shown on group hover) */}
  <div className="absolute left-0 hidden w-56 p-2 transition-all duration-200 bg-white border shadow-xl top-full rounded-2xl border-slate-100 ring-1 ring-black/5 group-hover:block">
    {aboutDropdownItems.map((item) => (
      <NavLink
        key={item.label}
        to={item.path}
        className={({ isActive }) =>
          `block rounded-xl px-4 py-2.5 text-sm transition ${
            isActive
              ? 'bg-orange-50 font-semibold text-orange-500'
              : 'text-slate-600 hover:bg-orange-50 hover:text-orange-500'
          }`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </div>
</div>

          {/* Remaining Nav Links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `inline-block transition-all duration-200 hover:-translate-y-0.5 ${
                  isActive
                    ? 'font-semibold text-orange-500'
                    : 'text-slate-600 hover:text-orange-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Donate Button */}
        <div className="flex items-center order-last gap-3 lg:order-none">
          <Link
            to="/donate"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
          >
            Donate Now
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 ${
          menuOpen ? 'max-h-[30rem] py-4' : 'max-h-0 py-0'
        }`}
      >
        <nav className="px-4 space-y-2">
          {/* Mobile About Us Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileAboutOpen((prev) => !prev)}
              className="flex items-center justify-between w-full px-4 py-3 text-base transition rounded-2xl text-slate-700 hover:bg-slate-50 hover:text-orange-500"
            >
              <span>About Us</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileAboutOpen && (
              <div className="pl-2 mt-1 ml-4 space-y-1 border-l-2 border-slate-100">
                {aboutDropdownItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      setMenuOpen(false)
                      setMobileAboutOpen(false)
                    }}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-2 text-sm transition ${
                        isActive
                          ? 'bg-orange-50 font-semibold text-orange-500'
                          : 'text-slate-600 hover:bg-orange-50 hover:text-orange-500'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Remaining Mobile Nav Links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-base transition ${
                  isActive
                    ? 'bg-orange-50 font-semibold text-orange-500'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-orange-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header