import './PageHero.css';

export default function PageHero({ label, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg" />
      <div className="container page-hero-content">
        {label && <span className="section-label">{label}</span>}
        <h1 className="page-hero-title">{title}</h1>
        <div className="gold-line" />
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  );
}
