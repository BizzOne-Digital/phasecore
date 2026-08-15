import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import './About.css';

const CAPABILITIES = [
  'Cybersecurity & Information Assurance',
  'IT Services & Support',
  'Program & Project Management',
  'Management Consulting',
  'Risk & Compliance',
  'Healthcare Technology',
  'Data & Analytics',
  'Administrative Support',
  'Workforce Solutions',
  'Training Services',
  'Facilities & Maintenance Services',
];

const CONTRACT_INFO = [
  { label: 'Legal Name', value: 'PhaseCore Consulting LLC' },
  { label: 'Business Type', value: 'LLC' },
  { label: 'SAM.gov', value: 'Registered / Active' },
  { label: 'UEI', value: 'HHQRP9NBRSE5' },
  { label: 'CAGE Code', value: '22Z91' },
  { label: 'Service Area', value: 'United States' },
];

export default function GovernmentSolutions() {
  return (
    <>
      <PageHero
        label="Government Solutions"
        title="Supporting Government Missions"
        subtitle="PhaseCore supports federal, state, and local agencies with integrated cybersecurity, IT, professional, workforce, and operational services."
      />

      <section className="section">
        <div className="container about-approach">
          <div className="approach-content">
            <span className="section-label">Mission-Ready Delivery</span>
            <h2 className="section-title">Built for Government Requirements</h2>
            <div className="gold-line" />
            <p>
              Government delivery requires compliance, accountability, documentation, and consistent
              execution. PhaseCore structures every engagement around these requirements from day one —
              so agencies get dependable delivery, not just recommendations.
            </p>
          </div>
        </div>
      </section>

      <section className="section-sm about-values">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">What We Deliver</span>
            <h2 className="section-title">Core Capabilities</h2>
            <div className="gold-line center" />
          </div>
          <div className="serve-grid" style={{ marginTop: 32 }}>
            {CAPABILITIES.map((c) => (
              <div key={c} className="serve-pill" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--navy)' }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm about-mv">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Contracting Information</span>
            <h2 className="section-title">Ready to Engage</h2>
            <div className="gold-line center" />
          </div>
          <div className="mv-grid" style={{ marginTop: 32 }}>
            {CONTRACT_INFO.map((c) => (
              <div key={c.label} className="mv-card">
                <div className="mv-label">{c.label}</div>
                <p>{c.value}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 13 }}>
            NAICS codes available upon request.
          </p>
        </div>
      </section>

      <section className="section about-serve">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light">Ready to Discuss a Requirement?</h2>
          <div className="gold-line center" />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
            Reach out to discuss contracting, subcontracting, or teaming opportunities.
          </p>
          <Link to="/contact" className="btn btn-primary">Contact PhaseCore <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
