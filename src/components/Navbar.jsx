import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleMouseEnter = (menu) => {
    if (!isMobile) {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
        setDropdownTimeout(null);
      }
      setActiveDropdown(menu);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      const timeout = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
      setDropdownTimeout(timeout);
    }
  };

  const menuItems = {
    preschool: [
      { name: 'Preschool Tracing', path: '/preschool-tracing' },
      { name: 'English', path: '/preschool-english' },
      { name: 'Math', path: '/preschool-math' },
      { name: 'Science', path: '/preschool-science' },
      { name: 'Homework', path: '/preschool-homework' },
      { name: 'Practice', path: '/preschool-practice' }
    ],
    kindergarten: [
      { name: 'Nursery', path: '/kindergarten-nursery' },
      { name: 'LKG', path: '/kindergarten-lkg' },
      { name: 'UKG', path: '/kindergarten-ukg' }
    ],
    firstGrade: [
      { name: '1st Grade English', path: '/1st-grade-english' },
      { name: '1st Grade Math', path: '/1st-grade-math' },
      { name: '1st Grade Science', path: '/1st-grade-science' },
      { name: '1st Grade Social Studies', path: '/1st-grade-social-studies' }
    ],
    secondGrade: [
      { name: '2nd Grade English', path: '/2nd-grade-english' },
      { name: '2nd Grade Math', path: '/2nd-grade-math' },
      { name: '2nd Grade Science', path: '/2nd-grade-science' },
      { name: '2nd Grade Social Studies', path: '/2nd-grade-social-studies' }
    ],
    blogs: [
      { name: 'Educational Tips', path: '/blog-educational-tips' },
      { name: 'Learning Activities', path: '/blog-learning-activities' },
      { name: 'Parent Resources', path: '/blog-parent-resources' },
      { name: 'Teaching Methods', path: '/blog-teaching-methods' }
    ]
  };

  const DesktopDropdown = ({ title, items, menuKey, isHighlighted }) => (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => handleMouseEnter(menuKey)}
      onMouseLeave={handleMouseLeave}
    >
      <button
        style={{
          padding: '0.5rem 1rem',
          background: isHighlighted ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)' : 'transparent',
          color: isHighlighted ? '#ffffff' : (activeDropdown === menuKey ? '#9333ea' : '#374151'),
          fontWeight: 600,
          borderRadius: isHighlighted ? '0.5rem' : '0',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        {title}
      </button>
      {activeDropdown === menuKey && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
            borderRadius: '0.75rem',
            padding: '0.75rem 0',
            minWidth: '220px',
            zIndex: 100,
            marginTop: '0.5rem',
            border: '2px dashed #e9d5ff'
          }}
        >
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              style={{
                display: 'block',
                padding: '0.75rem 1.5rem',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                fontWeight: 600,
                borderLeft: '4px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3e8ff';
                e.currentTarget.style.color = '#9333ea';
                e.currentTarget.style.borderLeftColor = '#9333ea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.borderLeftColor = 'transparent';
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const MobileDropdown = ({ title, items, menuKey, isHighlighted }) => (
    <div style={{ marginBottom: '0.5rem' }}>
      <button
        onClick={() => toggleDropdown(menuKey)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '0.75rem 1rem',
          background: isHighlighted ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)' : '#f3f4f6',
          color: isHighlighted ? '#ffffff' : '#374151',
          fontWeight: 600,
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {title}
        <span style={{ transform: activeDropdown === menuKey ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>▼</span>
      </button>
      <div
        style={{
          maxHeight: activeDropdown === menuKey ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}
      >
        <div style={{
          backgroundColor: '#faf5ff',
          borderRadius: '0.5rem',
          padding: activeDropdown === menuKey ? '0.5rem' : '0',
          marginTop: activeDropdown === menuKey ? '0.5rem' : '0',
          border: '2px dashed #e9d5ff'
        }}>
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.5rem 1rem',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                borderRadius: '0.25rem',
                transition: 'background-color 0.2s'
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
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <nav style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0.5rem 1rem' : '0.5rem 2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/wowkidsworksheet.png" 
              alt="WowKids Worksheets" 
              style={{ height: isMobile ? '70px' : '100px', width: 'auto', cursor: 'pointer' }}
            />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            style={{
              display: isMobile ? 'block' : 'none',
              fontSize: '2rem',
              color: '#1f2937',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Desktop Menu */}
          <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DesktopDropdown title="Preschool +" items={menuItems.preschool} menuKey="preschool" isHighlighted={true} />
            <DesktopDropdown title="Kindergarten +" items={menuItems.kindergarten} menuKey="kindergarten" />
            <DesktopDropdown title="1st Grade +" items={menuItems.firstGrade} menuKey="firstGrade" />
            <DesktopDropdown title="2nd Grade +" items={menuItems.secondGrade} menuKey="secondGrade" />
            <DesktopDropdown title="Blogs +" items={menuItems.blogs} menuKey="blogs" />

            <button style={{
              marginLeft: '1rem',
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🔍
            </button>

            <a
              href="/privacy-policy"
              style={{
                marginLeft: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)',
                color: '#ffffff',
                borderRadius: '9999px',
                fontWeight: 700,
                border: '4px dashed #ca8a04',
                cursor: 'pointer',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          style={{
            maxHeight: mobileMenuOpen ? '800px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
            paddingBottom: mobileMenuOpen ? '1rem' : '0'
          }}
        >
          <div style={{ 
            paddingTop: '1rem', 
            borderTop: mobileMenuOpen ? '1px solid #e5e7eb' : 'none',
            marginTop: mobileMenuOpen ? '0.5rem' : '0'
          }}>
            <MobileDropdown title="Preschool +" items={menuItems.preschool} menuKey="preschool" isHighlighted={true} />
            <MobileDropdown title="Kindergarten +" items={menuItems.kindergarten} menuKey="kindergarten" />
            <MobileDropdown title="1st Grade +" items={menuItems.firstGrade} menuKey="firstGrade" />
            <MobileDropdown title="2nd Grade +" items={menuItems.secondGrade} menuKey="secondGrade" />
            <MobileDropdown title="Blogs +" items={menuItems.blogs} menuKey="blogs" />

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0
              }}>
                🔍
              </button>

              <a
                href="/privacy-policy"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  flex: 1,
                  padding: '0.5rem 1.25rem',
                  background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  border: '4px dashed #ca8a04',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem'
                }}
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;