"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("PK");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.contact) {
      setError("Please fill in all required fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!terms) {
      setError("Please accept the Terms & Conditions");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          country: selectedCountry,
          dob: form.dob,
          contact: form.contact,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const inputStyle = (extra = "") =>
    `w-full px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${extra}`;

  const box = (extra = "") => ({
    height: 'clamp(35px, 4.5vh, 45px)',
    borderRadius: '11px',
    border: '1px solid #D1D1D1',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Josefin Sans, sans-serif',
    fontSize: '12px',
    color: '#5A5A5A',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    ...(extra ? JSON.parse(extra) : {}),
  });

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
        <div className="absolute rounded-full" style={{ width: '200px', height: '200px', top: '-35px', left: '-72px', backgroundColor: 'var(--propcarers-orange)' }} />
        <div className="absolute rounded-full" style={{ width: '150px', height: '150px', top: '-30px', left: '50px', backgroundColor: 'var(--propcarers-blue)' }} />
        <div className="absolute" style={{ top: '200px', left: '60px', width: '300px', height: '50px' }}>
          <Image src="/logo.png" alt="PropCarers Logo" width={386} height={62} priority />
        </div>
        <div className="absolute" style={{ top: '220px', left: '1px', width: '450px', height: '490px' }}>
          <Image src="/house-hand.png" alt="House in hand illustration" width={450} height={450} style={{ width: '100%', height: '100%', objectFit: 'contain' }} priority />
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center h-screen overflow-y-auto px-4 sm:px-6 md:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <form onSubmit={handleSubmit} className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px]">
          <h1 className="text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: '100%', color: '#2356A6', marginBottom: 'clamp(10px, 1.5vh, 14px)' }}>
            Create New Account
          </h1>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex-1">
              <label style={labelStyle}>First Name</label>
              <input type="text" placeholder="Enter first name" value={form.firstName} onChange={set("firstName")} className={inputStyle()} style={box()} />
            </div>
            <div className="flex-1">
              <label style={labelStyle}>Last Name</label>
              <input type="text" placeholder="Enter last name" value={form.lastName} onChange={set("lastName")} className={inputStyle()} style={box()} />
            </div>
          </div>

          <div className="mb-3">
            <label style={labelStyle}>Email Address</label>
            <input type="email" placeholder="Enter Email Address" value={form.email} onChange={set("email")} className={inputStyle()} style={box()} />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex-1">
              <label style={labelStyle}>Country</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className={inputStyle()} style={box()}>
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
              <label style={labelStyle}>Date Of Birth</label>
              <input type="date" max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} value={form.dob} onChange={set("dob")} className={inputStyle()} style={box()} />
            </div>
          </div>

          <div className="mb-3">
            <label style={labelStyle}>Contact Number</label>
            <input type="tel" placeholder="Enter contact number" value={form.contact} onChange={set("contact")} className={inputStyle()} style={box('{"boxShadow":"0px 2px 4px rgba(0,0,0,0.1)"}')} />
          </div>

          <div className="mb-3">
            <label style={labelStyle}>Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={form.password} onChange={set("password")} className={inputStyle()} style={{ ...box(), paddingRight: '50px' }} />
              <span className="absolute cursor-pointer select-none" onClick={() => setShowPassword(!showPassword)} style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#C7C2C2' }}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label style={labelStyle}>Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Re-Enter password" value={form.confirmPassword} onChange={set("confirmPassword")} className={inputStyle()} style={{ ...box(), paddingRight: '50px' }} />
              <span className="absolute cursor-pointer select-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#C7C2C2' }}>
                {showConfirmPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mr-3" style={{ width: '21.875px', height: '21.875px', accentColor: '#2356A6' }} />
            <label htmlFor="terms" style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 300, fontSize: '12px', color: '#000000' }}>
              I agree to all{' '}
              <a href="#" style={{ textDecoration: 'underline', fontWeight: 400 }}>Term & Conditions</a>
            </label>
          </div>

          {error && (
            <p className="text-center mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 500, fontSize: '12px', color: '#D32F2F' }}>{error}</p>
          )}

          <button type="submit" disabled={busy} className="w-full text-white font-semibold hover:opacity-90 transition-opacity mb-2 disabled:opacity-60" style={{ height: 'clamp(34px, 4vh, 40px)', borderRadius: '20px', backgroundColor: '#2356A6', fontFamily: 'Josefin Sans, sans-serif', fontSize: '16px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            {busy ? 'Creating…' : 'Create Account'}
          </button>

          <p className="text-center" style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 500, fontSize: '12px', color: '#000000' }}>
            Already have an account?{' '}
            <a href="/" style={{ textDecoration: 'underline', color: '#000000' }}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: 'clamp(11px, 1.2vw, 13px)',
  color: '#000000',
  display: 'block',
  marginBottom: '3px',
};
