import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { routes } from '../../data/routes.js'

// Filter routes: automatically includes Annual Reports and Newsletter in correct order from routes.js
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
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-amber-100 bg-gradient-to-r from-amber-50/80 via-white to-orange-50/80 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-4">
          
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-slate-900">
            <img
              src="https://www.takafulcambodia.org/wp-content/uploads/2024/09/Asset-1-1024x260.png"
              alt="Takaful Cambodia"
              className="w-auto h-12 sm:h-15"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-5 text-base text-slate-700 lg:flex xl:gap-6">
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

              {/* Dropdown Menu */}
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

            {/* Main Nav Links (News, Blogs, Contact, Partnership, Annual Reports, Newsletter) */}
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

          {/* Desktop Donate Button */}
          <div className="hidden lg:flex lg:items-center">
            <Link
              to="/donate"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Donate Now
            </Link>
          </div>

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
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 ${
            menuOpen ? 'max-h-[35rem] py-4' : 'max-h-0 py-0'
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

            {/* Main Nav Links */}
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

      {/* Floating Mobile Donate Button */}
      <div className="fixed z-50 bottom-5 right-5 lg:hidden">
        <Link
          to="/donate"
          className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white transition-all duration-200 rounded-full shadow-2xl bg-amber-500 shadow-amber-500/50 hover:bg-amber-400 active:scale-95"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Donate Now</span>
        </Link>
      </div>
    </>
  )
}

export default Header
