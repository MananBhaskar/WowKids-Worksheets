
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const PrivacyPolicy = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dropdownOptions = {
    preschool: [
      { label: 'Preschool Tracing', url: '/preschool-tracing' },
      { label: 'English', url: '/preschool-english' },
      { label: 'Math', url: '/preschool-math' },
      { label: 'Science', url: '/preschool-science' },
      { label: 'Homework', url: '/preschool-homework' },
      { label: 'Practice', url: '/preschool-practice' }
    ],
    kindergarten: [
      { label: 'Nursery', url: '/kindergarten-nursery' },
      { label: 'LKG', url: '/kindergarten-lkg' },
      { label: 'UKG', url: '/kindergarten-ukg' }
    ],
    firstGrade: [
      { label: '1st Grade English', url: '/1st-grade-english' },
      { label: '1st Grade Math', url: '/1st-grade-math' },
      { label: '1st Grade Science', url: '/1st-grade-science' },
      { label: '1st Grade Social Studies', url: '/1st-grade-social-studies' }
    ],
    secondGrade: [
      { label: '2nd Grade English', url: '/2nd-grade-english' },
      { label: '2nd Grade Math', url: '/2nd-grade-math' },
      { label: '2nd Grade Science', url: '/2nd-grade-science' },
      { label: '2nd Grade Social Studies', url: '/2nd-grade-social-studies' }
    ],
    blogs: [
      { label: 'Educational Tips', url: '/blog-educational-tips' },
      { label: 'Learning Activities', url: '/blog-learning-activities' },
      { label: 'Parent Resources', url: '/blog-parent-resources' },
      { label: 'Teaching Methods', url: '/blog-teaching-methods' }
    ]
  };

  const NavDropdown = ({ title, options, dropdownKey }) => {
    const isActive = activeDropdown === dropdownKey;
    
    const handleMouseEnter = () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
        setDropdownTimeout(null);
      }
      setActiveDropdown(dropdownKey);
    };

    const handleMouseLeave = () => {
      const timeout = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
      setDropdownTimeout(timeout);
    };
    
    return (
      <div
        style={{ position: 'relative' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href="#"
          style={{
            padding: '0.5rem 1rem',
            color: isActive ? '#9333ea' : '#374151',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'color 0.3s',
            cursor: 'pointer',
            display: 'block'
          }}
        >
          {title}
        </a>
        {isActive && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
              borderRadius: '0.75rem',
              padding: '0.75rem 0',
              minWidth: '200px',
              zIndex: 100,
              marginTop: '0.5rem',
              border: '2px dashed #e9d5ff'
            }}
          >
            {options.map((option, idx) => (
              <a
                key={idx}
                href={option.url}
                style={{
                  display: 'block',
                  padding: '0.75rem 1.5rem',
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  fontWeight: 600
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3e8ff';
                  e.currentTarget.style.color = '#9333ea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#374151';
                }}
              >
                {option.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
    <Navbar />
      {/* Header/Navigation */}
      {/* <header style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 1rem' : '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isMobile ? '70px' : '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/wowkidsworksheet.png" 
                alt="WowKids Worksheets" 
                style={{ height: isMobile ? '90px' : '140px', width: 'auto', cursor: 'pointer' }}
              />
            </div>

            {/* Desktop Navigation
            {!isMobile && (
              <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <NavDropdown title="Preschool +" options={dropdownOptions.preschool} dropdownKey="preschool" />
                <NavDropdown title="Kindergarten +" options={dropdownOptions.kindergarten} dropdownKey="kindergarten" />
                <NavDropdown title="1st Grade +" options={dropdownOptions.firstGrade} dropdownKey="firstGrade" />
                <NavDropdown title="2nd Grade +" options={dropdownOptions.secondGrade} dropdownKey="secondGrade" />
                <NavDropdown title="Blogs +" options={dropdownOptions.blogs} dropdownKey="blogs" />
                
                <button style={{ 
                  marginLeft: '1rem', 
                  width: '50px', 
                  height: '50px', 
                  background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)', 
                  borderRadius: '50%', 
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}>
                  🔍
                </button>
                <button 
                  style={{ 
                    marginLeft: '0.5rem', 
                    padding: '0.75rem 1.75rem', 
                    background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)', 
                    color: '#ffffff',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    border: '3px dashed #ca8a04',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                >
                  Privacy Policy
                </button>
              </nav>
            )}

            {/* Mobile Hamburger Menu 
            {isMobile && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)', 
                  borderRadius: '12px', 
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ width: '25px', height: '3px', backgroundColor: '#ffffff', borderRadius: '2px', transition: 'all 0.3s' }}></div>
                <div style={{ width: '25px', height: '3px', backgroundColor: '#ffffff', borderRadius: '2px', transition: 'all 0.3s' }}></div>
                <div style={{ width: '25px', height: '3px', backgroundColor: '#ffffff', borderRadius: '2px', transition: 'all 0.3s' }}></div>
              </button>
            )}
          </div>

          {/* Mobile Menu Dropdown
          {isMobile && isMobileMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '70px',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
              padding: '1rem',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              {Object.entries(dropdownOptions).map(([key, options]) => (
                <div key={key} style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: 700, 
                    color: '#9333ea', 
                    marginBottom: '0.75rem',
                    textTransform: 'capitalize'
                  }}>
                    {key === 'firstGrade' ? '1st Grade' : key === 'secondGrade' ? '2nd Grade' : key}
                  </h3>
                  {options.map((option, idx) => (
                    <a
                      key={idx}
                      href={option.url}
                      style={{
                        display: 'block',
                        padding: '0.75rem 1rem',
                        color: '#374151',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        backgroundColor: '#f9fafb',
                        marginBottom: '0.5rem',
                        borderRadius: '0.5rem',
                        fontWeight: 600
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              ))}
              <button 
                style={{ 
                  width: '100%',
                  padding: '1rem', 
                  background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)', 
                  color: '#ffffff',
                  borderRadius: '12px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginTop: '1rem'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔍 Search
              </button>
            </div>
          )}
        </div>
      </header> */}

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
              <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: isMobile ? '0.95rem' : '1.05rem' }}>
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

      {/* Footer */}
      <section style={{ background: 'linear-gradient(180deg, #1e3a8a 0%, #312e81 100%)', padding: isMobile ? '2.5rem 1rem' : '4rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#ffffff', borderRadius: '1rem', padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <img 
                src="wowkidsworksheet.png" 
                alt="WowKids Worksheets" 
                style={{ height: isMobile ? '100px' : '140px', width: 'auto' }}
              />
            </div>
          </div>

          <p style={{ color: '#ffffff', fontSize: isMobile ? '1rem' : '1.125rem', lineHeight: 1.7, marginBottom: '2rem', padding: isMobile ? '0 0.5rem' : '0' }}>
            Online worksheets for kids - free worksheets, worksheets for adults, worksheets for kids, worksheets for girls, 
            worksheets for boys, worksheets for parents, worksheets for teachers and much more.
          </p>

          <p style={{ color: '#67e8f9', fontSize: isMobile ? '1rem' : '1.125rem', marginBottom: '2rem', wordBreak: 'break-all', padding: isMobile ? '0 0.5rem' : '0' }}>
            Contact Us: <span style={{ fontWeight: 600 }}>support@wowkidsworksheet.com</span>
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '0.75rem' : '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {[
              { icon: '🐦', gradient: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)', url: 'https://twitter.com' },
              { icon: '📘', gradient: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', url: 'https://facebook.com' },
              { icon: '📷', gradient: 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)', url: 'https://instagram.com' },
              { icon: '▶️', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', url: 'https://youtube.com' },
              { icon: '📌', gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', url: 'https://pinterest.com' }
            ].map((social, idx) => (
              <button
                key={idx}
                onClick={() => window.open(social.url, '_blank')}
                style={{ 
                  width: isMobile ? '50px' : '56px', 
                  height: isMobile ? '50px' : '56px', 
                  borderRadius: '50%',
                  background: social.gradient,
                  color: '#ffffff',
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {social.icon}
              </button>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
            © Copyright 2025 <span style={{ fontWeight: 600, color: '#ffffff' }}>WowKids Worksheet</span> - All Rights Reserved
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;