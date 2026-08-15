import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiCpu, FiClipboard, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import api from '../utils/api';
import './Services.css';

const ICONS = {
  shield: <FiShield size={32} />,
  cpu: <FiCpu size={32} />,
  clipboard: <FiClipboard size={32} />,
  briefcase: <FiBriefcase size={32} />,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then(r => setServices(r.data.services || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        label="What We Do"
        title="Solutions Designed Around Your Mission"
        subtitle="PhaseCore provides integrated professional and operational services that can be delivered independently or combined to support larger programs and initiatives."
      />

      <section className="section services-page">
        <div className="container">
          {loading ? (
            <div className="services-loading">
              <div className="loader" />
              <p>Loading services...</p>
            </div>
          ) : (
            services.map((s, i) => (
              <div key={s._id || s.slug} className={`service-block ${i % 2 === 1 ? 'reversed' : ''}`}>
                <div className="sb-header">
                  <div className="sb-icon">{ICONS[s.icon] || ICONS.shield}</div>
                  <div>
                    <h2 className="sb-title">{s.title}</h2>
                    <div className="gold-line" style={{ margin: '12px 0 0' }} />
                  </div>
                </div>
                <div className="sb-body">
                  <p className="sb-desc">{s.fullDescription || s.shortDescription}</p>
                  {s.features?.length > 0 && (
                    <div className="sb-features">
                      {s.features.map((f) => (
                        <div key={f} className="sb-feature">
                          <span className="sb-dot" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                  {s.frameworks?.length > 0 && (
                    <div className="sb-frameworks">
                      <span className="fw-label">Frameworks & Standards:</span>
                      <div className="fw-tags">
                        {s.frameworks.map((f) => (
                          <span key={f} className="fw-tag">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {!loading && services.length === 0 && (
            <div className="services-loading">
              <p>No services found.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm services-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light">Ready to Discuss Your Requirements?</h2>
          <div className="gold-line center" />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
            Contact us to discuss how PhaseCore can support your specific mission needs and organizational objectives.
          </p>
          <Link to="/contact" className="btn btn-primary">Get in Touch <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
