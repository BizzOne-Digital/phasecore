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
            <p>Strategy. Technology. Execution. — Serving government and commercial organizations with practical, reliable solutions.</p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" aria-label="Twitter/X"><FiTwitter /></a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Cybersecurity & Compliance</Link></li>
              <li><Link to="/services">IT & Technology</Link></li>
              <li><Link to="/services">Project Management</Link></li>
              <li><Link to="/services">Business Consulting</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li><FiMail /><a href="mailto:contracts@phasecore.com">contracts@phasecore.com</a></li>
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
