import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, HandCoins, Lock } from 'lucide-react';
import bgImage from '../assets/image/image.png';
import bgSlide from '../assets/image/Banner1.jpg';
import bgSlide2 from '../assets/image/Banner2.jpg';
import bgSlide3 from '../assets/image/Banner3.jpg';
import bgSlide4 from '../assets/image/Banner6.jpg';
import UsersIconImage from '../assets/image/MyCommunity.png';
import UsersIcon2Image from '../assets/image/HajjFund.png';
import UsersIcon3Image from '../assets/image/FoodBank.png';
import UsersIcon4Image from '../assets/image/business.png';
import UsersIcon5Image from '../assets/image/education.png';
import UsersIcon6Image from '../assets/image/riba.png';
import UsersIcon7Image from '../assets/image/community_project.png';
import datuk from '../assets/image/datuk_OH.png';

/* ---------------------------------------------------------------- */
/*  Animation helpers — self-contained, no tailwind.config changes   */
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

// Flexible Reveal supporting 'up', 'down', 'left' (right-to-left), and 'right' (left-to-right)
function Reveal({ children, className = '', delay = 0, direction = 'up', as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': // Enters from right to left
        return 'translate-x-12'
      case 'right': // Enters from left to right
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

function AnimatedNumber({ value, duration = 1400 }) {
  const [ref, inView] = useInView(0.4)
  const [display, setDisplay] = useState('0')
  const numeric = parseInt(String(value).replace(/,/g, ''), 10)

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) {
      if (Number.isNaN(numeric)) setDisplay(value)
      return
    }
    let start = null
    let raf
    const step = (ts) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numeric)
      setDisplay(current.toLocaleString())
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, numeric, duration, value])

  return <span ref={ref}>{display}</span>
}

/* ---------------------------------------------------------------- */
/*  Content & Banner Data                                           */
/* ---------------------------------------------------------------- */

const bannerSlides = [
  {
    id: 1,
    image: bgSlide,
  },
  {
    id: 2,
    image: bgSlide2,
  },
  {
    id: 2,
    image: bgSlide3,
  },
  {
    id: 2,
    image: bgSlide4,
  },
];

const quickLinks = [
  {
    title: 'MY COMMUNITY FUND',
    href: '/community-fund',
    icon: (
     <img
        src={UsersIconImage}
        alt="User group icon representing team or community"
        className="object-contain h-130 w-130"
      />
    ),
  },
  {
    title: 'LUY KHNOM SAAT',
    href: '/luy-saat',
    icon: (
       <img
        src={UsersIcon6Image}
        alt="User group icon representing team or community"
        className="object-contain h-130 w-130"
      />
    ),
  },
  {
    title: 'HAJJ FUND PROGRAM',
    href: '/hajj-fund',
    icon: (
     <img
        src={UsersIcon2Image}
        alt="User group icon representing team or community"
        className="object-contain h-130 w-130"
      />
    ),
  },
  {
    title: 'FOOD BANK',
    href: '/food',
    icon: (
      <img
        src={UsersIcon3Image}
        alt="User group icon representing team or community"
        className="object-contain h-130 w-130"
      />
    ),
  },
  {
    title: 'BUSINESS NETWORK',
    href: 'https://cbc.takafulcambodia.org/',
    icon: (
       <img
        src={UsersIcon4Image}
        alt="User group icon representing team or community"
        className="object-contain h-130 w-130"
      />
    ),
  },
  {
    title: 'EDUCATION PROGRAMS',
    href: '/cata-youth',
    icon: (
      <img
        src={UsersIcon5Image}
        alt="User group icon representing team or community"
        className="object-contain h-130 w-130"
      />
    ),
  },
  {
    title: 'COMMUNITY PROJECTS',
    href: '/community-project',
    icon: (
       <img
        src={UsersIcon7Image}
        alt="User group icon representing team or community"
        className="object-contain h-130 w-130"
      />
    ),
  },
];



