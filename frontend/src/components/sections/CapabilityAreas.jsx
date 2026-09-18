import { Link } from 'react-router-dom';
import { FiMonitor, FiPackage, FiTool, FiShield, FiArrowRight } from 'react-icons/fi';
import './CapabilityAreas.css';

const AREAS = [
  {
    icon: <FiMonitor size={28} />,
    title: 'Technology Products & Accessories',
    desc: 'Computers, monitors, docking stations, keyboards, mice, headsets, webcams, cables, adapters, storage, UPS units, networking accessories, and printers/peripherals.',
    link: '/products#technology',
  },
  {
    icon: <FiPackage size={28} />,
    title: 'Government & Institutional Supplies',
    desc: 'Office supplies, paper, PPE, safety products, workplace supplies, and general commercial products for agencies and institutions.',
    link: '/products#supplies',
  },
  {
    icon: <FiTool size={28} />,
    title: 'Facilities & Operational Supplies',
    desc: 'Janitorial consumables, paper products, cleaning supplies, trash liners, facility consumables, and grounds/maintenance supplies.',
    link: '/products#facilities',
  },
  {
    icon: <FiShield size={28} />,
    title: 'IT, Cybersecurity & Professional Services',
    desc: 'IT consulting, GRC, cybersecurity, cloud, project management, risk/compliance, and technical training.',
    link: '/services',
  },
];

export default function CapabilityAreas() {
  return (
    <section className="section capability-areas">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">What We Provide</span>
          <h2 className="section-title">Four Ways We Support Your Mission</h2>
          <div className="gold-line center" />
          <p className="section-desc">
            PhaseCore Consulting LLC provides technology products, IT solutions, business supplies,
            and operational support to government and commercial organizations.
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
