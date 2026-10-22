import { Link } from 'react-router-dom';
import { FiMonitor, FiPackage, FiTool, FiShield, FiArrowRight } from 'react-icons/fi';
import './CapabilityAreas.css';

const AREAS = [
  {
    icon: <FiMonitor size={28} />,
    title: 'Technology Products',
    desc: 'Computers, monitors, tablets, peripherals, printers and related IT equipment.',
    link: '/products#technology',
  },
  {
    icon: <FiPackage size={28} />,
    title: 'Office & General Supplies',
    desc: 'Copy paper, envelopes, stationery, office essentials and institutional supplies.',
    link: '/products#supplies',
  },
  {
    icon: <FiTool size={28} />,
    title: 'Facility Solutions',
    desc: 'Janitorial and custodial products, facility supplies, landscaping and grounds support.',
    link: '/products#facilities',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Technology & Risk Advisory',
    desc: 'Cybersecurity, GRC, IT controls, vulnerability assessment and business consulting.',
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
