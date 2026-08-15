import { Link } from 'react-router-dom';
import { FiShield, FiCpu, FiClipboard, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import './ServicesSection.css';

const SERVICES = [
  {
    icon: <FiShield size={28} />,
    title: 'Cybersecurity, Risk & Compliance',
    desc: 'NIST, CMMC, SOC 2, GRC, vulnerability management, and security program development.',
    features: ['Cybersecurity Assessments', 'GRC Programs', 'Vulnerability Management', 'Audit Readiness'],
    link: '/services',
  },
  {
    icon: <FiCpu size={28} />,
    title: 'IT & Technology Services',
    desc: 'Cloud solutions, system modernization, web & digital services, and strategic IT consulting.',
    features: ['IT Consulting', 'Cloud & Infrastructure', 'Digital Transformation', 'Technical Support'],
    link: '/services',
  },
  {
    icon: <FiClipboard size={28} />,
    title: 'Project & Program Management',
    desc: 'Planning, scheduling, budgeting, risk management, and vendor coordination that drives results.',
    features: ['Project Planning', 'Program Coordination', 'Risk Management', 'Executive Reporting'],
    link: '/services',
  },
  {
    icon: <FiBriefcase size={28} />,
    title: 'Business & Management Consulting',
    desc: 'Process improvement, governance, strategic planning, and operational excellence.',
    features: ['Process Improvement', 'Policy Development', 'Performance Measurement', 'Strategic Planning'],
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
      </div>
    </section>
  );
}
