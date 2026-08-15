import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiCpu, FiHeart, FiUsers } from 'react-icons/fi';
import './Hero.css';

const PILLARS = [
  { icon: <FiShield />, label: 'Cybersecurity & Compliance' },
  { icon: <FiCpu />, label: 'IT & Digital Solutions' },
  { icon: <FiHeart />, label: 'Healthcare Technology' },
  { icon: <FiUsers />, label: 'Workforce & Operations' },
];

const CLIENTS = [
  'Federal Agencies',
  'State & Local Gov',
  'Prime Contractors',
  'Commercial Orgs',
  'Healthcare',
];

export default function Hero() {
  return (
    <section className="hero">
      {/* Background layers */}
      <div className="hero-bg">
        <img src="/hero.png" alt="" className="hero-bg-img hero-bg-img-desktop" />
        <img src="/mobile-hero.png" alt="" className="hero-bg-img hero-bg-img-mobile" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Trusted Government & Commercial Partner
        </div>

        <h1 className="hero-headline">
          <span className="line-1">Technology.</span>
          <span className="line-2">Security. Operations.</span>
          <span className="line-3 gold">Delivered.</span>
        </h1>

        <div className="gold-line" />

        <p className="hero-sub">
          PhaseCore Consulting LLC delivers cybersecurity, IT, management consulting, healthcare
          technology, workforce solutions, and operational support to help organizations reduce
          risk, improve performance, and modernize operations.
        </p>

        <div className="hero-actions">
          <Link to="/services" className="btn btn-primary">
            Explore Our Capabilities <FiArrowRight />
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Partner With PhaseCore <FiArrowRight />
          </Link>
        </div>

        {/* Capability pills */}
        <div className="hero-pillars">
          {PILLARS.map((p) => (
            <div key={p.label} className="hero-pill">
              {p.icon}
              <span>{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="hero-trust">
        <div className="container trust-inner">
          <span className="trust-label">Trusted by</span>
          {CLIENTS.map((c) => (
            <span key={c} className="trust-item">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