// Direction setting for the 4 activity cards
const activities = [
  {
    title: 'Education Package for Orphan',
    desc: 'Our generosity can transform a life. By donating to our orphan fundraiser, you’re helping provide the next generation with a new life.',
    price: 'USD10/Package',
    href: '/donate-education',
    direction: 'right', // 1st object (Left) comes from left
  },
  {
    title: 'Qurban Project in Cambodia',
    desc: 'Giving your Qurban (a sacrifice) is a sacred duty ordered by Allah (SWT). Every year during the holy month of Dhul Hijjah.',
    price: 'USD650/Cow',
    href: '/donate-qurban',
    direction: 'up', // Middle object comes from bottom
  },
  {
    title: 'Ramadhan Food Packages',
    desc: 'Continuing the tradition, in Ramadan 2026, with the help of Allah, we will be distributing Ramadan Food Packs across countries this year.',
    price: 'USD30/Package',
    href: '/donate-ramadhan',
    readMore: '/donate-ramadhan',
    direction: 'up', // Middle object comes from bottom
  },
  {
    title: 'Zakat to help the Poor',
    desc: 'Zakat is an obligatory contribution used to reduce the hardships faced by communities and families living in poverty.',
    price: 'Any Amount',
    href: '/zakat-calculate',
    ctaLabel: 'Calculate Your Zakat',
    direction: 'left', // 4th object (Right) comes from right
  },
]

const impactStats = [
  { value: '1600', label: 'Total membership 2024' },
  { value: '85', label: 'Retirement Members' },
  { value: '8', label: 'Former Members' },
  { value: '10000', label: 'Total impact 2025' },
  { value: '6', label: 'Total project 2025' },
]

const sadaqah = [
  {
    tab: 'Wells Water',
    caption:
      'Every year, 3.5 million people lose their lives due to water-related diseases, of which 2.2 million are children. We can make a difference in these lives by providing them with a source of clean water.',
    title: 'Water Wells',
    desc: 'Did you know that more than 780 million people lack access to safe and clean and drinking water? That’s more than one in every 10 people on the planet! To add, nearly 1 million people die each year from waterborne diseases, with children being the most susceptible, affecting their ability to receive an education.',
    price: null,
    ctaLabel: 'Read More',
    href: '/donate-water-well',
  },
  {
    tab: 'Orphans',
    caption:
      'Almost 5,700 children are orphaned every day due to war, natural disasters, poverty, and diseases. Whatever the cause, many of these children are alone and vulnerable. Help us give them a fighting chance at a brighter future.',
    title: 'Orphans in Cambodia',
    desc: 'Our mission is to improve the lives of orphans and give them hope for a brighter future by providing essential resources such as food, shelter, education, and medical care. Join us in making a difference in the lives of orphans and help us create a world where every child has a chance to thrive.',
    price: '$ any amount',
    ctaLabel: 'Donate Now',
    href: '/donate-education',
  },
  {
    tab: 'Building School',
    caption:
      'Almost 10,000 children are not able to go to school due to financial crisis, family cannot afford to pay the school fees, there is not enough school for children to study especially in the rural area.',
    title: 'Build School for Students',
    desc: 'Our mission is to provide a school to children living in the rural area and make them one part of the world. Brighten the future for young children.',
    price: '$ any amount',
    ctaLabel: 'Donate Now',
    href: '/donate-school',
  },
  {
    tab: 'Plant Trees',
    caption:
      'You can be a part of growing a greener future. So far, we’ve planted 9.5 million trees in the National Forest, our next milestone is 10 million, and your support can help us to reach that target.',
    title: 'Plant Trees',
    desc: 'Trees are transformational, benefiting people, wildlife, and our environment. You can support tree planting in the National Forest in many ways, each helping to grow a greener future for everyone.',
    price: '$ any amount',
    ctaLabel: 'Read More',
    href: '/donate-plant',
  },
]


