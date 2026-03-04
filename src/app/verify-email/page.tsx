import Image from "next/image";

export default function VerifyEmail() {
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

      {/* Right Side - Verify Email Form - CENTER JUSTIFIED */}
      <div className="flex-1 flex items-center justify-center relative z-10" style={{  }}>
        <div className="flex flex-col items-center w-full">
          {/* Title - CENTER JUSTIFIED */}
          <h1 
            style={{
              marginBottom: '32px',
              textAlign: 'center',
              fontFamily: 'var(--font-josefin-sans)',
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#686868',
              opacity: 1,
            }}
          >
            Verify Your Email
          </h1>

        {/* Email Verification Icon - CENTER JUSTIFIED */}
        <div 
          className="flex justify-center mb-8"
          style={{
            opacity: 1,
          }}
        >
          <Image 
            src="/verify-email-icon.png"
            alt="Verify Email"
            width={110}
            height={150}
            priority
          />
        </div>

          {/* Description Text - CENTER JUSTIFIED */}
          <p 
            className="text-center mb-8"
            style={{
              maxWidth: '410px',
              fontFamily: 'var(--font-josefin-sans)',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '130%',
              letterSpacing: '0%',
              color: '#686868',
              opacity: 1,
            }}
          >
            Please enter the 6 digit code sent to sample@gmail.com
          </p>

          {/* 6-Digit Code Input Boxes - CENTER JUSTIFIED */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="text-center focus:outline-none focus:ring-2 focus:ring-orange-200"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '5px',
                  border: '1px solid #B6B6B6',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'var(--font-josefin-sans)',
                  fontSize: '24px',
                  color: '#686868',
                }}
              />
            ))}
          </div>

          {/* Verify Code Button - CENTER JUSTIFIED */}
          <div className="flex justify-center w-full mb-4">
            <a href="/new-password" className="w-full max-w-[373px]">
              <button
                className="text-white font-semibold hover:opacity-90 transition-opacity w-full"
                style={{
                  height: '47px',
                  borderRadius: '17px',
                  backgroundColor: '#F4A07C',
                  fontFamily: 'var(--font-josefin-sans)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Verify Code
              </button>
            </a>
          </div>

          {/* Resend Code Timer - CENTER JUSTIFIED */}
          <p 
            className="text-sm text-center"
            style={{ 
              color: '#686868',
              fontFamily: 'var(--font-josefin-sans)',
            }}
          >
            Resend Code in <span style={{ color: 'var(--propcarers-orange)' }}>00:10</span>
          </p>
        </div>
      </div>
    </div>
  )
}
