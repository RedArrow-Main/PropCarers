import Image from "next/image";

export default function ForgotPassword() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden relative" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Left Side - House Illustration - HIDDEN ON MOBILE/TABLET */}
      <div 
        className="hidden lg:flex relative flex-col items-center justify-center h-full" 
        style={{ 
          width: '450px',
          backgroundColor: '#F5F5F7',
          borderTopRightRadius: '113px',
          borderBottomRightRadius: '113px',
          boxShadow: '0px 1px 15px 14px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Decorative Circles - FIXED POSITIONS */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '200px',
            height: '200px',
            top: '-35px',
            left: '-72px',
            backgroundColor: 'var(--propcarers-orange)',
            opacity: 1,
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            width: '150px',
            height: '150px',
            top: '-30px',
            left: '50px',
            backgroundColor: 'var(--propcarers-blue)',
            opacity: 1,
          }}
        />

        {/* Logo - FIXED POSITION */}
        <div 
          className="absolute" 
          style={{ 
            top: '200px',
            left: '60px',
            width: '300px',
            height: '50px',
            opacity: 3,
          }}
        >
          <Image 
            src="/logo.png"
            alt="PropCarers Logo"
            width={386}
            height={62}
            priority
          />
        </div>

        {/* House Illustration - FIXED POSITION */}
        <div 
          className="absolute" 
          style={{ 
            top: '220px',
            left: '1px',
            width: '450px',
            height: '490px',
            opacity: 1,
          }}
        >
          <Image 
            src="/house-hand.png"
            alt="House in hand illustration"
            width={450}
            height={450}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* Curved White Divider */}
      
      {/* Right Side - Forgot Password Form - RESPONSIVE */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 relative z-10" style={{  }}>
        <div className="flex flex-col items-center w-full">
          {/* Title - RESPONSIVE */}
          <h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-6 sm:mb-8 text-center"
            style={{ 
              color: '#686868',
              fontWeight: 500,
              fontFamily: 'var(--font-josefin-sans)',
            }}
          >
            Forgot Password?
          </h1>

          {/* Illustration - RESPONSIVE */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 relative">
              <Image 
                src="/forgot-password-icon.png"
                alt="Forgot Password"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Description Text - RESPONSIVE */}
          <p 
            className="text-center text-xs sm:text-sm mb-6 sm:mb-8 px-4"
            style={{ color: 'var(--text-gray)' }}
          >
            Please enter your Registered Email Address<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>to receive verification code
          </p>

          {/* Email Input - CENTER JUSTIFIED - RESPONSIVE */}
          <div className="flex justify-center w-full mb-6 sm:mb-8">
            <input
              type="email"
              placeholder="sample@gmail.com"
              className="px-4 sm:px-5 text-xs sm:text-sm lg:text-sm xl:text-base focus:outline-none focus:ring-2 focus:ring-orange-200 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[400px] xl:max-w-[450px] 2xl:max-w-[470px]"
              style={{
                height: '45px',
                border: '1px solid #D0D0D0',
                borderRadius: '8px',
                fontFamily: 'var(--font-josefin-sans)',
                color: 'var(--text-gray)',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>

          {/* Send Code Button - CENTER JUSTIFIED - RESPONSIVE */}
          <div className="flex justify-center w-full">
            <button
              className="text-white font-semibold hover:opacity-90 transition-opacity w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[240px] xl:max-w-[260px] 2xl:max-w-[275px] text-sm lg:text-sm xl:text-base"
              style={{
                height: '45px',
                backgroundColor: 'var(--propcarers-orange)',
                fontFamily: 'var(--font-josefin-sans)',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
