import { useEffect, useRef, useState } from 'react';
import { LockKeyhole, LogIn, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api.js';
import contactBanner from '../../assets/image/contactBanner.jpg';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ENABLED = String(import.meta.env.VITE_RECAPTCHA_ENABLED).toLowerCase() === 'true';

function RecaptchaCheckbox({ onChange }) {
  const elementRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [loadError, setLoadError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      setLoadError('reCAPTCHA is not configured for this site.');
      return undefined;
    }

    const renderWidget = () => {
      if (!window.grecaptcha || !elementRef.current || widgetIdRef.current !== null) return;
      widgetIdRef.current = window.grecaptcha.render(elementRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: onChange,
        'expired-callback': () => onChange(''),
        'error-callback': () => onChange(''),
      });
      setIsLoaded(true);
    };

    const existingScript = document.getElementById('google-recaptcha-api');
    if (existingScript) {
      if (window.grecaptcha) renderWidget();
      else existingScript.addEventListener('load', renderWidget, { once: true });
      return () => existingScript.removeEventListener('load', renderWidget);
    }

    const script = document.createElement('script');
    script.id = 'google-recaptcha-api';
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    script.onerror = () => setLoadError('Unable to load reCAPTCHA. Check your internet connection and try again.');
    document.head.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [onChange]);

  if (loadError) return <p role="alert" className="text-sm text-red-700">{loadError}</p>;

  return (
    <div>
      {!isLoaded && <p className="mb-2 text-sm text-gray-500">Loading security check...</p>}
      <div ref={elementRef} />
    </div>
  );
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const redirectTo = location.state?.from?.pathname || '/admin';

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      setError('Please confirm that you are not a robot.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await api.post('/admin/login', {
        email,
        password,
        ...(RECAPTCHA_ENABLED ? { recaptcha_token: recaptchaToken } : {}),
      });
      localStorage.setItem('admin_token', result.token);
      localStorage.setItem('admin_user', JSON.stringify(result.user));
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${contactBanner})` }}
    >
      <div className="absolute inset-0 bg-blue-950/35" aria-hidden="true" />
      <section className="relative w-full max-w-md rounded-2xl bg-white/55 p-8 shadow-2xl backdrop-blur-[2px] sm:p-10">
        <div className="mb-8 text-center">
          <img
            src="/Cata_logo.jpg"
            alt="CATA Foundation"
            className="mx-auto mb-4 h-20 w-20 rounded-xl object-contain shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-900">CATA Admin</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to manage site content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Email address</span>
            <span className="relative block">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Password</span>
            <span className="relative block">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </span>
          </label>

          {RECAPTCHA_ENABLED && <RecaptchaCheckbox onChange={setRecaptchaToken} />}

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={19} />
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
}
