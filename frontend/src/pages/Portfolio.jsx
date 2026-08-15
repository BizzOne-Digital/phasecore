import { useState, useEffect } from 'react';
import PageHero from '../components/ui/PageHero';
import api from '../utils/api';
import './Portfolio.css';

const CATEGORIES = [
  { value: 'all', label: 'All Work' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'it-technology', label: 'IT & Technology' },
  { value: 'project-management', label: 'Project Management' },
  { value: 'business-consulting', label: 'Business Consulting' },
];

const CATEGORY_LABELS = {
  cybersecurity: 'Cybersecurity',
  'it-technology': 'IT & Technology',
  'project-management': 'Project Management',
  'business-consulting': 'Business Consulting',
};

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/portfolio')
      .then(r => setItems(r.data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <>
      <PageHero
        label="Portfolio & Capabilities"
        title="Delivering Results Across Sectors"
        subtitle="A snapshot of the impact PhaseCore delivers for government agencies, prime contractors, and commercial organizations."
      />

      <section className="section portfolio-page">
        <div className="container">
          {/* Filters */}
          <div className="portfolio-filters">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                className={`filter-btn ${filter === c.value ? 'active' : ''}`}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="portfolio-loading">
              <div className="loader" />
              <p>Loading portfolio...</p>
            </div>
          ) : (
            <div className="portfolio-grid">
              {filtered.map(item => (
                <div key={item._id} className="portfolio-card">
                  <div className="pc-image">
                    {item.image?.url
                      ? <img src={item.image.url} alt={item.title} loading="lazy" />
                      : <div className="pc-placeholder"><span>{item.title[0]}</span></div>
                    }
                    <div className="pc-tag">{CATEGORY_LABELS[item.category] || item.category}</div>
                    {item.isFeatured && <div className="pc-featured">Featured</div>}
                  </div>
                  <div className="pc-body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.outcome && (
                      <div className="pc-outcome">
                        <span className="outcome-label">Outcome</span>
                        <p>{item.outcome}</p>
                      </div>
                    )}
                    {item.tags?.length > 0 && (
                      <div className="pc-tags">
                        {item.tags.map(t => <span key={t} className="pc-tag-sm">{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="portfolio-empty">
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
