import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton.jsx';

const PrivacyPolicy = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 40%, #e0e7ff 70%, #dbeafe 100%)', 
        padding: isMobile ? '2.5rem 1rem' : '4rem 1.5rem',
        overflow: 'hidden'
      }}>
        {!isMobile && (
          <>
            <div style={{ position: 'absolute', top: '2rem', left: '5rem', fontSize: '3rem' }}>🔒</div>
            <div style={{ position: 'absolute', top: '3rem', right: '8rem', fontSize: '2.5rem' }}>📜</div>
            <div style={{ position: 'absolute', bottom: '2rem', left: '3rem', fontSize: '2.5rem' }}>🛡️</div>
            <div style={{ position: 'absolute', bottom: '3rem', right: '5rem', fontSize: '3rem' }}>✅</div>
          </>
        )}

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, color: '#1f2937', marginBottom: '1rem', lineHeight: 1.1 }}>
            <span style={{ 
              background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 50%, #3b82f6 100%)', 
              WebkitBackgroundClip: 'text', 
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              Privacy Policy
            </span>
          </h1>
          <p style={{ fontSize: isMobile ? '1rem' : '1.125rem', color: '#6b7280', maxWidth: '42rem', margin: '0 auto', padding: isMobile ? '0 1rem' : '0' }}>
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ background: 'linear-gradient(180deg, #1e3a8a 0%, #4c1d95 50%, #1e3a8a 100%)', padding: isMobile ? '2.5rem 1rem' : '4rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Policy Card */}
          <div style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)', 
            borderRadius: isMobile ? '1.5rem' : '2rem', 
            padding: isMobile ? '1.5rem' : '3rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
            border: '4px dashed #e9d5ff'
          }}>
            
            {/* Last Updated */}
            <div style={{ 
              background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)', 
              color: '#ffffff',
              padding: isMobile ? '0.6rem 1.25rem' : '0.75rem 1.5rem',
              borderRadius: '9999px',
              display: 'inline-block',
              fontWeight: 700,
              marginBottom: '2rem',
              fontSize: isMobile ? '0.85rem' : '0.95rem'
            }}>
              Last Updated: January 2025
            </div>

            {/* Section 1 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                1. Information We Collect
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
                WowKids Worksheet collects minimal information to provide you with the best educational experience. We may collect basic usage data such as pages visited, worksheets downloaded, and time spent on our platform. We do not collect personal information from children without parental consent.
              </p>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                2. How We Use Your Information
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem', marginBottom: '1rem' }}>
                The information we collect is used to:
              </p>
              <ul style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Improve our worksheets and educational content</li>
                <li style={{ marginBottom: '0.5rem' }}>Provide customer support and respond to inquiries</li>
                <li style={{ marginBottom: '0.5rem' }}>Analyze usage patterns to enhance user experience</li>
                <li style={{ marginBottom: '0.5rem' }}>Send educational tips and updates (with consent)</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                3. Cookies and Tracking
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
                We use cookies to remember your preferences and improve your browsing experience. These cookies do not store personal information and can be disabled in your browser settings. We use analytics tools to understand how visitors interact with our site, helping us create better content for children.
              </p>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                4. Children's Privacy
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
                We are committed to protecting children's privacy. Our website is designed for educational purposes and does not knowingly collect personal information from children under 13 without parental consent. If you believe we have inadvertently collected such information, please contact us immediately at support@wowkidsworksheet.com.
              </p>
            </div>

            {/* Section 5 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                5. Third-Party Services
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
                We may use third-party services for analytics, hosting, and content delivery. These services have their own privacy policies and we encourage you to review them. We do not share personal information with third parties for marketing purposes.
              </p>
            </div>

            {/* Section 6 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                6. Data Security
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
                We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure. We continuously update our security practices to ensure the safety of your data.
              </p>
            </div>

            {/* Section 7 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                7. Your Rights
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem', marginBottom: '1rem' }}>
                You have the right to:
              </p>
              <ul style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Access the information we have about you</li>
                <li style={{ marginBottom: '0.5rem' }}>Request correction of inaccurate data</li>
                <li style={{ marginBottom: '0.5rem' }}>Request deletion of your information</li>
                <li style={{ marginBottom: '0.5rem' }}>Opt-out of marketing communications</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800,
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                8. Changes to Privacy Policy
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
                We may update this privacy policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Contact Section */}
            <div style={{ 
              background: 'linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)', 
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: '1.5rem',
              border: '3px dashed #a78bfa',
              textAlign: 'center'
            }}>
              <h2 style={{ 
                fontSize: isMobile ? '1.375rem' : '1.75rem', 
                fontWeight: 800, 
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Contact Us
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: isMobile ? '0.95rem' : '1.05rem', marginBottom: '1rem' }}>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div style={{ 
                background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 100%)', 
                color: '#ffffff',
                padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                borderRadius: '9999px',
                display: 'inline-block',
                fontWeight: 700,
                fontSize: isMobile ? '1rem' : '1.125rem',
                wordBreak: 'break-all'
              }}>
                📧 support@wowkidsworksheet.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="919876543210" 
        message="Hi! I have a question about your privacy policy."
      />

      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;