import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiImage, FiList, FiHelpCircle, FiClock } from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import api from '../../utils/api';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ contacts: 0, portfolio: 0, services: 0, faqs: 0 });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/contact?limit=5'),
      api.get('/portfolio/admin'),
      api.get('/services/admin'),
      api.get('/faqs/admin'),
    ]).then(([c, p, s, f]) => {
      setStats({
        contacts: c.data.total || 0,
        portfolio: p.data.count || 0,
        services: s.data.services?.length || 0,
        faqs: f.data.faqs?.length || 0,
      });
      setRecentContacts(c.data.contacts?.slice(0, 5) || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const STAT_CARDS = [
    { label: 'Total Inquiries', value: stats.contacts, icon: <FiMail />, to: '/admin/contacts', color: '#3b82f6' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: <FiImage />, to: '/admin/portfolio', color: '#8b5cf6' },
    { label: 'Services', value: stats.services, icon: <FiList />, to: '/admin/services', color: '#10b981' },
    { label: 'FAQs', value: stats.faqs, icon: <FiHelpCircle />, to: '/admin/faqs', color: '#f59e0b' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Dashboard</div>
          <div className="admin-page-sub">Welcome back — here's an overview of your website.</div>
        </div>
      </div>

      <div className="dash-stats">
        {STAT_CARDS.map(s => (
          <Link to={s.to} key={s.label} className="dash-stat-card">
            <div className="dsc-icon" style={{ background: s.color + '18', color: s.color }}>{s.icon}</div>
            <div className="dsc-value">{loading ? '—' : s.value}</div>
            <div className="dsc-label">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Recent Inquiries</span>
          <Link to="/admin/contacts" className="btn btn-outline-dark" style={{ padding: '8px 16px', fontSize: 13 }}>
            View All
          </Link>
        </div>
        <div style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: '#9ca3af' }}>Loading...</td></tr>
              ) : recentContacts.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 32, color: '#9ca3af' }}>No inquiries yet.</td></tr>
              ) : recentContacts.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{c.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{c.service || '—'}</td>
                  <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                  <td style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiClock size={12} /> {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
