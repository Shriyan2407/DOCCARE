import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Platform: ['Overview', 'Services', 'AI Diagnostics', 'Telemedicine', 'Mobile App'],
    Specialists: ['Find a Doctor', 'Primary Care', 'Cardiology', 'Neurology', 'Mental Health'],
    Resources: ['Health Insights', 'Research', 'Patient Stories', 'FAQs', 'Blog'],
    Company: ['About Us', 'Careers', 'Press', 'Contact', 'Privacy Policy'],
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-top-line" />

      <div className="container">
        {/* Main footer grid */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="url(#footerGold)" strokeWidth="1.5" />
                <path d="M14 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="url(#footerGold)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M19 29c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="url(#footerGold)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="24" cy="34" r="2" fill="url(#footerGold)" />
                <defs>
                  <linearGradient id="footerGold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4AF37" />
                    <stop offset="1" stopColor="#E6C56A" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="footer-wordmark">
                <span>DOC</span>
                <span className="footer-wordmark-care">CARE</span>
              </span>
            </div>
            <p className="footer-tagline">
              Healthcare Without Compromise. The world's most advanced AI-powered healthcare operating system.
            </p>
            <div className="footer-certifications">
              {['HIPAA', 'ISO 27001', 'SOC 2'].map(cert => (
                <span key={cert} className="footer-cert">{cert}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="footer-col">
              <h4 className="footer-col-title">{category}</h4>
              <ul className="footer-links">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="footer-link" id={`footer-${item.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} DOCCARE Technologies Inc. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link" id="footer-terms">Terms of Service</a>
            <a href="#" className="footer-bottom-link" id="footer-privacy">Privacy Policy</a>
            <a href="#" className="footer-bottom-link" id="footer-cookies">Cookies</a>
          </div>
          <div className="footer-socials">
            {/* LinkedIn */}
            <a href="#" className="footer-social" id="footer-linkedin" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* X/Twitter */}
            <a href="#" className="footer-social" id="footer-twitter" aria-label="Twitter/X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
