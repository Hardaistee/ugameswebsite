import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Selection() {
  const navigate = useNavigate()
  const [leftHovered, setLeftHovered] = useState(false)
  const [rightHovered, setRightHovered] = useState(false)

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Compact Welcome Header with Logo */}
      <div className="w-full py-3 sm:py-4 px-4 sm:px-6 text-center z-20 relative border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-4">
          {/* Logo */}
          <img
            src="/images/Yeni Proje-17.png"
            alt="uGames Logo"
            className="h-10 sm:h-12 w-auto object-contain"
            style={{
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))'
            }}
          />

          {/* Divider */}
          <div className="h-8 sm:h-10 w-px" style={{ background: 'var(--border)' }} />

          {/* Text */}
          <div className="text-left">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-black leading-tight"
              style={{ color: 'var(--text)' }}
            >
              Hoşgeldiniz
            </h1>
            <p
              className="text-xs sm:text-sm"
              style={{ color: 'var(--muted)' }}
            >
              Bir kategori seçin
            </p>
          </div>
        </div>
      </div>

      {/* Split Selection Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sol Taraf - Tek Oyunculu Satış */}
        <div
          onClick={() => navigate('/tek-oyunculu')}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
          className="flex-1 relative cursor-pointer transition-all duration-700 ease-out min-h-[50vh] md:min-h-0"
          style={{
            flex: leftHovered ? '1.3' : rightHovered ? '0.7' : '1',
            background: 'var(--surface)'
          }}
        >
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
              opacity: leftHovered ? 1 : 0.5
            }}
          />

          {/* Animated grid pattern */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: leftHovered ? '60px 60px' : '40px 40px',
              opacity: leftHovered ? 0.3 : 0.15
            }}
          />

          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 70%)`,
              opacity: leftHovered ? 0.05 : 0
            }}
          />

          {/* Border */}
          <div
            className="hidden md:block absolute right-0 top-0 bottom-0 w-[2px] transition-all duration-500"
            style={{
              background: 'var(--border)',
              opacity: leftHovered ? 0.5 : 1
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-12">
            {/* Icon with animation */}
            <div
              className="mb-8 transition-all duration-500"
              style={{
                transform: leftHovered ? 'scale(1.15) rotateY(360deg)' : 'scale(1)',
                color: 'var(--accent)'
              }}
            >
              <div
                className="relative"
                style={{
                  filter: leftHovered ? `drop-shadow(0 0 20px var(--accent))` : 'none'
                }}
              >
                <svg
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
            </div>

            {/* Main heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-center transition-all duration-500"
              style={{
                color: 'var(--text)',
                transform: leftHovered ? 'translateY(-10px)' : 'translateY(0)',
                letterSpacing: '-0.02em'
              }}
            >
              Tek Oyunculu<br />Satış
            </h2>

            {/* Description */}
            <p
              className="text-base sm:text-lg md:text-xl mb-10 text-center max-w-lg transition-all duration-500"
              style={{
                color: 'var(--muted)',
                opacity: leftHovered ? 1 : 0.8,
                transform: leftHovered ? 'translateY(-5px)' : 'translateY(0)'
              }}
            >
              Oyun hesapları, dijital kodlar ve özel içerikler
            </p>

            {/* Call to action button */}
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500"
              style={{
                background: leftHovered ? 'var(--accent)' : 'var(--surface)',
                color: leftHovered ? 'var(--bg)' : 'var(--text)',
                border: `2px solid var(--border)`,
                transform: leftHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
                boxShadow: leftHovered ? '0 20px 60px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <span>Keşfet</span>
              <svg
                className="w-6 h-6 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  transform: leftHovered ? 'translateX(5px)' : 'translateX(0)'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* Floating particles effect */}
            {leftHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-pulse"
                    style={{
                      background: 'var(--accent)',
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      opacity: 0.4,
                      animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Sağ Taraf - Epin Satış */}
        <div
          onClick={() => {
            const shouldRedirect = import.meta.env.VITE_REDIRECT_EPIN_TO_SINGLEPLAYER === 'true'
            navigate(shouldRedirect ? '/tek-oyunculu' : '/epin-satis')
          }}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
          className="flex-1 relative cursor-pointer transition-all duration-700 ease-out min-h-[50vh] md:min-h-0"
          style={{
            flex: rightHovered ? '1.3' : leftHovered ? '0.7' : '1',
            background: 'var(--surface)'
          }}
        >
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
              opacity: rightHovered ? 1 : 0.5
            }}
          />

          {/* Animated grid pattern */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: rightHovered ? '60px 60px' : '40px 40px',
              opacity: rightHovered ? 0.3 : 0.15
            }}
          />

          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 70%)`,
              opacity: rightHovered ? 0.05 : 0
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-12">
            {/* Icon with animation */}
            <div
              className="mb-8 transition-all duration-500"
              style={{
                transform: rightHovered ? 'scale(1.15) rotateY(360deg)' : 'scale(1)',
                color: 'var(--accent)'
              }}
            >
              <div
                className="relative"
                style={{
                  filter: rightHovered ? `drop-shadow(0 0 20px var(--accent))` : 'none'
                }}
              >
                <svg
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              </div>
            </div>

            {/* Main heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-center transition-all duration-500"
              style={{
                color: 'var(--text)',
                transform: rightHovered ? 'translateY(-10px)' : 'translateY(0)',
                letterSpacing: '-0.02em'
              }}
            >
              İlan<br />Pazarı
            </h2>

            {/* Description */}
            <p
              className="text-base sm:text-lg md:text-xl mb-10 text-center max-w-lg transition-all duration-500"
              style={{
                color: 'var(--muted)',
                opacity: rightHovered ? 1 : 0.8,
                transform: rightHovered ? 'translateY(-5px)' : 'translateY(0)'
              }}
            >
              Oyun kredileri, dijital kodlar ve ilan satışları
            </p>

            {/* Call to action button */}
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500"
              style={{
                background: rightHovered ? 'var(--accent)' : 'var(--surface)',
                color: rightHovered ? 'var(--bg)' : 'var(--text)',
                border: `2px solid var(--border)`,
                transform: rightHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
                boxShadow: rightHovered ? '0 20px 60px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <span>Keşfet</span>
              <svg
                className="w-6 h-6 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  transform: rightHovered ? 'translateX(5px)' : 'translateX(0)'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            {/* Floating particles effect */}
            {rightHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-pulse"
                    style={{
                      background: 'var(--accent)',
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 3) * 20}%`,
                      opacity: 0.4,
                      animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* CSS animations for floating particles and entrance effects */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
