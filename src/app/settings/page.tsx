'use client';

import Sidebar from '@/components/Sidebar';
import { MdNotifications } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ProfileResp = {
  user: {
    username: string;
    email: string;
    contact: string | null;
  };
  nominee: {
    name: string | null;
    contact: string | null;
    email: string | null;
  } | null;
};

export default function SettingsPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', contact: '', password: '' });
  const [nomineeForm, setNomineeForm] = useState({ name: '', contact: '', email: '' });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/profile', { cache: 'no-store' })
      .then((r) => (r.status === 401 ? null : r.ok ? r.json() : null))
      .then((d) => {
        if (!active) return;
        if (!d) {
          router.replace('/');
          return;
        }
        setForm({
          username: d.user.username ?? '',
          email: d.user.email ?? '',
          contact: d.user.contact ?? '',
          password: '',
        });
        setNomineeForm({
          name: d.nominee?.name ?? '',
          contact: d.nominee?.contact ?? '',
          email: d.nominee?.email ?? '',
        });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [router]);

  const save = async () => {
    setStatus('Saving…');
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
        contact: form.contact || null,
        password: form.password || undefined,
        nominee: {
          name: nomineeForm.name || null,
          contact: nomineeForm.contact || null,
          email: nomineeForm.email || null,
        },
      }),
    });
    if (res.ok) {
      setStatus('Saved');
      setForm((f) => ({ ...f, password: '' }));
    } else {
      const e = await res.json().catch(() => ({}));
      setStatus(e.error || 'Failed to save');
    }
  };

  const removeNominee = async () => {
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nominee: null }),
    });
    if (res.ok) {
      setNomineeForm({ name: '', contact: '', email: '' });
      setStatus('Nominee removed');
    }
  };

  return (
    <div className="mp-root">
      <style>{`
        .mp-root {
          display: flex;
          min-height: 100vh;
          overflow: hidden;
          background-color: #F5F4F4;
          font-family: 'Josefin Sans', sans-serif;
        }

        .mp-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .mp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 32px 8px;
          flex-shrink: 0;
        }
        .mp-breadcrumb {
          font-weight: 400;
          font-size: 24px;
          line-height: 24px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .mp-breadcrumb a { color: #5F5C5C; text-decoration: none; }
        .mp-actions { display: flex; align-items: center; gap: 12px; }
        .mp-icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background-color: #FFFFFF;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          cursor: pointer; position: relative; flex-shrink: 0;
        }
        .mp-badge {
          position: absolute; top: -2px; right: -2px;
          width: 12px; height: 12px; border-radius: 50%;
          background-color: #FE7A42;
        }
        .mp-logout { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .mp-logout span {
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 400; font-size: 12px; line-height: 12px; color: #000000;
        }

        .mp-divider {
          height: 0; border-top: 1px solid #B8B4B4;
          flex-shrink: 0; margin: 0 32px;
        }

        .mp-card {
          margin: 16px 32px 0;
          background: rgba(255,255,255,0.5);
          border-radius: 15px;
          box-shadow: 1px 1px 9px 2px rgba(182,182,182,0.25);
          padding: 32px 40px;
          flex-shrink: 0;
        }

        .mp-section-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700; font-size: 20px; line-height: 24px;
          color: #000000; margin: 0 0 24px;
        }

        .mp-account-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 200px;
          gap: 32px;
          align-items: start;
        }

        .mp-fields {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px 40px;
        }

        .mp-field {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .mp-field > label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400; font-size: 15px; line-height: 18px;
          color: #000000; width: 82px; flex-shrink: 0;
        }
        .mp-box {
          flex: 1;
          min-width: 0;
          height: 53px;
          border-radius: 11px;
          box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          padding: 0 16px;
          background-color: #FFFFFF;
          position: relative;
        }
        .mp-box span {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400; font-size: 12px; line-height: 15px;
          color: #848484;
        }
        .mp-box input {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400; font-size: 13px; line-height: 16px;
          color: #1C1C1C; width: 100%; border: none; background: transparent;
          outline: none; padding: 0;
        }
        .mp-status { font-size: 12px; color: #1C488C; margin-left: auto; }
        .mp-box .mp-masked {
          letter-spacing: 2px; color: #5C5B5B;
        }
        .mp-eye {
          position: absolute; right: 12px; background: none; border: none;
          cursor: pointer; display: flex; align-items: center; padding: 0;
        }
        .mp-action {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400; font-size: 12px; line-height: 15px;
          color: #FE7A42; cursor: pointer; text-decoration: underline;
          flex-shrink: 0;
        }
        .mp-span-2 { grid-column: 1 / -1; }
        .mp-save-btn {
          background: #F28B60; color: #FFFFFF;
          border: none; border-radius: 35px;
          padding: 10px 32px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700; font-size: 15px; line-height: 18px;
          cursor: pointer;
        }
        .mp-remove {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400; font-size: 10px; line-height: 12px;
          color: #FF6421; text-decoration: underline; cursor: pointer;
        }

        .mp-pic {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .mp-pic-img {
          width: 160px; height: 160px;
          border-radius: 11px;
          background-color: #D9D9D9;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .mp-pic-link {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600; font-size: 12px; line-height: 15px;
          color: #5C5B5B; text-decoration: underline; cursor: pointer;
        }

        .mp-hr {
          height: 0; border-top: 1px solid #B8B4B4; margin: 28px 0;
        }

        .mp-footer-img {
          width: 100%;
          min-height: 100px;
          background-image: url(/cityscape.png);
          background-repeat: no-repeat;
          background-position: bottom center;
          background-size: contain;
          opacity: 0.15;
          pointer-events: none;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .mp-account-top { grid-template-columns: minmax(0, 1fr) 180px; gap: 28px; }
        }

        @media (max-width: 900px) {
          .mp-account-top { grid-template-columns: 1fr; }
          .mp-pic { align-items: flex-start; }
          .mp-fields { grid-template-columns: 1fr; gap: 16px; }
        }

        @media (max-width: 600px) {
          .mp-header { padding: 14px 16px 6px; }
          .mp-breadcrumb { font-size: 18px; line-height: 22px; }
          .mp-divider { margin: 0 16px; }
          .mp-card { margin: 16px 16px 0; padding: 20px; }
          .mp-main { padding-bottom: 24px; }
          .mp-field { flex-wrap: wrap; }
          .mp-field > label { width: 100%; }
        }
      `}</style>

      <Sidebar firstName="Ali" lastName="Ahmed Khan" />

      <div className="mp-main">
        {/* Header */}
        <div className="mp-header">
          <div className="mp-breadcrumb">
            <Link href="/dashboard">Dashboard</Link>
            &nbsp;&gt;&nbsp;
            Settings
          </div>
          <div className="mp-actions">
            <div className="mp-icon-btn">
              <MdNotifications size={18} color="#1C488C" />
              <div className="mp-badge" />
            </div>
            <div className="mp-logout">
              <BiLogOut size={18} color="#1C488C" />
              <span>Log Out</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mp-divider" />

        {/* Main Card */}
        <div className="mp-card">
          {/* Account Settings */}
          <h2 className="mp-section-title">Account Settings</h2>

          <div className="mp-account-top">
            <div className="mp-fields">
              {/* Username */}
              <div className="mp-field">
                <label>Username:</label>
                <div className="mp-box">
                  <input
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mp-field">
                <label>Password:</label>
                <div className="mp-box">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="mp-eye"
                    type="button"
                  >
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path d="M9 0C4.5 0 0.73 3.11 0 7c0.73 3.89 4.5 7 9 7s8.27-3.11 9-7c-0.73-3.89-4.5-7-9-7z" stroke="#C7C2C2" strokeWidth="1.5" fill="none" />
                      <circle cx="9" cy="7" r="2.5" stroke="#C7C2C2" strokeWidth="1.5" fill="none" />
                    </svg>
                  </button>
                </div>
                <span className="mp-action">Change</span>
              </div>

              {/* Email */}
              <div className="mp-field">
                <label>Email:</label>
                <div className="mp-box">
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <span className="mp-action">Add New</span>
              </div>

              {/* Contact */}
              <div className="mp-field">
                <label>Contact #:</label>
                <div className="mp-box">
                  <input
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  />
                </div>
                <span className="mp-action">Update</span>
              </div>

              {/* Save Changes Button */}
              <div className="mp-span-2">
                <button className="mp-save-btn" type="button" onClick={save}>
                  Save Changes
                </button>
                {status && <span className="mp-status">{status}</span>}
              </div>
            </div>

            {/* Profile Picture */}
            <div className="mp-pic">
              <div className="mp-pic-img">
                <FaUserTie size={80} color="#FFFFFF" />
              </div>
              <span className="mp-pic-link">Change Profile Picture</span>
            </div>
          </div>

          {/* Divider */}
          <div className="mp-hr" />

          {/* Nominee Setting */}
          <h2 className="mp-section-title">Nominee Setting</h2>

          <div className="mp-fields">
            {/* Nominee */}
            <div className="mp-field">
              <label>Nominee:</label>
              <div className="mp-box">
                <input
                  value={nomineeForm.name}
                  onChange={(e) => setNomineeForm({ ...nomineeForm, name: e.target.value })}
                />
              </div>
              <span className="mp-action">Edit</span>
            </div>

            {/* Contact */}
            <div className="mp-field">
              <label>Contact:</label>
              <div className="mp-box">
                <input
                  value={nomineeForm.contact}
                  onChange={(e) => setNomineeForm({ ...nomineeForm, contact: e.target.value })}
                />
              </div>
              <span className="mp-action">Change</span>
            </div>

            {/* Email */}
            <div className="mp-field">
              <label>Email:</label>
              <div className="mp-box">
                <input
                  value={nomineeForm.email}
                  onChange={(e) => setNomineeForm({ ...nomineeForm, email: e.target.value })}
                />
              </div>
              <span className="mp-action">Update</span>
            </div>

            {/* Remove this nominee */}
            <div className="mp-span-2">
              <span className="mp-remove" role="button" onClick={removeNominee}>
                Remove this nominee
              </span>
            </div>
          </div>
        </div>

        {/* Footer Illustration */}
        <div className="mp-footer-img" />
      </div>
    </div>
  );
}
