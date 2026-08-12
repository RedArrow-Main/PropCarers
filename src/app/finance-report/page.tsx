'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MdNotifications } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { FaMoneyBillWave, FaMoneyBillAlt, FaHome, FaBuilding, FaCity, FaHandshake, FaMapMarkedAlt } from 'react-icons/fa';
import Link from 'next/link';

const monthData = [
  { name: 'Jan', income: 180000 },
  { name: 'Feb', income: 220000 },
  { name: 'Mar', income: 190000 },
  { name: 'Apr', income: 260000 },
  { name: 'May', income: 324000 },
  { name: 'Jun', income: 220000 },
];

const chartMax = Math.max(...monthData.map((d) => d.income));
const BAR_MAX_HEIGHT = 136;

const propertyCategories = [
  { name: 'Residential', count: 4, Icon: FaHome },
  { name: 'Commercial', count: 1, Icon: FaBuilding },
  { name: 'Apartment', count: 3, Icon: FaCity },
  { name: 'Co-Space', count: 0, Icon: FaHandshake },
  { name: 'Land', count: 0, Icon: FaMapMarkedAlt },
];

const totalIncome = 324000;
const totalIncomeAll = 390000;
const totalExpenses = 66000;

export default function FinanceReportPage() {
  const [fromMonth, setFromMonth] = useState('Jan-2022');
  const [toMonth, setToMonth] = useState('May-2023');

  return (
    <>
      <style>{`
        .fr-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: #F5F4F4;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        @media (max-width: 639px) {
          .fr-root { height: auto; min-height: 100vh; overflow: visible; padding-bottom: 64px; }
          .fr-right { height: auto; overflow: visible; }
          .fr-header { padding: 14px 16px 5px; }
          .fr-breadcrumb { font-size: 14px; white-space: normal; }
          .fr-divider-line { margin: 8px 14px; }
          .fr-main-card { margin: 0 12px 16px; padding: 16px; border-radius: 12px; }
          .fr-inner-row { flex-direction: column; }
          .fr-chart-card { width: 100%; }
          .fr-summary-card { width: 100%; }
          .fr-date-gen-row { flex-direction: column; gap: 12px; }
          .fr-gen-btn { width: 100%; }
          .fr-cat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .fr-cat-card { width: 100%; }
          .fr-bars-wrapper { height: 120px; }
          .fr-bar-col { height: 120px; }
          .fr-y-axis { height: 120px; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .fr-main-card { margin: 10px 32px 32px; }
          .fr-header { padding: 16px 32px 5px; }
          .fr-divider-line { margin: 10px 32px; }
        }
        @media (min-width: 1024px) {
          .fr-main-card { margin: 10px 40px 32px; }
          .fr-header { padding: 16px 40px 5px; }
          .fr-divider-line { margin: 10px 40px; }
        }
        .fr-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          min-width: 0;
        }
        .fr-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }
        .fr-breadcrumb {
          font-weight: 600;
          font-size: 20px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .fr-breadcrumb a {
          color: #5F5C5C;
          text-decoration: none;
        }
        .fr-breadcrumb a:hover {
          color: #2356A6;
        }
        .fr-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .fr-icon-btn {
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
        .fr-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: #FE7A42;
          border: 2px solid #F0F0F0;
        }
        .fr-divider-line {
          height: 2px;
          background-color: #B8B4B4;
          flex-shrink: 0;
        }
        .fr-main-card {
          background: #FFFFFF;
          border-radius: 15px;
          box-shadow: 2px 0px 12px rgba(0,0,0,0.08);
          padding: 28px 32px 32px;
          display: flex;
          flex-direction: column;
        }
        .fr-overview-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #1A1A1A;
          margin-bottom: 16px;
          line-height: 18px;
        }
        .fr-inner-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .fr-chart-card {
          flex: 1;
          min-width: 0;
          background: #FFFFFF;
          border: 1px solid #F0F0F0;
          border-radius: 20px;
          padding: 20px 24px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        }
        .fr-chart-total {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 24px;
          color: #1A1A1A;
          margin-bottom: 16px;
          line-height: 36px;
        }
        .fr-chart-body {
          display: flex;
          gap: 8px;
        }
        .fr-y-axis {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #939393;
          width: 36px;
          text-align: right;
          flex-shrink: 0;
          height: ${BAR_MAX_HEIGHT + 24}px;
          box-sizing: border-box;
          padding-bottom: 24px;
        }
        .fr-bars-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          flex: 1;
          height: ${BAR_MAX_HEIGHT + 24}px;
          border-bottom: none;
        }
        .fr-bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          height: ${BAR_MAX_HEIGHT + 24}px;
          justify-content: flex-end;
        }
        .fr-bar-fill {
          width: 15px;
          border-radius: 30px;
          flex-shrink: 0;
        }
        .fr-bar-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #939393;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .fr-summary-card {
          width: 350px;
          flex-shrink: 0;
          background: #FFFFFF;
          border: 1px solid #F0F0F0;
          border-radius: 20px;
          padding: 20px 24px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
        }
        .fr-summary-block {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 8px 0;
        }
        .fr-summary-icon {
          width: 56px;
          height: 60px;
          border-radius: 50%;
          background: #F8F8F8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fr-summary-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .fr-summary-label {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #1A1A1A;
          line-height: 18px;
        }
        .fr-summary-value {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 24px;
          color: #1A1A1A;
          line-height: 36px;
        }
        .fr-summary-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #848484;
          line-height: 18px;
        }
        .fr-summary-divider {
          height: 1px;
          background: #DEDEDE;
          margin: 16px 0;
        }
        .fr-date-gen-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .fr-date-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fr-date-label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #000000;
          flex-shrink: 0;
        }
        .fr-date-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .fr-date-input {
          width: 183px;
          height: 30px;
          background: #F4F2F2;
          border: 0.5px solid #D6D6D6;
          border-radius: 4px;
          padding: 0 32px 0 12px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #797979;
          outline: none;
          box-sizing: border-box;
        }
        .fr-date-input:focus { border-color: #FE7A42; }
        .fr-date-icon {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: #848484;
          font-size: 16px;
          pointer-events: none;
        }
        .fr-gen-btn {
          background: #F28B60;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          padding: 8px 24px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          text-decoration: underline;
          white-space: nowrap;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }
        .fr-gen-btn:hover { background: #e67a50; }
        .fr-section-divider {
          border: none;
          border-top: 1px solid #B8B4B4;
          margin: 0 0 20px;
        }
        .fr-registered-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 24px;
          color: #1A1A1A;
          text-align: center;
          margin-bottom: 8px;
          line-height: 36px;
        }
        .fr-cat-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .fr-cat-card {
          background: #2255A6;
          border-radius: 7px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .fr-cat-icon {
          font-size: 28px;
          color: #F28B60;
        }
        .fr-cat-name {
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #FFFFFF;
          line-height: 15px;
        }
        .fr-cat-count {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 30px;
          color: #FFFFFF;
          line-height: 1;
        }
        .fr-footer-illustration {
          position: relative;
          height: 80px;
          background-image: url(/cityscape.png);
          background-repeat: repeat-x;
          background-position: bottom;
          background-size: auto 100%;
          opacity: 0.15;
          pointer-events: none;
          flex-shrink: 0;
        }
      `}</style>

      <div className="fr-root">
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />
        <div className="fr-right">

          {/* Header */}
          <div className="fr-header">
            <div className="fr-breadcrumb">
              <Link href="/dashboard">Dashboard</Link>
              &nbsp;&gt;&nbsp;
              Finance Report
            </div>
            <div className="fr-actions">
              <div className="fr-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="fr-badge" />
              </div>
              <div className="fr-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="fr-divider-line" />

          {/* Main Card */}
          <div className="fr-main-card">
            <p className="fr-overview-label">Overview of last 180 days</p>

            {/* Chart + Summary Row */}
            <div className="fr-inner-row">
              {/* Chart Card */}
              <div className="fr-chart-card">
                <p className="fr-chart-total">Pkr {totalIncome.toLocaleString()}.00</p>
                <div className="fr-chart-body">
                  <div className="fr-y-axis">
                    <span>300k</span>
                    <span>200k</span>
                    <span>100k</span>
                    <span>50k</span>
                    <span>0</span>
                  </div>
                  <div className="fr-bars-wrapper">
                    {monthData.map((d) => {
                      const h = (d.income / chartMax) * BAR_MAX_HEIGHT;
                      const isMax = d.income === chartMax;
                      return (
                        <div key={d.name} className="fr-bar-col">
                          <div
                            className="fr-bar-fill"
                            style={{
                              height: `${h}px`,
                              background: '#4C52EC',
                              opacity: isMax ? 1 : 0.4,
                            }}
                          />
                          <span className="fr-bar-label">{d.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="fr-summary-card">
                {/* Income */}
                <div className="fr-summary-block">
                  <div className="fr-summary-icon">
                    <FaMoneyBillWave size={28} color="#4178CF" />
                  </div>
                  <div className="fr-summary-info">
                    <span className="fr-summary-label">Income</span>
                    <span className="fr-summary-value">Pkr {totalIncomeAll.toLocaleString()}.00</span>
                    <span className="fr-summary-sub">Last 6 Months</span>
                  </div>
                </div>

                <div className="fr-summary-divider" />

                {/* Expenses */}
                <div className="fr-summary-block">
                  <div className="fr-summary-icon">
                    <FaMoneyBillAlt size={28} color="#F76B1D" />
                  </div>
                  <div className="fr-summary-info">
                    <span className="fr-summary-label">Expenses</span>
                    <span className="fr-summary-value">Pkr {totalExpenses.toLocaleString()}.00</span>
                    <span className="fr-summary-sub">Last 6 Months</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range + Generate Report */}
            <div className="fr-date-gen-row">
              <div className="fr-date-group">
                <span className="fr-date-label">From</span>
                <div className="fr-date-input-wrap">
                  <input
                    type="text"
                    value={fromMonth}
                    onChange={(e) => setFromMonth(e.target.value)}
                    className="fr-date-input"
                  />
                  <span className="fr-date-icon">📅</span>
                </div>
              </div>
              <div className="fr-date-group">
                <span className="fr-date-label">To</span>
                <div className="fr-date-input-wrap">
                  <input
                    type="text"
                    value={toMonth}
                    onChange={(e) => setToMonth(e.target.value)}
                    className="fr-date-input"
                  />
                  <span className="fr-date-icon">📅</span>
                </div>
              </div>
              <button className="fr-gen-btn">Generate Report</button>
            </div>

            {/* Divider */}
            <hr className="fr-section-divider" />

            {/* Total Registered Properties */}
            <p className="fr-registered-title">Total Registered Properties</p>
            <div className="fr-cat-grid">
              {propertyCategories.map(({ name, count, Icon }) => (
                <div key={name} className="fr-cat-card">
                  <Icon size={28} color="#F28B60" />
                  <span className="fr-cat-name">{name}</span>
                  <span className="fr-cat-count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Illustration */}
          <div className="fr-footer-illustration" />
        </div>
      </div>
    </>
  );
}
