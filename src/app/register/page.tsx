"use client";

import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");
  
  // Country codes mapping
  const countryCodes: { [key: string]: string } = {
    "US": "+1",
    "PK": "+92",
    "GB": "+44",
    "IN": "+91",
    "PS": "+970",
    // Add more as needed
  };

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

      {/* Right Side - Registration Form - FULLY RESPONSIVE */}
      <div className="flex-1 flex items-center justify-center h-screen overflow-y-auto px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px]">
          {/* Title */}
          <h1 
            className="text-center"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '800',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              lineHeight: '100%',
              color: '#2356A6',
              marginBottom: 'clamp(10px, 1.5vh, 14px)',
            }}
          >
            Create New Account
          </h1>

          {/* First Name & Last Name - SIDE BY SIDE */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex-1">
              <label 
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '3px',
                }}
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{
                  height: 'clamp(35px, 4.5vh, 45px)',
                  borderRadius: '11px',
                  border: '1px solid #D1D1D1',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '12px',
                  color: '#5A5A5A',
                }}
              />
            </div>

            <div className="flex-1">
              <label 
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 7000,
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '3px',
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{
                  height: 'clamp(35px, 4.5vh, 45px)',
                  borderRadius: '11px',
                  border: '1px solid #D1D1D1',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '12px',
                  color: '#5A5A5A',
                }}
              />
            </div>
          </div>

          {/* Email Address - RESPONSIVE */}
          <div className="mb-3">
            <label 
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                color: '#000000',
                display: 'block',
                marginBottom: '3px',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{
                height: 'clamp(35px, 4.5vh, 45px)',
                borderRadius: '11px',
                border: '1px solid #D1D1D1',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '12px',
                color: '#5A5A5A',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            />
          </div>

          {/* Country & Date of Birth - SIDE BY SIDE */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex-1">
              <label 
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '3px',
                }}
              >
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{
                  height: 'clamp(35px, 4.5vh, 45px)',
                  borderRadius: '11px',
                  border: '1px solid #D1D1D1',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '12px',
                  color: '#5A5A5A',
                }}
              >
                <option value="">Select current country</option>
                <option value="US">🇺🇸 United States</option>
                <option value="PK">🇵🇰 Pakistan</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="IN">🇮🇳 India</option>
                <option value="PS">🇵🇸 Palestine</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="AU">🇦🇺 Australia</option>
              </select>
            </div>

            <div className="flex-1">
              <label 
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '3px',
                }}
              >
                Date Of Birth
              </label>
              <input
                type="date"
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{
                  height: 'clamp(35px, 4.5vh, 45px)',
                  borderRadius: '11px',
                  border: '1px solid #D1D1D1',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '12px',
                  color: '#5A5A5A',
                }}
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="mb-3">
            <label 
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                color: '#000000',
                display: 'block',
                marginBottom: '3px',
              }}
            >
              Contact Number
            </label>
            <input
              type="tel"
              placeholder="Enter contact number"
              className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{
                height: 'clamp(35px, 4.5vh, 45px)',
                borderRadius: '11px',
                border: '1px solid #D1D1D1',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Josefin Sans, sans-serif',
                fontSize: '12px',
                color: '#5A5A5A',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>

          {/* Password - RESPONSIVE */}
          <div className="mb-3">
            <label 
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                color: '#000000',
                display: 'block',
                marginBottom: '3px',
              }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{
                  height: 'clamp(35px, 4.5vh, 45px)',
                  borderRadius: '11px',
                  border: '1px solid #D1D1D1',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '12px',
                  color: '#5A5A5A',
                  paddingRight: '50px',
                }}
              />
              <span 
                className="absolute cursor-pointer select-none"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '12px',
                  color: '#C7C2C2',
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Confirm Password - RESPONSIVE */}
          <div className="mb-3">
            <label 
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                color: '#000000',
                display: 'block',
                marginBottom: '3px',
              }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-Enter password"
                className="w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{
                  height: 'clamp(35px, 4.5vh, 45px)',
                  borderRadius: '11px',
                  border: '1px solid #D1D1D1',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  fontFamily: 'Josefin Sans, sans-serif',
                  fontSize: '12px',
                  color: '#5A5A5A',
                  paddingRight: '50px',
                }}
              />
              <span 
                className="absolute cursor-pointer select-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '12px',
                  color: '#C7C2C2',
                }}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Terms & Conditions Checkbox - RESPONSIVE */}
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="terms"
              className="mr-3"
              style={{
                width: '21.875px',
                height: '21.875px',
                accentColor: '#2356A6',
              }}
            />
            <label 
              htmlFor="terms"
              style={{
                fontFamily: 'Josefin Sans, sans-serif',
                fontWeight: 300,
                fontSize: '12px',
                color: '#000000',
              }}
            >
              I agree to all{' '}
              <a 
                href="#" 
                style={{
                  textDecoration: 'underline',
                  fontWeight: 400,
                }}
              >
                Term & Conditions
              </a>
            </label>
          </div>

          {/* Create Account Button - RESPONSIVE */}
          <button
            className="w-full text-white font-semibold hover:opacity-90 transition-opacity mb-2"
            style={{
              height: 'clamp(34px, 4vh, 40px)',
              borderRadius: '20px',
              backgroundColor: '#2356A6',
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Create Account
          </button>

          {/* Already have account */}
          <p 
            className="text-center"
            style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              color: '#000000',
            }}
          >
            Already have an account?{' '}
            <a 
              href="/" 
              style={{
                textDecoration: 'underline',
                color: '#000000',
              }}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}




