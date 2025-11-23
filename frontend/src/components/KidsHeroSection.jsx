import React from "react";

export default function KidsHeroSection() {
  const scrollToWorksheets = () => {
    const worksheetsSection = document.getElementById("worksheets-section");
    if (worksheetsSection) {
      worksheetsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-pink-100 via-indigo-100 to-sky-100 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 min-h-[420px] md:min-h-[560px]">
      {/* Custom keyframes for soft float / wiggle */}
      <style>{`
        @keyframes float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes wiggle-soft {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-float-soft {
          animation: float-soft 3.5s ease-in-out infinite;
        }
        .animate-float-soft-delay {
          animation: float-soft 4s ease-in-out infinite 0.4s;
        }
        .animate-wiggle-soft {
          animation: wiggle-soft 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* Desktop / Tablet decorative images */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* Big main kid image */}
        <div className="absolute bottom-12 right-12 lg:right-24 w-40 h-40 lg:w-52 lg:h-52 rounded-full border-4 border-white shadow-xl overflow-hidden animate-float-soft">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&auto=format"
            alt="Happy kid learning"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Secondary kid image */}
        <div className="absolute bottom-32 right-40 lg:right-52 w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden animate-float-soft-delay">
          <img
            src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300&h=300&fit=crop&auto=format"
            alt="Curious child"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Simple stickers – less crowded */}
        <div className="absolute top-10 left-10 text-5xl animate-bounce">⭐</div>
        <div className="absolute top-16 right-64 text-5xl animate-float-soft">🌈</div>
        <div className="absolute bottom-16 left-24 text-4xl animate-wiggle-soft">
          📚
        </div>
        <div className="absolute bottom-10 left-8 text-4xl animate-bounce">
          🎈
        </div>
      </div>

      {/* Mobile decorative images */}
      <div className="pointer-events-none absolute inset-0 md:hidden">
        <div className="absolute bottom-6 right-4 w-20 h-20 rounded-full border-3 border-white shadow-md overflow-hidden animate-float-soft">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&auto=format"
            alt="Happy kid"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-20 left-3 w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden animate-float-soft-delay">
          <img
            src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=200&h=200&fit=crop&auto=format"
            alt="Creative child"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-4 left-4 text-3xl animate-bounce">⭐</div>
        <div className="absolute top-6 right-4 text-3xl animate-float-soft">
          🌈
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-xl sm:max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight drop-shadow-[3px_3px_0_rgba(255,255,255,0.9)]">
            Online
            <br />
            <span className="inline-block font-black">
              Worksheets For
            </span>
            <br />
            <span className="inline-block animate-wiggle-soft">
              Kids 🎉
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 drop-shadow-[2px_2px_0_rgba(255,255,255,0.9)] max-w-md sm:max-w-lg">
            Fun learning activities for curious minds!
          </p>

          <div className="mt-6 sm:mt-8">
            <button
              onClick={scrollToWorksheets}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white text-lg sm:text-xl font-bold px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              Start Learning! 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
