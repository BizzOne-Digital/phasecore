import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiMail, FiImage, FiList, FiHelpCircle, FiLogOut, FiExternalLink } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const NAV = [
  { to: '/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
  { to: '/admin/contacts', icon: <FiMail />, label: 'Contacts' },
  { to: '/admin/portfolio', icon: <FiImage />, label: 'Portfolio' },
  { to: '/admin/services', icon: <FiList />, label: 'Services' },
  { to: '/admin/faqs', icon: <FiHelpCircle />, label: 'FAQs' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark-sm">PC</div>
          <div>
            <div className="sidebar-brand">PhaseCore</div>
            <div className="sidebar-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="sidebar-link">
            <FiExternalLink />
            <span>View Website</span>
          </a>
          <div className="sidebar-admin">
            <div className="admin-avatar">{admin?.name?.[0] || 'A'}</div>
            <div className="admin-info">
              <div className="admin-name">{admin?.name}</div>
              <div className="admin-role">{admin?.role}</div>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            <FiLogOut />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
