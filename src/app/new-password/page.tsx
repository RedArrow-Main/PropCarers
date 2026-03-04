"use client";

import Image from "next/image";
import { useState } from "react";

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
      {/* Right Side - New Password Form - CENTER JUSTIFIED */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 relative z-10" style={{  }}>
        <div className="flex flex-col items-center w-full">
          
          {/* Title - CENTER JUSTIFIED */}
          <h1 
            style={{
              marginBottom: '24px',
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
            Enter New Password
          </h1>

          {/* Password Lock Icon - CENTER JUSTIFIED */}
          <div 
            className="flex justify-center mb-8"
            style={{
              opacity: 1,
            }}
          >
            <Image 
              src="/password-lock-icon.png"
              alt="Password Lock"
              width={140}
              height={140}
              priority
            />
          </div>

          {/* Description Text - CENTER JUSTIFIED */}
          <p 
            className="text-center mb-8"
            style={{
              maxWidth: '387px',
              fontFamily: 'var(--font-josefin-sans)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '130%',
              letterSpacing: '0%',
              color: '#686868',
              opacity: 1,
            }}
          >
            You are verified now. Please create your new password
          </p>

          {/* New Password Label - LEFT ALIGNED */}
          <div className="w-full max-w-[350px] mb-1">
            <label 
              style={{
                fontFamily: 'var(--font-josefin-sans)',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#686868',
                opacity: 1,
              }}
            >
              New Password
            </label>
          </div>

          {/* New Password Input Field - CENTER JUSTIFIED */}
          <div className="flex justify-center w-full mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="px-5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              style={{
                width: '350px',
                height: '44px',
                borderRadius: '5px',
                border: '1px solid #B6B6B6',
                backgroundColor: '#FFFFFF',
                fontFamily: 'var(--font-josefin-sans)',
                color: '#686868',
              }}
            />
            {/* Eye Icon for New Password - CLICKABLE */}
            <button 
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
              style={{
                width: '55px',
                height: '26px',
                marginRight: 'calc((100% - 387px) / 2 + 10px)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm New Password Label - LEFT ALIGNED */}
          <div className="w-full max-w-[350px] mb-1">
            <label 
              style={{
                fontFamily: 'var(--font-josefin-sans)',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#686868',
                opacity: 1,
              }}
            >
              Confirm New Password
            </label>
          </div>

          {/* Confirm Password Input Field - CENTER JUSTIFIED */}
          <div className="flex justify-center w-full mb-8 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="px-5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
              style={{
                width: '350px',
                height: '45px',
                borderRadius: '5px',
                border: '1px solid #B6B6B6',
                backgroundColor: '#FFFFFF',
                fontFamily: 'var(--font-josefin-sans)',
                color: '#686868',
              }}
            />
            {/* Eye Icon for Confirm Password - CLICKABLE */}
            <button 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
              style={{
                width: '55px',
                height: '26px',
                marginRight: 'calc((100% - 387px) / 2 + 10px)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit Button - CENTER JUSTIFIED */}
          <div className="flex justify-center w-full">
            <button
              className="text-white font-semibold hover:opacity-90 transition-opacity"
              style={{
                width: '350px',
                height: '49px',
                borderRadius: '17px',
                backgroundColor: '#F4A07C',
                fontFamily: 'var(--font-josefin-sans)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
