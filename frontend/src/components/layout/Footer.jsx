import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <div className="container">
          <h2>Reliable Procurement. Practical Solutions.</h2>
          <p>Partner with PhaseCore Consulting LLC for technology equipment, office supplies, facility solutions, and professional services.</p>
          <Link to="/request-a-quote" className="btn btn-primary">Request a Quote →</Link>
        </div>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo1.png" alt="PhaseCore Consulting LLC" className="logo-img" />
            </div>
            <p>Reliable Procurement. Practical Solutions. — Technology equipment, office supplies, facility solutions, and professional services for government and commercial organizations.</p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" aria-label="Twitter/X"><FiTwitter /></a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/capability-statement">Capability Statement</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Products & Solutions</h4>
            <ul>
              <li><Link to="/products#technology">Technology & Accessories</Link></li>
              <li><Link to="/products#supplies">Office & General Supplies</Link></li>
              <li><Link to="/products#facilities">Facilities & Janitorial</Link></li>
              <li><Link to="/products#landscaping">Landscaping & Grounds</Link></li>
              <li><Link to="/products#safety">Safety & PPE</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Professional Services</h4>
            <ul>
              <li><Link to="/services">IT & Digital Solutions</Link></li>
              <li><Link to="/services">Management & Professional Services</Link></li>
              <li><Link to="/services">Healthcare Technology</Link></li>
              <li><Link to="/services">Workforce & Training</Link></li>
              <li><Link to="/services">Cybersecurity & Compliance</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Government</h4>
            <ul>
              <li><Link to="/government-solutions">Government Contracting</Link></li>
              <li><Link to="/request-a-quote">Request a Quote</Link></li>
              <li><Link to="/industries">Industries We Serve</Link></li>
              <li><Link to="/partnerships">Teaming & Partnerships</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li><FiMail /><a href="mailto:contracts@phasecoreconsulting.com">contracts@phasecoreconsulting.com</a></li>
              <li><FiMail /><a href="mailto:admin@phasecoreconsulting.com">admin@phasecoreconsulting.com</a></li>
              <li><FiPhone /><a href="tel:7738659937">(773) 865-9937</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} PhaseCore Consulting LLC. All rights reserved.</span>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/request-a-quote">Request a Quote</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
