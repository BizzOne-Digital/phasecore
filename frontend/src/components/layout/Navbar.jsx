import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

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
