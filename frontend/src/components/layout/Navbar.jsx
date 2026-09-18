import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const DROPDOWNS = [
  {
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
    key: 'solutions',
    label: 'Solutions',
    links: [
      { to: '/government-solutions', label: 'Government Solutions' },
      { to: '/industries', label: 'Industries We Serve' },
      { to: '/partnerships', label: 'Teaming & Partnerships' },
    ],
  },
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
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''} end={to === '/'}>
                {label}
              </NavLink>
            </li>
          ))}

          {DROPDOWNS.map((d) => {
            const isActive = d.links.some(l => l.to.split('#')[0] === location.pathname);
            return (
              <li key={d.key} className={`nav-dropdown ${openDropdown === d.key ? 'open' : ''}`}>
                <button
                  type="button"
                  className={`nav-dropdown-toggle ${isActive ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(v => v === d.key ? null : d.key)}
                >
                  {d.label} <FiChevronDown size={14} />
                </button>
                <ul className="nav-dropdown-menu">
                  {d.links.map(({ to, label }) => (
                    <li key={to}>
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
