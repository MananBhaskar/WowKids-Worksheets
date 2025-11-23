import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scholar from '../assets/scholar.png';

const PreschoolTracing = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  
  // NEW: Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  // NEW: Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (url) => {
    navigate(url);
  };

  const categories = [
    {
      id: 1,
      title: 'Letter Tracing A-Z',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ec4899 100%)',
      bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #ffe4e6 100%)',
      url: '/worksheet/letter-tracing-az',
      emoji: '✏️'  // Added emoji
    },
    {
      id: 2,
      title: 'Number Tracing 1-10',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #a78bfa 100%)',
      bgGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
      url: '/worksheet/number-tracing-1-10',
      emoji: '🔢'
    },
    {
      id: 3,
      title: 'Shape Tracing',
      image: 'https://images.unsplash.com/photo-1596496050755-c923e73e42e1?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #22d3ee 100%)',
      bgGradient: 'linear-gradient(135deg, #ecfeff 0%, #dbeafe 100%)',
      url: '/worksheet/shape-tracing',
      emoji: '🔷'
    },
    {
      id: 4,
      title: 'Line Tracing',
      image: 'https://images.unsplash.com/photo-1612538498456-e861df91e4ca?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #2dd4bf 0%, #10b981 50%, #2dd4bf 100%)',
      bgGradient: 'linear-gradient(135deg, #f0fdfa 0%, #d1fae5 100%)',
      url: '/worksheet/line-tracing',
      emoji: '📏'
    },
    {
      id: 5,
      title: 'Dotted Line Tracing',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)',
      bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #ffedd5 100%)',
      url: '/worksheet/dotted-line-tracing',
      emoji: '⚪'
    },
    {
      id: 6,
      title: 'Curved Line Tracing',
      image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #f472b6 100%)',
      bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
      url: '/worksheet/curved-line-tracing',
      emoji: '〰️'
    },
    {
      id: 7,
      title: 'Zigzag Tracing',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 50%, #fb923c 100%)',
      bgGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      url: '/worksheet/zigzag-tracing',
      emoji: '⚡'
    },
    {
      id: 8,
      title: 'Picture Tracing',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #34d399 100%)',
      bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      url: '/worksheet/picture-tracing',
      emoji: '🖼️'
    },
    {
      id: 9,
      title: 'Name Tracing',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #60a5fa 100%)',
      bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      url: '/worksheet/name-tracing',
      emoji: '👤'
    },
    {
      id: 10,
      title: 'Animal Tracing',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #c084fc 100%)',
      bgGradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
      url: '/worksheet/animal-tracing',
      emoji: '🦁'
    }
  ];



  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section - RESPONSIVE */}
      <section className={`relative bg-gradient-to-br from-amber-100 via-pink-100 via-indigo-100 to-blue-100 overflow-hidden ${
        isMobile ? 'py-12 px-4 min-h-[300px]' : 'py-20 px-6 min-h-[400px]'
      }`}>
        
        {/* Doodle decoration - hidden on mobile */}
        {!isMobile && (
          <img 
            src="/icons/Open Doodles - Ice Cream.png" 
            alt="decorative doodle" 
            className="absolute right-40 top-1/2 -translate-y-1/2 -scale-x-100 w-64 h-auto opacity-50 z-0"
          />
        )}

        {/* Floating Emojis - RESPONSIVE sizing */}
        <div className={`absolute ${isMobile ? 'top-4 left-4 text-3xl' : 'top-10 left-20 text-6xl'}`}>✏️</div>
        <div className={`absolute ${isMobile ? 'top-6 right-4 text-2xl' : 'top-20 right-40 text-5xl'}`}>📝</div>
        <div className={`absolute ${isMobile ? 'bottom-8 left-4 text-2xl' : 'bottom-20 left-10 text-5xl'}`}>✨</div>
        <div className={`absolute ${isMobile ? 'bottom-4 right-4 text-3xl' : 'bottom-10 right-20 text-6xl'}`}>🖍️</div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            {/* Responsive heading */}
            <h1 className={`font-black text-gray-800 mb-6 leading-tight ${
              isMobile ? 'text-4xl' : 'text-7xl'
            }`}>
              Preschool<br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Tracing Worksheets
              </span>
            </h1>
            {/* Responsive paragraph */}
            <p className={`text-gray-500 mt-4 ${isMobile ? 'text-base' : 'text-xl'}`}>
              Fun and engaging tracing worksheets to help preschoolers develop fine motor skills and handwriting abilities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section - RESPONSIVE */}
      <section className={`relative bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900 overflow-hidden ${
        isMobile ? 'py-8 px-4' : 'py-16 px-6'
      }`}>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title with decorative elements - RESPONSIVE */}
          <div className="text-center mb-8 relative">
            <div className={`absolute left-1/2 transform -translate-x-1/2 animate-bounce ${
              isMobile ? '-top-6' : '-top-10'
            }`}>
              <img src={scholar} alt="scholar" className={isMobile ? 'w-10 h-10' : 'w-14 h-14'}/>
            </div>
            <h2 className={`font-black mb-4 bg-gradient-to-r from-cyan-300 via-green-300 to-cyan-300 bg-clip-text text-transparent animate-pulse ${
              isMobile ? 'text-3xl' : 'text-5xl md:text-6xl'
            }`}>
              Wowkids Worksheets
            </h2>
          </div>

          {/* Description - RESPONSIVE */}
          <p className={`text-white text-center max-w-5xl mx-auto mb-12 leading-relaxed bg-white/10 backdrop-blur-sm rounded-3xl border-2 border-white/20 ${
            isMobile ? 'text-sm p-4' : 'text-lg p-6'
          }`}>
            Wowkids Worksheets for kids is a hub of online printable worksheets for toddlers, preschoolers and even adults. 
            We offer a large variety of online worksheets that come handy, moreover these free worksheets can easily be 
            incorporated in any syllabus and curriculum. More than 100+ worksheets for everyone. These free printable 
            worksheets are easy to access, safe for kids of all ages, and compatible with every device. Try these amazing 
            free printable worksheets for kids and perk up the monotonous learning.
          </p>

          {/* Cards Grid - RESPONSIVE */}
          <div className={`grid ${
            isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          }`}>
            {categories.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                {/* Floating emoji - RESPONSIVE */}
                <div className={`absolute z-20 transition-transform duration-300 ${
                  isMobile ? '-top-4 -right-4 text-4xl' : '-top-6 -right-6 text-6xl'
                } ${hoveredCard === category.id ? 'scale-125 rotate-12' : 'scale-100'}`}>
                  {category.emoji}
                </div>

                {/* Card */}
                <div 
                  style={{ background: category.bgGradient }}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    hoveredCard === category.id ? 'transform -translate-y-4 shadow-3xl' : ''
                  }`}
                >
                  {/* Decorative wavy top */}
                  <div className="relative h-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400">
                    <svg className="absolute bottom-0 w-full h-4" viewBox="0 0 1200 60" preserveAspectRatio="none">
                      <path d="M0,30 Q300,60 600,30 T1200,30 L1200,60 L0,60 Z" fill="white"/>
                    </svg>
                  </div>

                  {/* Content - RESPONSIVE padding */}
                  <div className={isMobile ? 'p-4' : 'p-6'}>
                    {/* Image with fun border - RESPONSIVE height */}
                    <div className={`relative bg-white rounded-2xl p-2 mb-6 shadow-lg border-4 border-purple-300 overflow-hidden transition-transform duration-300 ${
                      hoveredCard === category.id ? 'scale-105 rotate-2' : ''
                    }`}>
                      <div className={`rounded-xl overflow-hidden ${isMobile ? 'h-40' : 'h-48'}`}>
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Corner decorations - RESPONSIVE size */}
                      <div className={`absolute top-0 left-0 ${isMobile ? 'text-xl' : 'text-2xl'}`}>🌟</div>
                      <div className={`absolute top-0 right-0 ${isMobile ? 'text-xl' : 'text-2xl'}`}>🌟</div>
                      <div className={`absolute bottom-0 left-0 ${isMobile ? 'text-xl' : 'text-2xl'}`}>🌟</div>
                      <div className={`absolute bottom-0 right-0 ${isMobile ? 'text-xl' : 'text-2xl'}`}>🌟</div>
                    </div>

                    {/* Title Button - RESPONSIVE */}
                    <button 
                      onClick={() => handleNavigation(category.url)}
                      style={{ background: category.gradient }}
                      className={`w-full rounded-full font-black text-white mb-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform border-4 border-white ${
                        isMobile ? 'py-3 px-4 text-base' : 'py-4 px-6 text-xl'
                      }`}
                    >
                      {category.title}
                    </button>

                    {/* View Button - RESPONSIVE */}
                    <button 
                      onClick={() => handleNavigation(category.url)}
                      className={`w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 group ${
                        isMobile ? 'py-2 px-4 text-base' : 'py-3 px-6 text-lg'
                      }`}
                    >
                      <span>View All</span>
                      <span className={`group-hover:translate-x-2 transition-transform duration-300 ${
                        isMobile ? 'text-xl' : 'text-2xl'
                      }`}>→</span>
                    </button>
                  </div>

                  {/* Bottom wave decoration */}
                  <svg className="w-full h-6" viewBox="0 0 1200 60" preserveAspectRatio="none">
                    <path d="M0,30 Q300,0 600,30 T1200,30 L1200,0 L0,0 Z" fill="white" opacity="0.3"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreschoolTracing;