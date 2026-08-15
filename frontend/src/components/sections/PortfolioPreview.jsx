import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import api from '../../utils/api';
import './PortfolioPreview.css';

export default function PortfolioPreview() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/portfolio?limit=3')
      .then(r => setItems(r.data.items?.slice(0, 3) || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const FALLBACK = [
    { _id: '1', title: 'Security Program Transformation', category: 'cybersecurity', description: 'Built and matured cybersecurity programs aligned to NIST and CMMC requirements.', image: { url: '' } },
    { _id: '2', title: 'Cloud Modernization Program', category: 'it-technology', description: 'Migrated legacy systems to secure cloud platforms, improving performance and scalability.', image: { url: '' } },
    { _id: '3', title: 'IT Governance Optimization', category: 'business-consulting', description: 'Implemented governance and process improvements that increased transparency and operational efficiency.', image: { url: '' } },
  ];

  const CATEGORY_LABELS = {
    cybersecurity: 'Cybersecurity',
    'it-technology': 'IT & Technology',
    'project-management': 'Project Management',
    'business-consulting': 'Business Consulting',
  };

  const display = items.length > 0 ? items : FALLBACK;

  return (
    <section className="section portfolio-preview">
      <div className="container">
        <div className="pp-header">
          <div>
            <span className="section-label">Portfolio & Capabilities</span>
            <h2 className="section-title">A Snapshot of the Impact We Deliver</h2>
            <div className="gold-line" />
          </div>
          <Link to="/portfolio" className="btn btn-outline-dark">
            View All Work <FiArrowRight />
          </Link>
        </div>

        <div className="pp-grid">
          {display.map((item) => (
            <div key={item._id} className="pp-card">
              <div className="pp-image">
                {item.image?.url
                  ? <img src={item.image.url} alt={item.title} loading="lazy" />
                  : <div className="pp-placeholder"><span>{item.title[0]}</span></div>
                }
                <div className="pp-category">{CATEGORY_LABELS[item.category] || item.category}</div>
              </div>
              <div className="pp-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to="/portfolio" className="pp-link">
                  View Case Study <FiExternalLink size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
