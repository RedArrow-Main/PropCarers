'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MdNotifications, MdLocationOn, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import Link from 'next/link';

const recommendedProperties = [
  {
    title: 'Single Family House',
    subtitle: 'Rented Monthly 45,000 Pkr',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    beds: 5,
    baths: 4,
    area: '10 Marla',
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80',
  },
  {
    title: 'Single Family House',
    subtitle: 'Rented Monthly 45,000 Pkr',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    beds: 4,
    baths: 3,
    area: '10 Marla',
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80',
  },
  {
    title: 'Single Family House',
    subtitle: 'Rented Monthly 45,000 Pkr',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    beds: 5,
    baths: 5,
    area: '10 Marla',
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  },
  {
    title: 'Single Family House',
    subtitle: 'Rented Monthly 45,000 Pkr',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    beds: 6,
    baths: 4,
    area: '10 Marla',
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80',
  },
  {
    title: 'Single Family House',
    subtitle: 'Rented Monthly 45,000 Pkr',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    beds: 4,
    baths: 3,
    area: '10 Marla',
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80',
  },
  {
    title: 'Single Family House',
    subtitle: 'Rented Monthly 45,000 Pkr',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    beds: 5,
    baths: 4,
    area: '10 Marla',
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  },
];

function PropertyCard({ prop }: { prop: typeof recommendedProperties[0] }) {
  const [fav, setFav] = useState(false);
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={prop.image} alt={prop.title} />
        <div className="sale-badge">For Sale</div>
        <div className="favorite" onClick={() => setFav(!fav)}>
          {fav ? <MdFavorite size={14} color="#ff3b30" /> : <MdFavoriteBorder size={14} />}
        </div>
        <div className="property-price">{prop.price.toLocaleString()} Pkr</div>
      </div>

      <div className="property-body">
        <div className="property-title">{prop.title}</div>
        <div className="property-rent">{prop.subtitle}</div>

        <div className="property-location">
          <MdLocationOn size={10} color="#ff6b2c" />
          <span>{prop.address}</span>
        </div>

        <div className="property-meta">
          <span className="property-meta-item"><strong>{prop.beds}</strong> Beds</span>
          <span className="property-meta-item"><strong>{prop.baths}</strong> Baths</span>
          <span className="property-meta-item"><strong>{prop.area}</strong> Area</span>
        </div>

        <div className="property-features">
          {prop.features.map((f) => (
            <span key={f} className="property-feature">
              <span className="property-feature-dot" />
              {f}
            </span>
          ))}
        </div>

        <button className="property-button">
          <a href={`/buy-sell/${prop.title.replace(/\s+/g, '-').toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>View Details</a>
        </button>
      </div>
    </div>
  );
}

export default function BuySellPage() {
  return (
    <>
      <style>{`
        /* ── Design System ── */
        .bts-root {
          --bs-primary: #123b82;
          --bs-primary-dark: #092c68;
          --bs-primary-light: #eaf1fb;
          --bs-orange: #ff6b2c;
          --bs-orange-light: #fff0e9;
          --bs-green: #35a56f;
          --bs-red: #ff3b30;
          --bs-page-bg: #f7f8fa;
          --bs-text-primary: #14213d;
          --bs-text-secondary: #6d7687;
          --bs-text-muted: #9aa2af;
          --bs-border: #e8ebf0;
          --bs-shadow-sm: 0 2px 8px rgba(20,33,61,0.06);
          --bs-shadow-md: 0 5px 18px rgba(20,33,61,0.09);
          --bs-shadow-lg: 0 12px 30px rgba(20,33,61,0.12);
          font-family: var(--font-josefin-sans), 'Josefin Sans', 'Inter', 'Segoe UI', Arial, sans-serif;
        }

        .bts-app {
          display: flex;
          min-height: 100vh;
          background: var(--bs-page-bg);
          color: var(--bs-text-primary);
        }

        .bts-main {
          flex: 1;
          min-width: 0;
          padding: 0 24px 24px;
          display: flex;
          flex-direction: column;
        }

        /* ── Topbar ── */
        .bts-topbar {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          width: 100%;
          max-width: 1650px;
          margin: 0 auto;
        }
        .bts-breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: var(--bs-text-secondary);
          min-width: 0;
          overflow: hidden;
        }
        .bts-breadcrumb strong { color: var(--bs-text-primary); }
        .bts-topbar-sep { color: var(--bs-text-muted); }
        .bts-actions { display: flex; gap: 10px; }
        .bts-icon-btn {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1px solid var(--bs-border);
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          color: var(--bs-primary);
          box-shadow: var(--bs-shadow-sm);
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
        }
        .bts-badge {
          position: absolute; top: -2px; right: -2px;
          width: 11px; height: 11px; border-radius: 50%;
          background: var(--bs-orange); border: 2px solid #fff;
        }

        /* ── Marketplace Panel ── */
        .bts-marketplace {
          background: #fff;
          border: 1px solid var(--bs-border);
          border-radius: 16px;
          padding: 24px 28px;
          box-shadow: var(--bs-shadow-sm);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-width: 1650px;
          width: 100%;
          margin: 0 auto;
        }
.bts-marketplace::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 70px;
          background: linear-gradient(to top, rgba(255,107,44,0.06), transparent);
          pointer-events: none;
        }

        /* Marketplace heading */
        .bts-heading {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 18px;
          flex-shrink: 0;
        }
        .bts-heading::before,
        .bts-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--bs-border);
        }
        .bts-heading h2 {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          color: var(--bs-primary);
          white-space: nowrap;
        }
        .bts-heading span {
          width: 6px; height: 6px;
          background: var(--bs-orange);
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Property grid */
        .bts-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-auto-rows: 1fr;
          gap: 18px;
          position: relative;
          z-index: 2;
        }

        /* Property card */
        .property-card {
          background: #fff;
          border: 1px solid var(--bs-border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--bs-shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .property-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--bs-shadow-md);
        }
        .property-image {
          height: 200px;
          position: relative;
          flex-shrink: 0;
        }
        .property-image img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .sale-badge {
          position: absolute;
          top: 8px; left: 8px;
          background: var(--bs-red);
          color: #fff;
          padding: 5px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
        }
        .favorite {
          position: absolute;
          top: 8px; right: 8px;
          width: 27px; height: 27px;
          border-radius: 50%;
          background: rgba(255,255,255,0.95);
          display: flex; align-items: center; justify-content: center;
          color: var(--bs-primary);
          font-size: 14px;
          cursor: pointer;
        }
        .property-price {
          position: absolute;
          bottom: -1px; left: 50%;
          transform: translateX(-50%);
          background: var(--bs-orange);
          color: #fff;
          border-radius: 6px 6px 0 0;
          padding: 7px 14px;
          white-space: nowrap;
          font-size: 13px;
          font-weight: 800;
        }
        .property-body {
          padding: 10px 13px 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .property-title {
          font-size: 11px;
          font-weight: 800;
          color: #171717;
          margin-bottom: 3px;
        }
        .property-rent {
          font-size: 9px;
          color: var(--bs-orange);
          font-weight: 600;
          margin-bottom: 9px;
        }
        .property-location {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--bs-text-secondary);
          font-size: 8px;
          margin-bottom: 10px;
        }
        .property-meta {
          display: flex;
          justify-content: space-between;
          color: var(--bs-text-secondary);
          font-size: 8px;
          margin-bottom: 10px;
        }
        .property-meta-item strong {
          color: var(--bs-text-primary);
          font-weight: 700;
        }
        .property-features {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 10px;
        }
        .property-feature {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 7px;
          color: #444;
          white-space: nowrap;
        }
        .property-feature-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--bs-orange);
          flex-shrink: 0;
        }
        .property-button {
          width: 100%;
          height: 27px;
          border: 0;
          border-radius: 5px;
          background: var(--bs-primary);
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: auto;
        }
        .property-button:hover { background: var(--bs-primary-dark); }

        /* View more */
        .bts-view-more {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          position: relative;
          z-index: 3;
          flex-shrink: 0;
        }
        .bts-view-more button {
          border: 0;
          border-radius: 25px;
          padding: 10px 24px;
          background: var(--bs-orange);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(255,107,44,0.2);
          cursor: pointer;
          transition: 0.2s ease;
          font-family: inherit;
        }
        .bts-view-more button:hover { background: #e85a1e; }

        /* ── Responsive ── */

        /* 1024–1399px: keep 3 columns, slightly smaller gaps */
        @media (max-width: 1399px) {
          .bts-grid { gap: 16px; }
          .bts-marketplace { padding: 22px 24px; }
        }

        /* 768–1023px: 2 columns */
        @media (max-width: 1023px) {
          .bts-main { padding: 0 16px 16px; }
          .bts-topbar { height: 54px; }
          .bts-marketplace { padding: 18px 20px; }
          .bts-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
          .property-image { height: 180px; }
        }

        /* Mobile (< 768px): 1 column, full width */
        @media (max-width: 767px) {
          .bts-main { padding: 0 12px 88px; }
          .bts-topbar {
            height: auto;
            min-height: 54px;
            flex-wrap: wrap;
            gap: 8px;
            padding: 10px 0 6px;
          }
          .bts-breadcrumb { font-size: 13px; flex: 1; min-width: 0; }
          .bts-actions { gap: 8px; }

          /* Heading wraps instead of overflowing */
          .bts-heading h2 { white-space: normal; text-align: center; font-size: 15px; }
          .bts-heading { gap: 10px; margin-bottom: 14px; }

          /* Single column cards, full width */
          .bts-grid { grid-template-columns: 1fr; gap: 14px; }

          /* Card text scales up on full-width cards */
          .property-image { height: 190px; }
          .property-title { font-size: 13px; }
          .property-rent { font-size: 10px; }
          .property-location { font-size: 9px; }
          .property-meta { font-size: 9px; }
          .property-feature { font-size: 8px; }
          .property-price { font-size: 14px; }
          /* Touch-friendly tap target */
          .property-button { height: 40px; font-size: 11px; }
          .favorite { width: 32px; height: 32px; }
        }

        /* Small phones */
        @media (max-width: 400px) {
          .bts-marketplace { padding: 14px 12px; }
          .property-image { height: 160px; }
          .bts-heading h2 { font-size: 14px; }
        }
        }
      `}</style>

      <div className="bts-app bts-root">
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />

        <div className="bts-main">
          {/* ── Topbar ── */}
          <div className="bts-topbar">
            <div className="bts-breadcrumb">
              <Link href="/dashboard" style={{ color: '#6d7687', textDecoration: 'none' }}>Dashboard</Link>
              <span className="bts-topbar-sep">&gt;</span>
              <strong>Buy/Sell Property</strong>
            </div>
            <div className="bts-actions">
              <div className="bts-icon-btn">
                <MdNotifications size={18} />
                <div className="bts-badge" />
              </div>
              <div className="bts-icon-btn">
                <BiLogOut size={18} />
              </div>
            </div>
          </div>

          {/* ── Marketplace Panel ── */}
            <div className="bts-marketplace">
              <div className="bts-heading">
                <span />
                <h2>Recommended Properties For You</h2>
                <span />
              </div>

              <div className="bts-grid">
                {recommendedProperties.map((prop, idx) => (
                  <PropertyCard key={idx} prop={prop} />
                ))}
              </div>

              <div className="bts-view-more">
                <button>View More Properties</button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}