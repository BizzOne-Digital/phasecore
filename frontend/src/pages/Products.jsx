import { Link } from 'react-router-dom';
import { FiArrowRight, FiMonitor, FiPackage, FiTool, FiShield } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import './About.css';

const CATEGORIES = [
  {
    id: 'technology',
    icon: <FiMonitor size={32} />,
    title: 'Technology & Computer Accessories',
    desc: 'Computer equipment, peripherals, and networking accessories for government and commercial buyers.',
    items: [
      'Computers & Laptops', 'Monitors & Displays', 'Docking Stations',
      'Keyboards & Mice', 'Headsets & Webcams', 'Cables & Adapters',
      'Storage Products', 'Networking Equipment', 'UPS & Power Products',
      'Printers & Peripherals', 'Audio/Video Equipment',
    ],
  },
  {
    id: 'supplies',
    icon: <FiPackage size={32} />,
    title: 'Office & General Supplies',
    desc: 'Workplace and institutional supplies to keep agencies and organizations running.',
    items: [
      'Office Supplies', 'Paper Products', 'Workplace Equipment',
      'General Institutional Supplies', 'Commercial Products',
    ],
  },
  {
    id: 'facilities',
    icon: <FiTool size={32} />,
    title: 'Facilities & Janitorial Supplies',
    desc: 'Facility operations and maintenance consumables, delivered directly or through qualified partners.',
    items: [
      'Janitorial Consumables', 'Cleaning Products', 'Trash Liners',
      'Paper & Tissue Products', 'Grounds & Facility Supplies',
    ],
  },
  {
    id: 'safety',
    icon: <FiShield size={32} />,
    title: 'Safety & PPE',
    desc: 'Safety and personal protective equipment for workplace and institutional compliance.',
    items: [
      'PPE', 'Safety Products', 'Workplace Safety Equipment', 'Signage & Compliance Supplies',
    ],
  },
];

export default function Products() {
  return (
    <>
      <PageHero
        label="Products"
        title="Technology, Supplies & Operational Products"
        subtitle="PhaseCore Consulting LLC sources technology products, workplace supplies, and facilities/operational products for government and commercial buyers — competitively priced and delivery-ready."
      />

      {CATEGORIES.map((cat, i) => (
        <section key={cat.id} id={cat.id} className={`section ${i % 2 === 1 ? 'about-values' : ''}`} style={{ scrollMarginTop: 100 }}>
          <div className="container about-approach">
            <div className="approach-content">
              <div className="cat-icon">{cat.icon}</div>
              <h2 className="section-title">{cat.title}</h2>
              <div className="gold-line" />
              <p>{cat.desc}</p>
              <div style={{ marginTop: 24 }}>
                <Link to="/contact" className="btn btn-primary">Request a Quote <FiArrowRight /></Link>
              </div>
            </div>

            <div className="serve-grid" style={{ justifyContent: 'flex-start' }}>
              {cat.items.map((item) => (
                <div key={item} className="serve-pill" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', color: 'var(--navy)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section about-serve">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light">Need a Product Quote?</h2>
          <div className="gold-line center" />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
            Tell us what you need and we'll put together a competitive, compliant quote for your agency or organization.
          </p>
          <Link to="/contact" className="btn btn-primary">Request a Quote <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
