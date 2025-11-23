import React, { useState } from 'react';


const KindergartenUKG = () => {
  const [hoveredCard, setHoveredCard] = useState(null);


  const ukgWorksheets = [
    {
      id: 1,
      title: 'Three Letter Words',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #10b981 100%)',
      bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      url: '/worksheet/ukg-three-letter'
    },
    {
      id: 2,
      title: 'Four Letter Words',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #6366f1 100%)',
      bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
      url: '/worksheet/ukg-four-letter'
    },
    {
      id: 3,
      title: 'Subtraction',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%)',
      bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      url: '/worksheet/ukg-subtraction'
    },
    {
      id: 4,
      title: 'Counting 1-50',
      image: 'https://images.unsplash.com/photo-1612538498456-e861df91e4ca?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #ef4444 100%)',
      bgGradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      url: '/worksheet/ukg-counting-50'
    },
    {
      id: 5,
      title: 'Sentence Making',
      image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #8b5cf6 100%)',
      bgGradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
      url: '/worksheet/ukg-sentences'
    },
    {
      id: 6,
      title: 'Missing Numbers',
      image: 'https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #14b8a6 100%)',
      bgGradient: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
      url: '/worksheet/ukg-missing-numbers'
    },
    {
      id: 7,
      title: 'Simple Phonics',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #ec4899 100%)',
      bgGradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
      url: '/worksheet/ukg-phonics'
    },
    {
      id: 8,
      title: 'Greater Than Less Than',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #06b6d4 100%)',
      bgGradient: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
      url: '/worksheet/ukg-comparison'
    },
    {
      id: 9,
      title: 'Time Telling',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #f97316 100%)',
      bgGradient: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
      url: '/worksheet/ukg-time'
    },
    {
      id: 10,
      title: 'Seasons',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #84cc16 100%)',
      bgGradient: 'linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%)',
      url: '/worksheet/ukg-seasons'
    }
  ];



  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 40%, #fde68a 70%, #fef3c7 100%)', 
        padding: window.innerWidth <= 768 ? '3rem 1rem' : '5rem 1.5rem',
        overflow: 'hidden',
        minHeight: window.innerWidth <= 768 ? '300px' : '400px'
      }}>
        <div style={{ position: 'absolute', top: '2.5rem', left: window.innerWidth <= 768 ? '1rem' : '5rem', fontSize: window.innerWidth <= 768 ? '2.5rem' : '4rem' }}>🎓</div>
        <div style={{ position: 'absolute', top: '5rem', right: window.innerWidth <= 768 ? '1rem' : '10rem', fontSize: window.innerWidth <= 768 ? '2rem' : '3.5rem' }}>📖</div>
        <div style={{ position: 'absolute', bottom: '5rem', left: window.innerWidth <= 768 ? '0.5rem' : '2.5rem', fontSize: window.innerWidth <= 768 ? '2rem' : '3rem' }}>💡</div>
        <div style={{ position: 'absolute', bottom: '2.5rem', right: window.innerWidth <= 768 ? '1rem' : '5rem', fontSize: window.innerWidth <= 768 ? '2.5rem' : '4rem' }}>🏆</div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '42rem' }}>
            <h1 style={{ fontSize: window.innerWidth <= 768 ? '2.5rem' : window.innerWidth <= 1024 ? '3.5rem' : '4.5rem', fontWeight: 900, color: '#1f2937', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              UKG<br />
              <span style={{ 
                background: 'linear-gradient(90deg, #10b981 0%, #059669 50%, #f59e0b 100%)', 
                WebkitBackgroundClip: 'text', 
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Worksheets
              </span>
            </h1>
            <p style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.25rem', color: '#6b7280', marginTop: '1rem' }}>
              Advanced Upper Kindergarten worksheets to prepare children for Grade 1. Perfect for building strong academic foundations for ages 4-5 years.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ background: 'linear-gradient(180deg, #10b981 0%, #059669 50%, #10b981 100%)', padding: window.innerWidth <= 768 ? '2rem 1rem' : '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: window.innerWidth <= 768 ? '2rem' : window.innerWidth <= 1024 ? '2.5rem' : '3rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '2rem',
            background: 'linear-gradient(90deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            UKG Learning Resources
          </h2>

          <p style={{ color: '#ffffff', textAlign: 'center', fontSize: window.innerWidth <= 768 ? '1rem' : '1.125rem', maxWidth: '80rem', margin: '0 auto 4rem', lineHeight: 1.7, padding: '0 1rem' }}>
            Our Upper Kindergarten worksheets focus on advanced literacy, numeracy, and critical thinking skills. These comprehensive 
            worksheets help children master reading, writing complete sentences, basic math operations, and time concepts. 
            Designed specifically for 4-5 year olds preparing for primary school.
          </p>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 640 ? '1fr' : window.innerWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: window.innerWidth <= 768 ? '1.5rem' : '2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
            {ukgWorksheets.map((worksheet) => (
              <div
                key={worksheet.id}
                onMouseEnter={() => setHoveredCard(worksheet.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ position: 'relative' }}
              >
                <div style={{ 
                  position: 'relative', 
                  borderRadius: '1.5rem 1.5rem 0 0', 
                  overflow: 'hidden',
                  transform: hoveredCard === worksheet.id ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.3s'
                }}>
                  <div style={{ position: 'relative', height: '32px', background: 'linear-gradient(90deg, #fcd34d 0%, #fb923c 50%, #fcd34d 100%)' }}>
                    <svg style={{ position: 'absolute', bottom: 0, width: '100%', height: '16px' }} viewBox="0 0 1200 60" preserveAspectRatio="none">
                      <path d="M0,30 Q300,60 600,30 T1200,30 L1200,60 L0,60 Z" fill="white"/>
                    </svg>
                  </div>

                  <div style={{ background: worksheet.bgGradient, padding: '1.5rem' }}>
                    <div style={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '1rem', 
                      padding: '1rem', 
                      marginBottom: '1.5rem',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      border: '4px solid #e9d5ff',
                      overflow: 'hidden',
                      height: '180px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: hoveredCard === worksheet.id ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s'
                    }}>
                      <img 
                        src={worksheet.image} 
                        alt={worksheet.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }}
                      />
                    </div>

                    <button 
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1.5rem', 
                        borderRadius: '9999px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        fontSize: window.innerWidth <= 768 ? '1rem' : '1.125rem',
                        background: worksheet.gradient,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        transform: hoveredCard === worksheet.id ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.3s'
                      }}
                    >
                      {worksheet.title}
                    </button>
                  </div>

                  <div style={{ position: 'relative', marginTop: '-1rem' }}>
                    <button 
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1.5rem', 
                        background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        fontSize: window.innerWidth <= 768 ? '1rem' : '1.125rem',
                        borderRadius: '0 0 1.5rem 1.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s'
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KindergartenUKG;