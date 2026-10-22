import { Link } from 'react-router-dom';
import { FiArrowRight, FiMonitor, FiPackage, FiTool, FiShield } from 'react-icons/fi';
import './Hero.css';

const PILLARS = [
  { icon: <FiMonitor />, label: 'Technology Products' },
  { icon: <FiPackage />, label: 'Office & General Supplies' },
  { icon: <FiTool />, label: 'Facility Solutions' },
  { icon: <FiShield />, label: 'Technology & Risk Advisory' },
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
          <span className="line-1">Practical Procurement.</span>
          <span className="line-3 gold">Reliable Business Solutions.</span>
        </h1>

        <div className="gold-line" />

        <p className="hero-sub">
          PhaseCore Consulting LLC supports government agencies, educational institutions, and
          commercial organizations with technology equipment, office and general supplies,
          facility products, and specialized professional services.
        </p>
        <p className="hero-sub">
          We focus on understanding purchasing requirements, sourcing specification-matched
          solutions, coordinating fulfillment, and providing responsive business support.
        </p>

        <div className="hero-actions">
          <Link to="/request-a-quote" className="btn btn-primary">
            Request a Quote <FiArrowRight />
          </Link>
          <Link to="/products" className="btn btn-outline">
            View Capabilities <FiArrowRight />
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
