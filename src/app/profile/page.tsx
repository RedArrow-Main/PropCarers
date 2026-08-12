'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { MdNotifications, MdAdd, MdAccountBalance, MdLocationCity } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { FaUserTie, FaHome, FaBuilding, FaCity, FaHandshake, FaMapMarkedAlt, FaIdCard, FaPhone, FaEnvelope, FaUser, FaMapMarkerAlt, FaIdBadge } from 'react-icons/fa';
import Link from 'next/link';

const propertyCategories = [
  { name: 'Residential', count: 4, Icon: FaHome },
  { name: 'Commercial', count: 1, Icon: FaBuilding },
  { name: 'Apartment', count: 3, Icon: FaCity },
  { name: 'Co-Space', count: 0, Icon: FaHandshake },
  { name: 'Land', count: 0, Icon: FaMapMarkedAlt },
];

const nomineeFields = [
  { label: "Name", value: "Farhan Khan", icon: FaUser },
  { label: "Father's Name", value: "Imran Khan", icon: FaUser },
  { label: "Relation", value: "Son", icon: FaIdBadge },
  { label: "Nationality", value: "Pakistani", icon: FaIdCard },
  { label: "ID Card #", value: "42101-1234567-8", icon: FaIdCard },
  { label: "Contact #", value: "+923211234567", icon: FaPhone },
];

const bankAccounts = [
  {
    title: 'Bank Account 1',
    fields: [
      { label: 'Bank', value: 'HBL' },
      { label: 'Branch Code', value: '0123' },
      { label: 'Account Number', value: '1234-5678-9012' },
      { label: 'IBAN', value: 'PK00 HABB 000123 456789 0123' },
    ],
    status: 'Active' as const,
  },
  {
    title: 'Bank Account 2',
    fields: [
      { label: 'Bank', value: 'MCB' },
      { label: 'Branch Code', value: '0456' },
      { label: 'Account Number', value: '9876-5432-1098' },
      { label: 'IBAN', value: 'PK00 MUCB 000456 789012 3456' },
    ],
    status: 'Active' as const,
  },
];

