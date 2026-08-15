import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import './About.css';

const INDUSTRIES = [
  'Federal Government',
  'State & Local Government',
  'Financial Services',
  'Healthcare',
  'Insurance',
  'Technology',
  'Education',
  'Commercial Services',
];

export default function Industries() {
  return (
    <>
      <PageHero
        label="Industries"
        title="Industries We Serve"
        subtitle="PhaseCore delivers cybersecurity, IT, and professional services across a broad range of government and commercial sectors."
      />

      <section className="section about-values">
        <div className="container">
          <div className="values-grid">
            {INDUSTRIES.map((ind) => (
              <div key={ind} className="value-card" style={{ textAlign: 'center' }}>
                <h3>{ind}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-serve">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light">Don't See Your Industry?</h2>
          <div className="gold-line center" />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
            PhaseCore's integrated service model adapts to organizations of every type. Reach out to discuss your requirements.
          </p>
          <Link to="/contact" className="btn btn-primary">Contact PhaseCore <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
