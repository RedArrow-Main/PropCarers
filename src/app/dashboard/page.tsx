"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { MdNotifications, MdLocationOn, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────
type PropertyCategory =
  | "Residential"
  | "Commercial"
  | "Apartment"
  | "Co-Space"
  | "Land"
  | "All Properties";

interface Property {
  id: number;
  title: string;
  address: string;
  monthlyRent: number;
  image: string;
  category: PropertyCategory;
}

// ── Dummy Properties ─────────────────────────────────────────
const allProperties: Property[] = [
  { id: 1,  title: "Single Family House", address: "House No D-12, Street # 3, Gulberg, Islamabad", monthlyRent: 45000, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&q=80", category: "Residential" },
  { id: 2,  title: "Single Family House", address: "House No D-12, Street # 3, Gulberg, Islamabad", monthlyRent: 45000, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&q=80", category: "Residential" },
  { id: 3,  title: "Single Family House", address: "House No D-12, Street # 3, Gulberg, Islamabad", monthlyRent: 45000, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80", category: "Residential" },
  { id: 4,  title: "Single Family House", address: "House No D-12, Street # 3, Gulberg, Islamabad", monthlyRent: 45000, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80", category: "Residential" },
  { id: 5,  title: "Commercial Plaza",    address: "Plot # 5, Blue Area, Jinnah Avenue, Islamabad",  monthlyRent: 150000, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80", category: "Commercial" },
  { id: 6,  title: "Office Space",        address: "F-7 Markaz, Islamabad",                          monthlyRent: 120000, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80", category: "Commercial" },
  { id: 7,  title: "2 Bedroom Apartment", address: "Bahria Town, Phase 4, Rawalpindi",               monthlyRent: 45000,  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=80", category: "Apartment" },
  { id: 8,  title: "Studio Apartment",    address: "G-11 Markaz, Islamabad",                         monthlyRent: 35000,  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80", category: "Apartment" },
];

// ── Chart Data ───────────────────────────────────────────────
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June"];
const chartValues = [20000, 35000, 28000, 42000, 60000, 38000]; // in PKR
const chartMax = Math.max(...chartValues);

const totalIncome   = 390000;
const totalExpenses =  66000;

const ITEMS_PER_PAGE = 4;

// ── Main Dashboard Page ──────────────────────────────────────
export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allProperties.length / ITEMS_PER_PAGE);
  const paginated  = allProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <style>{`
        /* ── Root Layout ── */
        .dash-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: #F0F0F0;
          font-family: var(--font-josefin-sans), 'Josefin Sans', sans-serif;
        }

        /* ── Right Panel ── */
        .dash-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          min-width: 0;
        }

        /* ── Header ── */
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 5px;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* "Thank You For Choosing Us" */
        .dash-breadcrumb {
          font-family: 'Josefin Sans', var(--font-josefin-sans), sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #222;
          white-space: nowrap;
          width: 309px;
          height: 36px;
          display: flex;
          align-items: center;
        }

        .dash-breadcrumb span {
          font-family: 'Josefin Sans', var(--font-josefin-sans), sans-serif;
          font-weight: 700;
          font-size: 24px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #FE7A42;
          margin-left: 6px;
        }

        /* Icon buttons row */
        .dash-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dash-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
        }

        .dash-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: #FE7A42;
          border: 2px solid #F0F0F0;
        }

        /* ── Divider ── */
        .dash-divider {
          height: 2px;
          background-color: #B8B4B4;
          flex-shrink: 0;
          margin: 10px 28px;
        }

        /* ── Main Content Area ── */
        .dash-content {
          flex: 1;
          padding: 0 32px 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-height: 0;
        }

        /* ── Overview Card ── */
        .overview-card {
          background-color: #FFFFFF;
          border-radius: 15px;
          padding: 24px 28px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          gap: 12px;
          /* matches: width:964, height:376 from design */
          width: 100%;
          min-height: 376px;
          box-sizing: border-box;
        }

        /* "Overview" title: width:98, height:30, Poppins Bold 20px, #1A1A1A */
        .overview-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 20px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #1A1A1A;
          width: 98px;
          height: 30px;
          display: flex;
          align-items: center;
        }

        .overview-body {
          display: flex;
          gap: 24px;
          align-items: stretch;
          flex: 1;
        }

        /* Left: chart area */
        .chart-area {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        /* "Pkr 324,000.00" — Poppins SemiBold 24px */
        .chart-total {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 24px;
          color: #1A1A1A;
          margin-bottom: 2px;
        }

        /* "Last 6 months" — Poppins Medium 12px, #939393 */
        .chart-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #939393;
          margin-bottom: 20px;
        }

        /* Y-axis + bar chart wrapper */
        .chart-with-axis {
          display: flex;
          gap: 10px;
          flex: 1;
          min-height: 160px;
        }

        /* Y-axis labels */
        .chart-y-axis {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #939393;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 10px;
          flex-shrink: 0;
          width: 36px;
          text-align: right;
          padding-bottom: 22px;
          box-sizing: border-box;
        }

        /* Bar chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          flex: 1;
        }

        .bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
          height: 160px;
          justify-content: flex-end;
        }

        .bar-fill {
          width: 100%;
          max-width: 32px;
          border-radius: 6px 6px 0 0;
          flex-shrink: 0;
        }

        .bar-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 10px;
          color: #939393;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Right: stats container */
        .stats-area {
          display: flex;
          flex-direction: column;
          border: 1px solid #E2E2E2;
          border-radius: 12px;
          overflow: hidden;
          width: 260px;
          flex-shrink: 0;
          align-self: stretch;
        }

        /* Each stat row */
        .stat-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background-color: #FFFFFF;
          padding: 20px;
          flex: 1;
        }

        /* Divider between income and expenses */
        .stat-divider {
          height: 1px;
          background-color: #E2E2E2;
          margin: 0 20px;
          flex-shrink: 0;
        }

        /* Eclipse icon — 44x44 */
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background-color: #F8F8F8;
          margin-top: 2px;
        }

        .stat-icon img {
          width: 26px;
          height: 26px;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        /* "Income" / "Expenses" — Montserrat Bold 12px #1A1A1A */
        .stat-label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: #1A1A1A;
          line-height: 100%;
        }

        /* "Pkr 390,000.00" — Poppins SemiBold 20px #1A1A1A */
        .stat-value {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 20px;
          color: #1A1A1A;
          line-height: 1.2;
        }

        /* "Last 6 months" — Poppins Medium 11px #939393, right-aligned */
        .stat-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 11px;
          color: #939393;
          text-align: right;
          align-self: flex-end;
        }

        /* ── Recommended Section ── */
        .recommended-title {
          font-size: 16px;
          font-weight: 700;
          color: #222;
          text-align: center;
          margin-bottom: 4px;
        }

        /* Property cards grid */
        .prop-carousel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* Card */
        .prop-card {
          background-color: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
        }

        /* Image frame — tall, takes ~65% of card */
        .prop-img-wrap {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 90%;
          overflow: visible;
          background: #EEE;
          border-radius: 18px 18px 0 0;
          flex-shrink: 0;
        }

        .prop-img-wrap img {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 18px 18px 0 0;
        }

        /* Price badge — sits at bottom of image, overlapping into card body */
        .prop-price-badge {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #FE7A42;
          color: #FFFFFF;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 10px 24px;
          border-radius: 30px;
          white-space: nowrap;
          box-shadow: 0 6px 18px rgba(254,122,66,0.5);
          z-index: 3;
        }

        /* Card body */
        .prop-body {
          padding: 28px 14px 1px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        /* Title: "Single Family House" — Poppins SemiBold 12px #000, center */
        .prop-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #000000;
          text-align: center;
          line-height: 1.5;
          width: 100%;
        }

        /* Rent: "Rented Monthly 45,000 Pkr" — Poppins Bold 14px #000 */
        .prop-rent {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #000000;
          text-align: center;
          width: 100%;
        }

        /* Address: Poppins Medium 10px, #939393, center */
        .prop-address {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 10px;
          color: #939393;
          text-align: center;
          width: 100%;
          margin-top: 2px;
        }

        /* Feature tags row */
        .prop-features {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
          flex-wrap: nowrap;
        }

        /* Each feature tag */
        .prop-feature {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 9px;
          color: #000000;
          white-space: nowrap;
        }

        /* Eclipse dot: #BFBFBF */
        .prop-feature-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #BFBFBF;
          flex-shrink: 0;
        }

        /* "Click For More" button — scaled up, top corners radius only */
        .prop-view-btn {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          height: 36px;
          background-color: #1F4D95;
          color: #FFFFFF;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          cursor: pointer;
          text-align: center;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }

        .prop-view-btn:hover {
          background-color: #2356A6;
        }

        /* Load More button */
        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .load-more-btn {
          padding: 12px 40px;
          background-color: #FE7A42;
          color: #FFFFFF;
          border: none;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Josefin Sans', var(--font-josefin-sans), sans-serif;
          letter-spacing: 0.3px;
        }

        .load-more-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .prop-carousel { grid-template-columns: repeat(2, 1fr); }
          .stats-area    { min-width: 160px; }
        }

        @media (max-width: 640px) {
          .dash-header   { padding: 14px 20px 5px; }
          .dash-content  { padding: 0 20px 24px; }
          .dash-divider  { margin: 8px 16px; }
          .overview-body { flex-direction: column; }
          .stats-area    { flex-direction: row; min-width: unset; }
          .prop-carousel { grid-template-columns: repeat(2, 1fr); }
          .dash-breadcrumb { font-size: 18px; width: auto; height: auto; }
          .dash-breadcrumb span { font-size: 18px; }
        }

        @media (max-width: 400px) {
          .prop-carousel { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-root">

        {/* SIDEBAR */}
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />

        {/* RIGHT PANEL */}
        <div className="dash-right">

          {/* ── Header ── */}
          <div className="dash-header">
            <div className="dash-breadcrumb">
              Thank You For<span>Choosing Us</span>
            </div>

            <div className="dash-actions">
              {/* Notification Bell */}
              <div className="dash-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="dash-badge" />
              </div>

              {/* Log Out */}
              <div className="dash-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="dash-divider" />

          {/* ── Main Content ── */}
          <div className="dash-content">

            {/* ── Overview Card ── */}
            <div className="overview-card">
              <div className="overview-title">Overview</div>

              <div className="overview-body">

                {/* Bar Chart */}
                <div className="chart-area">
                  <div className="chart-total">
                    Pkr {(totalIncome - totalExpenses).toLocaleString()}.00
                  </div>
                  <div className="chart-subtitle">Last 6 months</div>

                  <div className="chart-with-axis">
                    {/* Y-axis labels: width:51, height:167, color:#939393 */}
                    <div className="chart-y-axis">
                      <span>$60k</span>
                      <span>$40k</span>
                      <span>$30k</span>
                      <span>$10k</span>
                      <span>0</span>
                    </div>

                    <div className="bar-chart">
                      {months.map((month, i) => {
                        const heightPct = chartMax > 0 ? (chartValues[i] / chartMax) * 100 : 0;
                        const isHighest = chartValues[i] === chartMax;
                        return (
                          <div className="bar-col" key={month}>
                            <div
                              className="bar-fill"
                              style={{
                                height: `${heightPct}%`,
                                backgroundColor: isHighest ? "#2356A6" : "#C5D3EC",
                              }}
                            />
                            <span className="bar-label">{month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="stats-area">

                  {/* Income */}
                  <div className="stat-card">
                    {/* Eclipse: #F8F8F8 bg, income icon */}
                    <div className="stat-icon" style={{ backgroundColor: "#F8F8F8" }}>
                      <img src="/money-recive.svg" alt="Income" style={{ width: 32, height: 32 }} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Income</span>
                      <span className="stat-value">Pkr {totalIncome.toLocaleString()}.00</span>
                      <span className="stat-sub">Last 6 months</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="stat-divider" />

                  {/* Expenses */}
                  <div className="stat-card">
                    {/* Eclipse: #F8F8F8 bg, expenses icon */}
                    <div className="stat-icon" style={{ backgroundColor: "#F8F8F8" }}>
                      <img src="/money-send.svg" alt="Expenses" style={{ width: 32, height: 32 }} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Expenses</span>
                      <span className="stat-value">Pkr {totalExpenses.toLocaleString()}.00</span>
                      <span className="stat-sub">Last 6 months</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* ── Recommended Properties ── */}
            <div>
              {/* Divider: width:974, border:1px solid #B8B4B4, center aligned */}
              <div style={{
                width: "100%",
                maxWidth: "974px",
                height: "0px",
                borderTop: "1px solid #B8B4B4",
                margin: "0 auto 20px auto",
              }} />

              <div className="recommended-title">Recommended Properties For You !</div>

              <div className="prop-carousel">
                {paginated.map((property) => (
                  <div className="prop-card" key={property.id}>
                    {/* Image + Price Badge */}
                    <div className="prop-img-wrap">
                      <img src={property.image} alt={property.title} />
                      <div className="prop-price-badge">
                        {(property.monthlyRent * 10).toLocaleString()} Pkr
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="prop-body">
                      <div className="prop-name">{property.title}</div>
                      <div className="prop-rent">
                        Rented Monthly {property.monthlyRent.toLocaleString()} Pkr
                      </div>
                      <div className="prop-address">{property.address}</div>

                      {/* Feature Tags */}
                      <div className="prop-features">
                        <div className="prop-feature">
                          <div className="prop-feature-dot" />
                          Newly Constructed
                        </div>
                        <div className="prop-feature">
                          <div className="prop-feature-dot" />
                          Double Story
                        </div>
                        <div className="prop-feature">
                          <div className="prop-feature-dot" />
                          Ideal Location
                        </div>
                      </div>

                      <Link href={`/dashboard/property/${property.id}`} className="prop-view-btn">
                        Click For More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="load-more-wrap" style={{ marginTop: "20px" }}>
                <button
                  className="load-more-btn"
                  onClick={() => setCurrentPage(p => (p < totalPages ? p + 1 : 1))}
                >
                  Load More Properties
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
