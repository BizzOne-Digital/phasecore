import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import './About.css';

const PROFILE = [
  { label: 'Legal Name', value: 'PhaseCore Consulting LLC' },
  { label: 'Business Location', value: 'Celina, Texas' },
  { label: 'UEI', value: 'HHQRP9NBRSE5' },
  { label: 'SAM.gov', value: 'Registered' },
  { label: 'Business Type', value: 'Small business — subject to applicable size standards' },
  { label: 'Core NAICS', value: '423430, 424120, 423850, 541611' },
  { label: 'Other NAICS', value: 'Additional supply, IT, facility, and landscaping codes available upon request' },
  { label: 'Contact', value: 'contracts@phasecoreconsulting.com' },
];

const CORE_AREAS = [
  'IT Equipment & Technology Supplies',
  'Office & General Supplies',
  'Janitorial & Facility Solutions',
  'Landscaping & Grounds Maintenance',
  'Cybersecurity, GRC & IT Consulting',
];

export default function CapabilityStatement() {
  return (
    <>
      <PageHero
        label="Capability Statement"
        title="PhaseCore Consulting LLC — Capability Statement"
        subtitle="A procurement-friendly overview of our core areas, company profile, and contracting information for government buyers."
      />

      <section className="section">
        <div className="container about-approach">
          <div className="approach-content">
            <span className="section-label">Core Capability Areas</span>
            <h2 className="section-title">What We Deliver</h2>
            <div className="gold-line" />
            <p>
              PhaseCore Consulting LLC supports federal, state, and local government agencies with
              technology products, office supplies, facility solutions, and specialized professional
              services — in order of our primary contracting focus.
            </p>
          </div>

          <div className="serve-grid" style={{ justifyContent: 'flex-start' }}>
            {CORE_AREAS.map((a, i) => (
              <div key={a} className="serve-pill" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--navy)' }}>
                {i + 1}. {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm about-mv">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Company Profile</span>
            <h2 className="section-title">Contracting Information</h2>
            <div className="gold-line center" />
          </div>
          <div className="mv-grid" style={{ marginTop: 32 }}>
            {PROFILE.map((p) => (
              <div key={p.label} className="mv-card">
                <div className="mv-label">{p.label}</div>
                <p>{p.value}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 13 }}>
            A downloadable one-page PDF capability statement is being prepared — contact us to request a copy in the meantime.
          </p>
        </div>
      </section>

      <section className="section about-serve">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light">Ready to Request a Quote?</h2>
          <div className="gold-line center" />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
            Share your specifications, quantities, and delivery requirements and we'll prepare a quote.
          </p>
          <Link to="/request-a-quote" className="btn btn-primary">Request a Quote <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