const learnMoreLinks = [
  { label: 'About us', href: '/about-us' },
  { label: 'Partner', href: '/partner' },
  { label: 'Blog', href: '/blog' },
  { label: 'Annual Report', href: '/category/annual-report' },
  { label: 'Contact us', href: '/contact-us' },
  { label: 'Privacy Policy', href: '/privacy-policy-2' },
  { label: 'Terms & Refunds', href: '/terms-and-conditions' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100088893735790' },
  { label: 'Twitter', href: 'https://twitter.com/home' },
  { label: 'Youtube', href: 'https://www.youtube.com/channel/UCwbNKD6eeq_zE5Zz8EpznDg' },
  { label: 'Telegram', href: 'https://t.me/amanahtakafulassociation' },
  { label: 'Instagram', href: '#' },
]

const featuredFunds = [
  {
    title: "My Community Fund",
    youtubeId: "w68M_HSJE5Q"
  },
  {
    title: "Building A School",
    youtubeId: "4q62yT7Wuy0"
  },
  {
    title: "Water Well Project",
    youtubeId: "2AX1l50a8m4"
  }
];

const trustBadges = [
  {
    title: "100% Secure Checkout",
    icon: <ShieldCheck className="w-8 h-8" />,
  },
  {
    title: "100% Donation Policy",
    icon: <HandCoins className="w-8 h-8" />,
  },
  {
    title: "We Protect Your Privacy",
    icon: <Lock className="w-8 h-8" />,
  },
];

export default function Home() {
  const [activeSadaqahTab, setActiveSadaqahTab] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasPopped, setHasPopped] = useState(false)
  const activeSadaqah = sadaqah[activeSadaqahTab]
  const isFirstLoad = !hasPopped
  useEffect(() => {
    const popTimeout = setTimeout(() => setHasPopped(true), 800)
    return () => clearTimeout(popTimeout)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes popScale {
          0% { opacity: 0; transform: scale(0.6); }
          70% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-pop-scale {
          animation: popScale 700ms ease-out both;
          transform-origin: center;
        }
        .slide-right {
          animation: slideRight 700ms ease-out both;
        }
        .slide-image-pop {
          animation: popScale 850ms ease-out both;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
          @keyframes smoothHalo {
          0% {
            transform: scale(1);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          75% {
            opacity: 0.2;
          }
          100% {
            transform: scale(1.48);
            opacity: 0;
          }
        }

        .group:hover .group-hover\\:animate-smoothHaloDelayed {
          animation: smoothHalo 1s cubic-bezier(0, 0, 0.2, 1) 0.1s infinite;
          will-change: transform, opacity;
        }
      `}</style>

      {/* ===== QUICK LINKS GRID ===== */}
   <section
  className="relative px-4 overflow-hidden bg-center bg-cover py-14"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Light Overlay */}
  <div className="absolute inset-0 pointer-events-none bg-white/75" />

  <div className="relative z-10 mx-auto max-w-7xl">
    <div className="grid grid-cols-2 text-center gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
      {quickLinks.map((link, idx) => (
        <Link
          key={idx}
          to={link.href}
          className="relative flex flex-col items-center justify-start w-full cursor-pointer group"
        >
          {/* Outer Icon Wrapper */}
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 shrink-0">
            
            {/* 🌟 STAGGERED WAVE 1 🌟 */}
            <span className="absolute inset-0 z-0 rounded-full opacity-0 pointer-events-none bg-slate-400/40 group-hover:animate-smoothHalo" />
            
            {/* 🌟 STAGGERED WAVE 2 🌟 */}
            <span className="absolute inset-0 z-0 rounded-full opacity-0 pointer-events-none bg-slate-400/40 group-hover:animate-smoothHaloDelayed" />

            {/* Main Blue Badge */}
            <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-[#0070ba] text-white shadow-md border-4 border-white outline outline-2 outline-[#0070ba] transition-colors duration-300 group-hover:bg-[#005ba1] pointer-events-none">
              
              {/* Inner Dashed Ring Accent */}
              <div className="absolute border border-dashed rounded-full pointer-events-none inset-1 border-white/60" />

              {/* Icon */}
              <div className="relative z-20 flex items-center justify-center pointer-events-none">
                {link.icon}
              </div>
            </div>

          </div>

          {/* Title Label */}
          <span className="mt-2.5 text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-tight w-full max-w-[120px] leading-tight group-hover:text-[#0070ba] transition-colors duration-300 break-words pointer-events-none">
            {link.title}
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>


      {/* ===== HERO BANNER SLIDE ===== */}
     <section className="py-6 bg-slate-100">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="relative overflow-hidden bg-white shadow-md rounded-2xl">
      {bannerSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`transition-all duration-700 ease-in-out ${
            idx === currentSlide
              ? isFirstLoad
                ? 'block opacity-100 animate-pop-scale'
                : 'block opacity-100 slide-right'
              : 'hidden opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Banner slide ${slide.id}`}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute left-0 right-0 z-20 flex justify-center gap-2 bottom-4">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === i ? 'w-8 bg-[#0b3d3a]' : 'w-2.5 bg-slate-300/80 hover:bg-slate-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ===== CHAIR OF BOARD SPEECH ===== */}
<section className="py-12 bg-[#2b72a4]">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-lg grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
      
      {/* Left Column: Circular Photo & Speaker Info */}
      <Reveal>
        <div className="flex flex-col items-center text-center">
          {/* Circular Image Container */}
          <div className="flex-shrink-0 overflow-hidden border-2 rounded-full shadow-sm w-52 h-52 sm:w-60 sm:h-60 border-slate-200 bg-slate-100">
            <img
              src={datuk} /* Replace with your image path */
              alt="HE Neak Oknha Datuk Dr. Othsman Hassan"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name & Title */}
          <h3 className="mt-6 text-base sm:text-lg font-bold text-[#1f6393] leading-snug">
            HE Neak Oknha Datuk Dr. <br /> Othsman Hassan
          </h3>

          {/* Horizontal Divider Line */}
          <div className="w-full max-w-[220px] h-[1px] bg-slate-800 my-3" />

          <p className="text-sm font-bold tracking-wide uppercase text-slate-900">
            Board of Directors
          </p>
        </div>
      </Reveal>

      {/* Right Column: Speech Text */}
      <Reveal delay={150}>
        <div>
          <h2 className="text-2xl font-bold text-[#1f6393] sm:text-3xl">
            Speech by the Chair of the Board of Directors
          </h2>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-800">
            <p className="font-bold text-slate-900">
              Bismillahirrahmanirrahim.
            </p>
            <p>
              Distinguished guests, respected scholars, partners, donors, and dear
              brothers and sisters,
            </p>
            <p className="font-bold text-slate-900">
              Assalamu'alaikum warahmatullahi wabarakatuh.
            </p>
            <p>
              On behalf of the Board of Directors of the Cambodian Amanah Takaful
              Association, it is my honor to welcome you all today and to thank you
              for your presence and continued support.
            </p>
            <p>
              CATA was established with a clear mission: to strengthen solidarity,
              promote mutual assistance, and support sustainable development
              within Cambodia's Muslim community through{' '}
              <strong className="font-bold text-slate-900">
                Shariah-compliant and ethical initiatives
              </strong>
              . Our work is guided by the values of <em>Amanah</em>, transparency,
              and collective responsibility.
            </p>
            <p>
              I would like to take this opportunity to express our sincere
              appreciation to{' '}
              <strong className="font-bold text-slate-900">
                Mr. SEN Saman, Executive Director of CATA
              </strong>
              , and the entire{' '}
              <strong className="font-bold text-slate-900">Management Team</strong>{' '}
              for their dedication, professionalism, and strong leadership. Under
              their guidance, CATA has continued to grow as a trusted institution,
              delivering impactful programs such as the{' '}
              <strong className="font-bold text-slate-900">
                My Community Fund
              </strong>
              ,{' '}
              <strong className="font-bold text-slate-900">
                RIBA Clearance
              </strong>
              ,{' '}
              <strong className="font-bold text-slate-900">Hajj Fund</strong>
              , and{' '}
              <strong className="font-bold text-slate-900">
                Islamic Business Cooperative
              </strong>
              , all of which serve the social, economic, and spiritual needs of
              our community.
            </p>
            <p>
              As a Board, we remain fully committed to ensuring strong governance,
              accountability, and strategic direction, while supporting management
              in achieving CATA's long-term vision. Our progress would not be
              possible without the trust of our members, the generosity of our
              donors, and the collaboration of our partners.
            </p>
            <p>
              Looking ahead, we reaffirm our commitment to unity, ethical
              leadership, and sustainable growth, so that CATA may continue to
              serve the Ummah and contribute positively to national development.
            </p>
            <p>
              May Allah bless our efforts and grant success to all who support this
              noble mission.
            </p>
            <p className="font-bold text-slate-900">
              Wassalamu'alaikum warahmatullahi wabarakatuh.
            </p>
          </div>
        </div>
      </Reveal>

    </div>
  </div>
</section>

     {/* ===== OUR ACTIVITIES (UPDATED ANIMATIONS) ===== */}
<section className="py-16 bg-slate-50 lg:py-24">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <Reveal direction="up">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our Activities</h2>
    </Reveal>

    <div className="grid grid-cols-1 gap-6 mt-10 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
      {activities.map((a, i) => (
        <Reveal
          key={a.title}
          delay={i * 100}
          direction={a.direction}
          className="h-full"
        >
          <div className="flex flex-col h-full p-5 bg-white rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-100">
              <img
                src={a.image || 'https://via.placeholder.com/400x300'}
                alt={a.title}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">{a.title}</h3>
            <p className="flex-1 mt-2 text-sm leading-relaxed text-slate-600">{a.desc}</p>
            {a.readMore && (
              <Link to={a.readMore} className="mt-2 text-xs font-bold uppercase text-[#0b3d3a]">
                Read More
              </Link>
            )}
            <p className="mt-3 text-sm font-bold text-slate-800">{a.price}</p>
            <Link
              to={a.href}
              className="mt-4 w-full rounded-md bg-[#f2a900] px-4 py-2.5 text-center text-sm font-bold text-[#0b3d3a] transition-colors duration-300 hover:bg-[#d99600]"
            >
              {a.ctaLabel || 'Donate Now'}
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>

      {/* ===== THE CATA IMPACT ===== */}
      <section className="bg-[#0b3d3a] py-16 text-white lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold sm:text-3xl">The CATA impact</h2>
          </Reveal>
          <div className="grid grid-cols-2 mt-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {impactStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <p className="text-4xl font-extrabold text-[#f2a900]">
                  <AnimatedNumber value={s.value} />
                </p>
                <p className="mt-2 text-sm text-white/70">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     {/* ===== OUR PROMISE TO YOU ===== */}
<section className="py-10 bg-white border-t border-b border-slate-200">
  <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
    <Reveal>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
        
        {/* Left Side Badge */}
        <div className="flex items-center justify-center flex-shrink-0">
          <svg
            viewBox="0 0 220 220"
            className="object-contain select-none w-28 h-28 sm:w-32 sm:h-32"
          >
            <defs>
              <path
                id="badgeTopArc"
                d="M 30,110 A 80,80 0 0,1 190,110"
                fill="none"
              />
              <path
                id="badgeBottomArc"
                d="M 190,110 A 80,80 0 0,1 30,110"
                fill="none"
              />
            </defs>

            <text
              fill="#6e5d54"
              fontSize="16"
              fontWeight="800"
              letterSpacing="2.2"
              fontFamily="sans-serif"
            >
              <textPath href="#badgeTopArc" startOffset="50%" textAnchor="middle">
                CATA - PROJECT
              </textPath>
            </text>

            <text
              fill="#c39d63"
              fontSize="16"
              fontWeight="800"
              letterSpacing="2.2"
              fontFamily="sans-serif"
            >
              <textPath href="#badgeBottomArc" startOffset="50%" textAnchor="middle">
                DONATION POLICY
              </textPath>
            </text>

            <circle cx="110" cy="110" r="74" fill="#f58220" />

            <text
              x="110"
              y="122"
              fill="#ffffff"
              fontSize="36"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              100<tspan fontSize="22" dx="1" dy="-10">%</tspan>
            </text>
          </svg>
        </div>

        {/* Right Side Content */}
        <div className="flex-1 max-w-2xl text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2374ae] tracking-wide inline-block">
            Our Promise To You:
          </h2>
          
          <div className="w-full h-[1.5px] bg-slate-700 my-2" />

          <p className="text-sm leading-relaxed sm:text-base text-slate-600">
            Founded by Saman SEN in 2022, CATA is a Local Charity working across
            states around the country. Our 100% donation policy ensures that every
            single donation goes the extra mile in reaching those most in need.
          </p>
        </div>

      </div>
    </Reveal>
  </div>
</section>

    {/* ===== CATA'S VISION CARD ===== */}
<section className="py-12 bg-[#bce3f2] lg:py-16">
  <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
    <Reveal>
      {/* White Card Container */}
      <div className="p-8 text-center bg-white shadow-sm rounded-3xl sm:p-14">
        
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1876b9] leading-snug tracking-tight max-w-4xl mx-auto">
          CATA's Vision Was Clear: Build A Legacy To Help Every Needy Muslim In Cambodia.
        </h2>

        {/* Description Paragraph */}
        <p className="max-w-3xl mx-auto mt-6 text-sm font-normal leading-relaxed text-slate-500 sm:text-base">
          CATA started the Project as a legacy project that now reaches millions of
          Muslims in Cambodia. This Ramadan was no different. Thanks to YOU, our
          generous donors, Ramadan 2024 has been our biggest yet. You didn't
          hesitate when called upon. You made it possible for us to help{' '}
          <span className="whitespace-nowrap">1,142,706</span> Muslims in some of the poorest parts of the Cambodia. We
          couldn't be more grateful for your support!
        </p>

        {/* Action Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/news"
            className="inline-block px-7 py-3 text-sm font-semibold text-white bg-[#f58220] hover:bg-[#e07318] rounded-lg shadow-sm transition-all duration-200"
          >
            See your impact here
          </Link>
        </div>

      </div>
    </Reveal>
  </div>
</section>

     {/* ===== CATA'S YOUTH ===== */}
<section className="py-8 bg-white lg:py-10">
  <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
    <div className="grid items-center gap-6 md:grid-cols-[280px_1fr] lg:gap-8">
      
      {/* Left Column: Blank Image Placeholder */}
      <Reveal>
        <div className="overflow-hidden rounded-xl aspect-[4/3] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
          <img
            src="" /* <--- PASTE YOUR IMAGE PATH HERE */
            alt="CATA's Youth"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Visual placeholder text when image is empty */}
          <span className="text-xs font-medium text-slate-400">Insert Image Here</span>
        </div>
      </Reveal>

      {/* Right Column: Text & CTA */}
      <Reveal delay={150}>
        <div className="flex flex-col items-start">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1f6393]">
            CATA's Youth
          </h2>

          <p className="mt-2 text-xs leading-relaxed sm:text-sm text-slate-500">
            The “CATA’s Youth” program is dedicated to fostering the sharing of new
            information, enhancing skill development through short courses,
            offering insights on youth and community issues, providing job
            opportunities for young individuals, engaging in social welfare
            activities, and more.
          </p>

          <Link
            to="/cata-youth"
            className="mt-4 inline-block rounded-md bg-[#f58220] px-5 py-2 text-xs sm:text-sm font-semibold text-white! shadow-sm transition-all duration-200 hover:bg-[#e07318]"
          >
            Read More
          </Link>
        </div>
      </Reveal>

    </div>
  </div>
</section>

   {/* ===== SADAQAH JARIYAH ===== */}
<section className="py-10 bg-[#bce3f2] lg:py-12">
  <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
    
    {/* Centered Top Header */}
    <Reveal>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-bold text-[#1f6393] sm:text-2xl">
          Sadaqah Jariyah
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
          Sadaqah Jariyah, the gift that keeps giving, is a charitable practice
          with everlasting impact. Like CATA, who left a legacy of Sadaqah
          Jariyah through you too can do the same, contributing to a mosque or
          water well in your name or for a loved one. This enduring act ensures
          positive change in the lives of those in need, planting the seeds of
          everlasting rewards.
        </p>
      </div>
    </Reveal>

    {/* Pill Filter Tabs (Hover Orange) */}
    <Reveal delay={100}>
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
        {sadaqah.map((item, i) => (
          <button
            key={item.tab}
            onClick={() => setActiveSadaqahTab(i)}
            className={`px-5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              activeSadaqahTab === i
                ? 'bg-[#f58220] !text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-[#f58220] hover:!text-white'
            }`}
          >
            {item.tab}
          </button>
        ))}
      </div>
    </Reveal>

    {/* Outer Blue Card Container (Made Smaller) */}
    <div
      key={activeSadaqahTab}
      className="mt-6 overflow-hidden bg-[#1f6393] rounded-2xl shadow-sm p-5 sm:p-6"
      style={{ animation: 'fadeInUp 0.4s ease-out both' }}
    >
      {/* Top Banner Text Inside Blue Container */}
      {activeSadaqah.caption && (
        <p className="mb-4 text-xs font-medium leading-relaxed !text-white sm:text-xs">
          {activeSadaqah.caption}
        </p>
      )}

      {/* Inner White Box (Compact Grid Layout) */}
      <div className="p-5 bg-white rounded-xl sm:p-6">
        <div className="grid items-center gap-5 md:grid-cols-[240px_1fr] lg:gap-6">
          
          {/* Left Column: Compact Image Placeholder */}
          <div className="overflow-hidden bg-slate-100 rounded-lg aspect-[4/3] flex items-center justify-center border border-slate-200 relative">
            <img
              src={activeSadaqah.image || ''}
              alt={activeSadaqah.title}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-[11px] text-slate-400 font-medium">Insert Image Here</span>
          </div>

          {/* Right Column: Text and Action Button */}
          <div className="flex flex-col items-start">
            <h3 className="text-base font-bold text-[#1f6393] sm:text-lg">
              {activeSadaqah.title}
            </h3>

            <p className="mt-2 text-xs leading-relaxed whitespace-pre-line text-slate-500">
              {activeSadaqah.desc}
            </p>

            {activeSadaqah.price && (
              <p className="mt-2 text-xs font-bold text-slate-800">
                {activeSadaqah.price}
              </p>
            )}

            <Link
              to={activeSadaqah.href || '#'}
              className="mt-4 inline-block rounded-md bg-[#f58220] px-5 py-2 text-xs font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-[#e07318]"
            >
              {activeSadaqah.ctaLabel || 'Read More'}
            </Link>
          </div>

        </div>
      </div>
    </div>

  </div>
</section>

   {/* ===== FEATURED FUNDS STRIP WITH YOUTUBE EMBEDS ===== */}
<section className="py-12 bg-white lg:py-16">
  <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {featuredFunds.map((f, i) => (
        <Reveal key={f.id || f.title || i} delay={i * 100}>
          <div className="flex flex-col items-center text-center">
            
            {/* Blue Section Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-[#1f6393] mb-4 min-h-[3rem] flex items-center justify-center">
              {f.title}
            </h3>

            {/* YouTube Embedded Video Container */}
            <div className="w-full overflow-hidden shadow-md rounded-2xl bg-slate-100 aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${f.youtubeId}`}
                title={f.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>

  {/* ===== TRUST BADGES ===== */}
<section className="relative py-10 bg-[#e5e5e5] border-b-4 border-[#1f6393]">
  <div className="grid max-w-4xl grid-cols-1 gap-8 px-4 mx-auto text-center sm:grid-cols-3 sm:px-6 lg:px-8">
    {trustBadges.map((b, i) => (
      <Reveal key={b.title || i} delay={i * 100}>
        <div className="flex flex-col items-center justify-center gap-3">
          
          {/* Icon Container */}
          <div className="text-[#4a4a4a]">
            {b.icon ? (
              b.icon
            ) : (
              /* Fallback SVG Shield Icon */
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            )}
          </div>

          {/* Badge Label */}
          <h3 className="text-sm font-semibold text-[#5a5a5a] tracking-tight">
            {b.title || b}
          </h3>

        </div>
      </Reveal>
    ))}
  </div>
</section>

    </div>
  )
}