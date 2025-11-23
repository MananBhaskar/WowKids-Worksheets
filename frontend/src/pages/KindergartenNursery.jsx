import React, { useState } from 'react';


const KindergartenNursery = () => {
  const [hoveredCard, setHoveredCard] = useState(null);


  const nurseryWorksheets = [
    {
      id: 1,
      title: 'Colors Recognition',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)',
      bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #ffe4e6 100%)',
      url: '/worksheet/nursery-colors'
    },
    {
      id: 2,
      title: 'Basic Shapes',
      image: 'https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #a78bfa 100%)',
      bgGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      url: '/worksheet/nursery-shapes'
    },
    {
      id: 3,
      title: 'Alphabet A-Z',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #22d3ee 100%)',
      bgGradient: 'linear-gradient(135deg, #ecfeff 0%, #dbeafe 100%)',
      url: '/worksheet/nursery-alphabet'
    },
    {
      id: 4,
      title: 'Numbers 1-10',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #2dd4bf 100%)',
      bgGradient: 'linear-gradient(135deg, #f0fdfa 0%, #d1fae5 100%)',
      url: '/worksheet/nursery-numbers'
    },
    {
      id: 5,
      title: 'Pattern Matching',
      image: 'https://images.unsplash.com/photo-1612538498456-e861df91e4ca?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)',
      bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #ffedd5 100%)',
      url: '/worksheet/nursery-patterns'
    },
    {
      id: 6,
      title: 'Big and Small',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #f472b6 100%)',
      bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
      url: '/worksheet/nursery-size'
    },
    {
      id: 7,
      title: 'Same and Different',
      image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 50%, #fb923c 100%)',
      bgGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      url: '/worksheet/nursery-same-different'
    },
    {
      id: 8,
      title: 'Animal Recognition',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #34d399 100%)',
      bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      url: '/worksheet/nursery-animals'
    },
    {
      id: 9,
      title: 'Fruit Names',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #60a5fa 100%)',
      bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      url: '/worksheet/nursery-fruits'
    },
    {
      id: 10,
      title: 'My Body Parts',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #c084fc 100%)',
      bgGradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
      url: '/worksheet/nursery-body-parts'
    }
  ];



  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 40%, #e0e7ff 70%, #dbeafe 100%)', 
        padding: window.innerWidth <= 768 ? '3rem 1rem' : '5rem 1.5rem',
        overflow: 'hidden',
        minHeight: window.innerWidth <= 768 ? '300px' : '400px'
      }}>
        <div style={{ position: 'absolute', top: '2.5rem', left: window.innerWidth <= 768 ? '1rem' : '5rem', fontSize: window.innerWidth <= 768 ? '2.5rem' : '4rem' }}>🎨</div>
        <div style={{ position: 'absolute', top: '5rem', right: window.innerWidth <= 768 ? '1rem' : '10rem', fontSize: window.innerWidth <= 768 ? '2rem' : '3.5rem' }}>🧸</div>
        <div style={{ position: 'absolute', bottom: '5rem', left: window.innerWidth <= 768 ? '0.5rem' : '2.5rem', fontSize: window.innerWidth <= 768 ? '2rem' : '3rem' }}>⭐</div>
        <div style={{ position: 'absolute', bottom: '2.5rem', right: window.innerWidth <= 768 ? '1rem' : '5rem', fontSize: window.innerWidth <= 768 ? '2.5rem' : '4rem' }}>🎈</div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '42rem' }}>
            <h1 style={{ fontSize: window.innerWidth <= 768 ? '2.5rem' : window.innerWidth <= 1024 ? '3.5rem' : '4.5rem', fontWeight: 900, color: '#1f2937', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Nursery<br />
              <span style={{ 
                background: 'linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #fb923c 100%)', 
                WebkitBackgroundClip: 'text', 
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Worksheets
              </span>
            </h1>
            <p style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.25rem', color: '#6b7280', marginTop: '1rem' }}>
              Fun and colorful learning activities for little learners. Perfect for introducing basic concepts through play and exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ background: 'linear-gradient(180deg, #ec4899 0%, #f472b6 50%, #ec4899 100%)', padding: window.innerWidth <= 768 ? '2rem 1rem' : '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: window.innerWidth <= 768 ? '2rem' : window.innerWidth <= 1024 ? '2.5rem' : '3rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '2rem',
            background: 'linear-gradient(90deg, #fef3c7 0%, #ffe4e6 50%, #fef3c7 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            Nursery Learning Activities
          </h2>

          <p style={{ color: '#ffffff', textAlign: 'center', fontSize: window.innerWidth <= 768 ? '1rem' : '1.125rem', maxWidth: '80rem', margin: '0 auto 4rem', lineHeight: 1.7, padding: '0 1rem' }}>
            Our nursery worksheets introduce young children to foundational learning concepts through engaging, age-appropriate 
            activities. Each worksheet is designed with bright colors and simple tasks to capture attention and build confidence 
            in early learners aged 2-3 years.
          </p>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 640 ? '1fr' : window.innerWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: window.innerWidth <= 768 ? '1.5rem' : '2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
            {nurseryWorksheets.map((worksheet) => (
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

export default KindergartenNursery;