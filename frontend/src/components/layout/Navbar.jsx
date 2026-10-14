import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

// Order follows the agreed nav structure:
// Home | Products | Services | Government Solutions | About | Capabilities | Contact
const NAV_ITEMS = [
  { type: 'link', to: '/', label: 'Home' },
  {
    type: 'dropdown',
    key: 'products',
    label: 'Products',
    links: [
      { to: '/products#technology', label: 'Technology & Computer Accessories' },
      { to: '/products#supplies', label: 'Office & General Supplies' },
      { to: '/products#facilities', label: 'Facilities & Janitorial Supplies' },
      { to: '/products#safety', label: 'Safety & PPE' },
    ],
  },
  {
    type: 'dropdown',
    key: 'services',
    label: 'Services',
    to: '/services',
    links: [
      { to: '/services', label: 'IT & Cybersecurity' },
      { to: '/services', label: 'GRC & Compliance' },
      { to: '/services', label: 'Project Management' },
      { to: '/services', label: 'Technology Consulting' },
    ],
  },
  { type: 'link', to: '/government-solutions', label: 'Government Solutions' },
  { type: 'link', to: '/about', label: 'About Us' },
  { type: 'link', to: '/#capabilities', label: 'Capabilities' },
  { type: 'link', to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setOpenDropdown(null); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src="/logo1.png" alt="PhaseCore Consulting LLC" className="logo-img" />
        </Link>

        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => {
            if (item.type === 'link') {
              return (
                <li key={item.to}>
                  <NavLink to={item.to} className={({ isActive }) => isActive ? 'active' : ''} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              );
            }

            const isActive = item.to
              ? location.pathname === item.to
              : item.links.some(l => l.to.split('#')[0] === location.pathname);

            return (
              <li key={item.key} className={`nav-dropdown ${openDropdown === item.key ? 'open' : ''}`}>
                <button
                  type="button"
                  className={`nav-dropdown-toggle ${isActive ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(v => v === item.key ? null : item.key)}
                >
                  {item.label} <FiChevronDown size={14} />
                </button>
                <ul className="nav-dropdown-menu">
                  {item.links.map(({ to, label }, i) => (
                    <li key={`${to}-${i}`}>
                      <NavLink to={to} className={({ isActive: a }) => a ? 'active' : ''}>
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}

          <li className="nav-cta">
            <Link to="/contact" className="btn btn-primary">Contact Us →</Link>
          </li>
        </ul>

        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>
    </nav>
  );
}
