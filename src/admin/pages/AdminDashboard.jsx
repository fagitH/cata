import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { TrendingUp, Users, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    news: 0,
    banners: 0,
    reports: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const newsData = await api.get('/news');
      const bannersData = await api.get('/banners');
      const reportsData = await api.get('/annual_reports');
      const contactsData = await api.get('/contact');

      setStats({
        news: newsData.length || 0,
        banners: bannersData.length || 0,
        reports: reportsData.length || 0,
        contacts: contactsData.length || 0,
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, link, color }) => (
    <Link
      to={link}
      className={`bg-gradient-to-br ${color} p-6 rounded-lg border border-slate-700 hover:shadow-lg transition-all cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-300 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon size={40} className="text-slate-300 opacity-50" />
      </div>
    </Link>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome to Admin Panel</h1>
        <p className="text-slate-400">
          Manage all content for your CATA Foundation website
        </p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={FileText}
            label="News Articles"
            value={stats.news}
            link="/admin/news"
            color="from-blue-900 to-blue-800"
          />
          <StatCard
            icon={TrendingUp}
            label="Banners"
            value={stats.banners}
            link="/admin/banners"
            color="from-purple-900 to-purple-800"
          />
          <StatCard
            icon={FileText}
            label="Annual Reports"
            value={stats.reports}
            link="/admin/report-items"
            color="from-red-900 to-red-800"
          />
          <StatCard
            icon={Users}
            label="Contact Submissions"
            value={stats.contacts}
            link="/admin/contacts"
            color="from-indigo-900 to-indigo-800"
          />
        </div>
      )}

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/news"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition-all"
          >
            ✏️ Write New Article
          </Link>
          <Link
            to="/admin/banners"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg font-semibold transition-all"
          >
            🖼️ Update Banner
          </Link>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">About This Admin Panel</h2>
        <p className="text-slate-300">
          Use this dashboard to manage all content displayed on the CATA Foundation website.
          You can create, edit, and delete banners, news articles, annual reports,
          and view contact form submissions.
        </p>
      </div>
    </div>
  );
}
