import { Link } from 'react-router-dom';
import { FiShield, FiCpu, FiBriefcase, FiHeart, FiUsers, FiTool, FiArrowRight } from 'react-icons/fi';
import './ServicesSection.css';

const SERVICES = [
  {
    icon: <FiShield size={28} />,
    title: 'Cybersecurity, Risk & Compliance',
    desc: 'Security, governance, and compliance services aligned to regulatory and contractual requirements.',
    features: ['Risk Assessments', 'GRC Programs', 'NIST & CMMC Support', 'Audit Readiness'],
    link: '/services',
  },
  {
    icon: <FiCpu size={28} />,
    title: 'IT & Digital Solutions',
    desc: 'Technology services supporting infrastructure, systems, data, and digital operations.',
    features: ['Cloud & Infrastructure', 'IT Modernization', 'Data & Analytics', 'Technical Support'],
    link: '/services',
  },
  {
    icon: <FiBriefcase size={28} />,
    title: 'Management & Professional Services',
    desc: 'Program, project, and organizational support focused on execution and performance improvement.',
    features: ['Program & Project Management', 'Governance Support', 'Risk Management', 'Quality Assurance'],
    link: '/services',
  },
  {
    icon: <FiHeart size={28} />,
    title: 'Healthcare Technology & Compliance',
    desc: 'IT and cybersecurity support for healthcare environments and regulatory compliance.',
    features: ['Healthcare IT Consulting', 'HIPAA Security Support', 'Risk Assessments', 'Audit Readiness'],
    link: '/services',
  },
  {
    icon: <FiUsers size={28} />,
    title: 'Workforce, Training & Administrative Support',
    desc: 'Staffing, training, documentation, and administrative support services.',
    features: ['Staff Augmentation', 'Technical Training', 'Administrative Support', 'Documentation'],
    link: '/services',
  },
  {
    icon: <FiTool size={28} />,
    title: 'Facilities & Operational Services',
    desc: 'Facility operations, maintenance coordination, and support services delivered directly or through partners.',
    features: ['Facilities Management', 'Custodial Services', 'Grounds Maintenance', 'Vendor Coordination'],
    link: '/services',
  },
];

export default function ServicesSection() {
  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Our Core Capabilities</span>
          <h2 className="section-title">Solutions Designed Around Your Mission</h2>
          <div className="gold-line center" />
          <p className="section-desc">
            PhaseCore provides integrated professional and operational services that can be delivered
            independently or combined to support larger programs and initiatives.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-features">
                {s.features.map((f) => (
                  <li key={f}><span className="check">✓</span>{f}</li>
                ))}
              </ul>
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
