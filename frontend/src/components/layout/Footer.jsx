import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <div className="container">
          <h2>Let's Solve Your Mission Challenges—Together.</h2>
          <p>Partner with PhaseCore Consulting LLC for solutions that are secure, innovative, and built for performance.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us Today →</Link>
        </div>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo1.png" alt="PhaseCore Consulting LLC" className="logo-img" />
            </div>
            <p>Technology. Security. Operations. Delivered. — Integrated solutions for government and commercial organizations.</p>
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
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Cybersecurity & Compliance</Link></li>
              <li><Link to="/services">IT & Digital Solutions</Link></li>
              <li><Link to="/services">Management & Professional Services</Link></li>
              <li><Link to="/services">Healthcare Technology</Link></li>
              <li><Link to="/services">Workforce & Training</Link></li>
              <li><Link to="/services">Facilities & Operations</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/government-solutions">Government Solutions</Link></li>
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
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
