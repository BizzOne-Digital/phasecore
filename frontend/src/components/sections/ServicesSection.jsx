import { Link } from 'react-router-dom';
import { FiShield, FiCpu, FiBriefcase, FiHeart, FiUsers, FiTool, FiArrowRight } from 'react-icons/fi';
import './ServicesSection.css';

const SERVICES = [
  {
    icon: <FiCpu size={28} />,
    title: 'IT & Digital Solutions',
    desc: 'Supporting infrastructure, systems, data, and digital operations.',
    link: '/services',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Cybersecurity, Risk & Compliance',
    desc: 'Governance and compliance services aligned to regulatory and contractual requirements.',
    link: '/services',
  },
  {
    icon: <FiBriefcase size={28} />,
    title: 'Management & Professional Services',
    desc: 'Program and project support focused on execution and performance.',
    link: '/services',
  },
  {
    icon: <FiHeart size={28} />,
    title: 'Healthcare Technology & Compliance',
    desc: 'IT support for healthcare environments and regulatory needs.',
    link: '/services',
  },
  {
    icon: <FiUsers size={28} />,
    title: 'Workforce & Administrative Support',
    desc: 'Staffing, training, and administrative support services.',
    link: '/services',
  },
  {
    icon: <FiTool size={28} />,
    title: 'Facilities & Operational Services',
    desc: 'Operations and maintenance support delivered directly or through partners.',
    link: '/services',
  },
];

export default function ServicesSection() {
  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Backed By Experienced Teams</span>
          <h2 className="section-title">Professional Services That Support Every Order</h2>
          <div className="gold-line center" />
          <p className="section-desc">
            Beyond products and supplies, PhaseCore's IT, cybersecurity, and compliance teams are
            available to support implementation, risk management, and ongoing program needs.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card service-card-compact">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to={s.link} className="service-link">
                Learn More <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/services" className="btn btn-primary">View All Services <FiArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}
