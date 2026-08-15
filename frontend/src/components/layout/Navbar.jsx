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

const SOLUTIONS_LINKS = [
  { to: '/government-solutions', label: 'Government Solutions' },
  { to: '/industries', label: 'Industries We Serve' },
  { to: '/partnerships', label: 'Teaming & Partnerships' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setSolutionsOpen(false); }, [location]);

  const solutionsActive = SOLUTIONS_LINKS.some(l => l.to === location.pathname);

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

          <li className={`nav-dropdown ${solutionsOpen ? 'open' : ''}`}>
            <button
              type="button"
              className={`nav-dropdown-toggle ${solutionsActive ? 'active' : ''}`}
              onClick={() => setSolutionsOpen(v => !v)}
            >
              Solutions <FiChevronDown size={14} />
            </button>
            <ul className="nav-dropdown-menu">
              {SOLUTIONS_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={({ isActive }) => isActive ? 'active' : ''}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

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
