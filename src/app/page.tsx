import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-cream)' }}>
      {/* Decorative Circles - RESPONSIVE WITH FIXED POSITIONS */}
      <div 
        className="absolute rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44"
        style={{
          top: '-20px',
          left: '-50px',
          backgroundColor: 'var(--propcarers-orange)',
        }}
      />
      <div 
        className="absolute rounded-full w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36"
        style={{
          top: '-10px',
          left: '30px',
          backgroundColor: 'var(--propcarers-blue)',
        }}
      />

      {/* Main Content - RESPONSIVE */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 sm:px-8 md:px-12 lg:px-16 pb-32">
        {/* Welcome To Text - RESPONSIVE */}
        <h1 
          className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-center"
          style={{
            fontWeight: 400,
            color: 'var(--text-gray)',
            fontFamily: 'var(--font-josefin-sans)',
          }}
        >
          Welcome To
        </h1>

        {/* Logo - RESPONSIVE */}
        <div className="mb-8 sm:mb-10 flex justify-center">
          <Image 
            src="/logo.png"
            alt="PropCarers Logo"
            width={460}
            height={75}
            className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto"
            priority
          />
        </div>

        {/* Login Form */}
        <div className="flex flex-col items-center w-full max-w-md px-4">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 mb-4"
            style={{
              maxWidth: '350px',
              border: '1px solid #D0D0D0',
              borderRadius: '4px',
              fontFamily: 'var(--font-josefin-sans)',
              color: 'var(--text-gray)',
              backgroundColor: '#FFFFFF',
            }}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 mb-3"
            style={{
              maxWidth: '350px',
              border: '1px solid #D0D0D0',
              borderRadius: '4px',
              fontFamily: 'var(--font-josefin-sans)',
              color: 'var(--text-gray)',
              backgroundColor: '#FFFFFF',
            }}
          />

          {/* Forgot Password Link - RESPONSIVE */}
          <p className="text-xs sm:text-sm mb-6 text-center" style={{ color: 'var(--text-gray)' }}>
            Forgot username or password?{' '}
            <a href="/forgot-password" className="hover:underline" style={{ color: 'var(--propcarers-orange)', fontWeight: 500 }}>
              Click Here
            </a>
          </p>

          {/* Sign In Button - RESPONSIVE */}
          <button
            className="text-white font-semibold hover:opacity-90 transition-opacity mb-3 w-32 sm:w-36 md:w-40"
            style={{
              height: '40px',
              backgroundColor: 'var(--propcarers-orange)',
              fontFamily: 'var(--font-josefin-sans)',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Sign In
          </button>

          {/* Registration Link - RESPONSIVE */}
          <p className="text-xs sm:text-sm text-center" style={{ color: 'var(--text-gray)' }}>
            <a href="/register" className="hover:underline" style={{ color: 'var(--propcarers-orange)', fontWeight: 500 }}>
              Click Here
            </a>{' '}
            for New User Registration
          </p>
        </div>
      </div>

      {/* City Skyline Illustration - RESPONSIVE */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none h-32 sm:h-40 md:h-48 lg:h-60"
        style={{
          backgroundImage: 'url(/cityscape.png)',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          opacity: 0.15,
        }}
      />
    </div>
  )
}
