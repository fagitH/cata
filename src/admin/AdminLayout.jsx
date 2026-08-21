import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';
import cataLogo from '../assets/image/logo.png';
import { 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard,
  Image,
  Newspaper,
  FileText,
  Mail,
  Home,
  FolderArchive,
  UserCog,
  BriefcaseBusiness
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('admin_user') || 'null');
    } catch {
      return null;
    }
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/me').then((currentUser) => {
      localStorage.setItem('admin_user', JSON.stringify(currentUser));
      setUser(currentUser);
    }).catch(() => {
      // RequireAdminAuth handles an invalid session and redirects to login.
    });
  }, []);

  async function handleLogout() {
    try {
      await api.post('/admin/logout');
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      navigate('/admin/login', { replace: true });
    }
  }

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Banners', path: '/admin/banners', icon: Image },
    { label: 'News', path: '/admin/news', icon: Newspaper },
    { label: 'Annual Reports', path: '/admin/annual-reports', icon: FolderArchive },
    { label: 'Report Items', path: '/admin/report-items', icon: FileText },
    { label: 'Newsletter', path: '/admin/newsletter', icon: FileText },
    { label: 'Secretariat', path: '/admin/secretariat', icon: BriefcaseBusiness },
    { label: 'Management Level', path: '/admin/management', icon: BriefcaseBusiness },
    { label: 'Shariah Advisory', path: '/admin/shariah-advisory', icon: BriefcaseBusiness },
    { label: 'Contact Submissions', path: '/admin/contacts', icon: Mail },
    ...(user?.role === 'super_admin' ? [{ label: 'User Management', path: '/admin/users', icon: UserCog }] : []),
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-72' : 'w-24'
        } bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center">
              <img
                src={cataLogo}
                alt="CATA logo"
                className={`${sidebarOpen ? 'h-auto w-full max-w-[220px]' : 'h-10 w-10 object-cover object-left'} mix-blend-multiply transition-all`}
              />
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              title={sidebarOpen ? 'Collapse' : 'Expand'}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={22} className="flex-shrink-0" />
                <span className={`font-medium text-sm transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  {item.label}
                </span>
                {active && sidebarOpen && (
                  <div className="ml-auto w-1 h-6 bg-white rounded-full opacity-50"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
            title={!sidebarOpen ? 'Log out' : ''}
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className={`font-medium text-sm ${sidebarOpen ? 'block' : 'hidden'}`}>Log out</span>
          </button>
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            title={!sidebarOpen ? 'Back to Site' : ''}
          >
            <Home size={20} className="flex-shrink-0" />
            <span className={`font-medium text-sm ${sidebarOpen ? 'block' : 'hidden'}`}>Back to Site</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CATA Foundation</h2>
            <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          <div className="text-right">
            <div className="text-base font-bold text-gray-900">Admin</div>
            <div className="text-sm font-medium text-gray-900">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