type ProfileResp = {
  user: {
    firstName: string | null;
    lastName: string | null;
    username: string;
    email: string;
    contact: string | null;
    cnic: string | null;
    address: string | null;
    createdAt: string;
  };
  nominee: {
    name: string | null;
    fatherName: string | null;
    relation: string | null;
    nationality: string | null;
    cnic: string | null;
    contact: string | null;
  } | null;
  bankAccounts: {
    bankName: string | null;
    branchCode: string | null;
    accountNumber: string | null;
    iban: string | null;
    isActive: boolean;
  }[];
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResp | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/profile', { cache: 'no-store' })
      .then((r) => {
        if (r.status === 401) {
          router.replace('/');
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((d) => {
        if (!active) return;
        if (d) setProfile(d);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  const u = profile?.user;
  const name = (u ? [u.firstName, u.lastName].filter(Boolean).join(' ') : '') || 'Ali Ahmed Khan';
  const username = u?.username ? `@${u.username}` : '@Alikhan23';
  const email = u?.email || 'Alikhan23@gmail.com';
  const contact = u?.contact || '+923211234567';
  const cnic = u?.cnic || '42101-1234567-8';
  const address = u?.address || 'House 12, Street 5, Islamabad';
  const memberSince = u?.createdAt
    ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Jan 2023';

  const nomineeFieldsData = profile?.nominee
    ? [
        { label: "Name", value: profile.nominee.name ?? '-', icon: FaUser },
        { label: "Father's Name", value: profile.nominee.fatherName ?? '-', icon: FaUser },
        { label: 'Relation', value: profile.nominee.relation ?? '-', icon: FaIdBadge },
        { label: 'Nationality', value: profile.nominee.nationality ?? '-', icon: FaIdCard },
        { label: 'ID Card #', value: profile.nominee.cnic ?? '-', icon: FaIdCard },
        { label: 'Contact #', value: profile.nominee.contact ?? '-', icon: FaPhone },
      ]
    : nomineeFields;

  const bankAccountsData = profile?.bankAccounts?.length
    ? profile.bankAccounts.map((a) => ({
        title: a.bankName || 'Bank Account',
        fields: [
          { label: 'Bank', value: a.bankName ?? '-' },
          { label: 'Branch Code', value: a.branchCode ?? '-' },
          { label: 'Account Number', value: a.accountNumber ?? '-' },
          { label: 'IBAN', value: a.iban ?? '-' },
        ],
        status: a.isActive ? ('Active' as const) : ('Inactive' as const),
      }))
    : bankAccounts;

  if (loading) {
    return (
      <div className="mp-root">
        <Sidebar />
        <div className="mp-main">
          <div style={{ padding: 40, color: '#888' }}>Loading profile…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mp-root">
      <style>{`
        .mp-root {
          display: flex;
          min-height: 100vh;
          background-color: #F5F4F4;
          font-family: 'Josefin Sans', sans-serif;
        }

        .mp-main {
          flex: 1;
          min-width: 0;
          width: 100%;
          max-width: none;
          padding: 0 24px 32px;
          position: relative;
          overflow-x: hidden;
        }

        /* Subtle skyline behind content */
        .mp-bg {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 150px;
          background-image: url(/cityscape.png);
          background-repeat: no-repeat;
          background-position: bottom center;
          background-size: contain;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
        }

        .mp-content { position: relative; z-index: 1; }

        .mp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 58px;
          border-bottom: 1px solid #B8B4B4;
          flex-shrink: 0;
        }
        .mp-breadcrumb {
          font-weight: 400;
          font-size: 20px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .mp-breadcrumb a { color: #5F5C5C; text-decoration: none; }
        .mp-breadcrumb a:hover { color: #2356A6; }
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
          width: 11px; height: 11px; border-radius: 50%;
          background-color: #FE7A42; border: 2px solid #F0F0F0;
        }
        .mp-logout { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .mp-logout span {
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 400; font-size: 12px; color: #000000;
        }

        .mp-top {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 16px;
          align-items: start;
          margin-top: 18px;
        }

        /* Profile card */
        .mp-profile {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          align-self: start;
        }
        .mp-avatar {
          width: 72px; height: 72px; border-radius: 50%;
          background: #1C488C;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
        }
        .mp-name {
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 700; font-size: 18px; color: #1C488C;
          text-align: center;
        }
        .mp-username {
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 400; font-size: 12px; color: #848484;
          text-align: center; margin-top: 2px;
        }
        .mp-divider {
          height: 1px; background: #ECECEC; margin: 16px 0;
        }
        .mp-info-row {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 0;
        }
        .mp-info-icon {
          width: 28px; height: 28px; border-radius: 8px;
          background: #FFF3EE; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .mp-info-text { display: flex; flex-direction: column; min-width: 0; }
        .mp-info-label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500; font-size: 10px; color: #939393;
          line-height: 14px;
        }
        .mp-info-value {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600; font-size: 13px; color: #1A1A1A;
          line-height: 16px; word-break: break-word;
        }

        /* Right column */
        .mp-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          min-width: 0;
        }

        .mp-section-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 18px; color: #1A1A1A;
          margin: 0 0 14px;
        }

        .mp-reg-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }
        .mp-reg-card {
          background: #2255A6;
          border-radius: 12px;
          padding: 18px 12px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          min-height: 110px; justify-content: center;
        }
        .mp-reg-icon { font-size: 26px; color: #F28B60; }
        .mp-reg-name {
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 400; font-size: 14px; color: #FFFFFF; text-align: center;
        }
        .mp-reg-count {
          font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 28px; color: #FFFFFF; line-height: 1;
        }

        .mp-nominee {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        .mp-nominee-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px 24px;
        }
        .mp-field { display: flex; flex-direction: column; gap: 6px; }
        .mp-field.full { grid-column: 1 / -1; }
        .mp-field label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500; font-size: 11px; color: #5F5C5C;
        }
        .mp-input {
          height: 36px; border-radius: 8px;
          border: 1px solid #E2E2E2; background: #FCFCFC;
          padding: 0 14px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500; font-size: 13px; color: #1A1A1A;
          display: flex; align-items: center;
        }

        /* Bank accounts */
        .mp-banks {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 18px;
          margin-bottom: 20px;
        }
        .mp-bank {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          display: flex; flex-direction: column; gap: 14px;
        }
        .mp-bank-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 16px; color: #1A1A1A;
          display: flex; align-items: center; gap: 8px;
        }
        .mp-bank-row { display: flex; flex-direction: column; gap: 4px; }
        .mp-bank-row label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500; font-size: 10px; color: #939393;
        }
        .mp-bank-value {
          height: 34px; border-radius: 8px;
          background: #F7F7F7; border: 1px solid #ECECEC;
          padding: 0 12px;
          display: flex; align-items: center;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500; font-size: 13px; color: #1A1A1A;
        }
        .mp-status {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600; font-size: 13px; color: #1A1A1A;
        }
        .mp-status-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: #2A9D8F;
        }

        .mp-add {
          background: #FFFFFF;
          border: 2px dashed #D9D9D9;
          border-radius: 16px;
          padding: 22px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
          min-height: 100%;
        }
        .mp-add:hover { border-color: #FE7A42; background: #FFF8F4; }
        .mp-add-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: #1C488C;
          display: flex; align-items: center; justify-content: center;
        }
        .mp-add-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 600; font-size: 15px; color: #1C488C;
          text-align: center;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .mp-top { grid-template-columns: 240px minmax(0, 1fr); }
          .mp-banks { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 640px) {
          .mp-main { padding: 0 16px 24px; }
          .mp-breadcrumb { font-size: 16px; }
          .mp-top { grid-template-columns: 1fr; }
          .mp-profile { align-self: stretch; }
          .mp-reg-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .mp-nominee-grid { grid-template-columns: 1fr; }
          .mp-banks { grid-template-columns: 1fr; }
        }

        @media (max-width: 420px) {
          .mp-reg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <Sidebar firstName="Ali" lastName="Ahmed Khan" />

      <div className="mp-main">
        <div className="mp-bg" />

        <div className="mp-content">
          {/* Header */}
          <div className="mp-header">
            <div className="mp-breadcrumb">
              <Link href="/dashboard">Dashboard</Link>
              &nbsp;&gt;&nbsp;
              My Profile
            </div>
            <div className="mp-actions">
              <div className="mp-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="mp-badge" />
              </div>
              <div className="mp-logout">
                <BiLogOut size={18} color="#1C488C" />
                <span>Log Out</span>
              </div>
            </div>
          </div>

          {/* Top section */}
          <div className="mp-top">
            {/* Profile card */}
            <div className="mp-profile">
              <div className="mp-avatar">
                <FaUserTie size={36} color="#FFFFFF" />
              </div>
              <div className="mp-name">{name}</div>
              <div className="mp-username">{username}</div>

              <div className="mp-divider" />

              <div className="mp-info-row">
                <div className="mp-info-icon"><FaEnvelope size={13} color="#FE7A42" /></div>
                <div className="mp-info-text">
                  <span className="mp-info-label">Email</span>
                  <span className="mp-info-value">{email}</span>
                </div>
              </div>
              <div className="mp-info-row">
                <div className="mp-info-icon"><FaPhone size={13} color="#FE7A42" /></div>
                <div className="mp-info-text">
                  <span className="mp-info-label">Contact Number</span>
                  <span className="mp-info-value">{contact}</span>
                </div>
              </div>
              <div className="mp-info-row">
                <div className="mp-info-icon"><FaIdCard size={13} color="#FE7A42" /></div>
                <div className="mp-info-text">
                  <span className="mp-info-label">CNIC / ID / Passport</span>
                  <span className="mp-info-value">{cnic}</span>
                </div>
              </div>
              <div className="mp-info-row">
                <div className="mp-info-icon"><FaMapMarkerAlt size={13} color="#FE7A42" /></div>
                <div className="mp-info-text">
                  <span className="mp-info-label">Address</span>
                  <span className="mp-info-value">{address}</span>
                </div>
              </div>
              <div className="mp-info-row">
                <div className="mp-info-icon"><FaUserTie size={13} color="#FE7A42" /></div>
                <div className="mp-info-text">
                  <span className="mp-info-label">Member Since</span>
                  <span className="mp-info-value">{memberSince}</span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="mp-right">
              {/* Total Registered Properties */}
              <div>
                <h2 className="mp-section-title">Total Registered Properties</h2>
                <div className="mp-reg-grid">
                  {propertyCategories.map(({ name, count, Icon }) => (
                    <div key={name} className="mp-reg-card">
                      <Icon className="mp-reg-icon" />
                      <span className="mp-reg-name">{name}</span>
                      <span className="mp-reg-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nominee Details */}
              <div className="mp-nominee">
                <h2 className="mp-section-title">Nominee Details</h2>
                <div className="mp-nominee-grid">
                  {nomineeFieldsData.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="mp-field">
                      <label>
                        {Icon && <Icon size={11} color="#939393" style={{ marginRight: 4, verticalAlign: 'middle' }} />}
                        {label}
                      </label>
                      <div className="mp-input">{value}</div>
                    </div>
                  ))}
                  <div className="mp-field full">
                    <label><FaMapMarkerAlt size={11} color="#939393" style={{ marginRight: 4, verticalAlign: 'middle' }} />Address</label>
                    <div className="mp-input">House 12, Street 5, F-10, Islamabad, Pakistan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Accounts */}
          <div className="mp-banks">
            {bankAccountsData.map((acc) => (
              <div key={acc.title} className="mp-bank">
                <div className="mp-bank-title">
                  <MdAccountBalance size={20} color="#1C488C" />
                  {acc.title}
                </div>
                {acc.fields.map((f) => (
                  <div key={f.label} className="mp-bank-row">
                    <label>{f.label}</label>
                    <div className="mp-bank-value">{f.value}</div>
                  </div>
                ))}
                <div className="mp-bank-row">
                  <label>Account Status</label>
                  <div className="mp-status">
                    <span className="mp-status-dot" />
                    {acc.status}
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Account */}
            <div className="mp-add">
              <div className="mp-add-icon">
                <MdAdd size={32} color="#FFFFFF" />
              </div>
              <div className="mp-add-text">Add New Account</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
