import { Link } from 'react-router-dom';
import { FiMonitor, FiPackage, FiTool, FiShield, FiArrowRight } from 'react-icons/fi';
import './CapabilityAreas.css';

const AREAS = [
  {
    icon: <FiMonitor size={28} />,
    title: 'IT Equipment & Accessories',
    desc: 'Laptops, desktops, tablets, monitors, printers, computer accessories, networking equipment, and related technology products.',
    link: '/products#technology',
  },
  {
    icon: <FiPackage size={28} />,
    title: 'Office & General Supplies',
    desc: 'Copy paper, envelopes, stationery, printing consumables, office equipment, and institutional supplies.',
    link: '/products#supplies',
  },
  {
    icon: <FiTool size={28} />,
    title: 'Facilities & Grounds',
    desc: 'Janitorial and custodial supplies, cleaning and sanitation materials, landscaping, and groundskeeping support.',
    link: '/products#facilities',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Cybersecurity & Consulting',
    desc: 'Risk assessments, IT controls, compliance, governance, vulnerability management, and technical advisory.',
    link: '/services',
  },
];

export default function CapabilityAreas() {
  return (
    <section id="capabilities" className="section capability-areas" style={{ scrollMarginTop: 100 }}>
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Core Capabilities</span>
          <h2 className="section-title">What We Supply & Support</h2>
          <div className="gold-line center" />
          <p className="section-desc">
            Supporting federal, state, and local government agencies with technology products,
            office supplies, facility solutions, and specialized professional services.
          </p>
        </div>

        <div className="capability-grid">
          {AREAS.map((a) => (
            <Link key={a.title} to={a.link} className="capability-card">
              <div className="capability-icon">{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <span className="capability-link">Learn More <FiArrowRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
