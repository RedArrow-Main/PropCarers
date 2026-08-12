"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { MdNotifications, MdDownload, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { usePropertiesData } from '@/lib/useProperties';

const ITEMS_PER_PAGE = 6;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function MaintenanceReportPage() {
  const params = useParams();
  const { allProperties, maintenanceTransactions } = usePropertiesData();
  const propertyId = parseInt(params.id as string, 10);
  const property = allProperties.find(p => p.id === propertyId);
  const transactions = maintenanceTransactions[propertyId] || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [fromMonth, setFromMonth] = useState("Jan-2022");
  const [toMonth, setToMonth] = useState("May-2023");

  if (!property) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <p>Property not found</p>
      </div>
    );
  }

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const propertyIdDisplay = `#DM${String(property.id).padStart(5, "0")}`;

  return (
    <>
      <style>{`
        .mr-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: #F5F4F4;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .mr-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
          position: relative;
        }
        .mr-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 5px;
          background-color: transparent;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }
        .mr-breadcrumb {
          font-weight: 600;
          font-size: 20px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .mr-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mr-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
        }
        .mr-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #FE7A42;
          border: 2px solid #F0F0F0;
        }
        .mr-divider {
          height: 1px;
          background-color: #B8B4B4;
          flex-shrink: 0;
          margin: 10px 28px;
        }
        .mr-card {
          flex: 1;
          margin: 0 40px 40px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 1px 1px 9px 2px rgba(182, 182, 182, 0.25);
          min-height: 0;
        }
        .mr-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 24px;
        }

        /* ── Top Section ── */
        .mr-top-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .mr-view-trans {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mr-view-trans-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #000000;
        }
        .mr-prop-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: #F4F2F2;
          border: 0.5px solid #D6D6D6;
          border-radius: 4px;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 500;
          color: #797979;
        }
        .mr-select-months {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mr-months-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #000000;
        }
        .mr-month-dropdown {
          padding: 6px 10px;
          border: 0.5px solid #D6D6D6;
          border-radius: 4px;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 500;
          cursor: pointer;
          background-color: #F4F2F2;
          color: #797979;
        }

        /* ── Heading Row ── */
        .mr-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .mr-heading {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .mr-heading-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .mr-heading-maint {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #585858;
        }
        .mr-heading-address {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #585858;
        }
        .mr-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          background: #FE7A42;
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .mr-download-btn:hover {
          background: #E86831;
        }

        /* ── Property Info Row ── */
        .mr-property-info {
          display: flex;
          gap: 24px;
          margin-bottom: 20px;
          padding: 12px 0;
          border-bottom: 1px solid #E2E2E2;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          flex-wrap: wrap;
        }
        .mr-prop-info-item {
          display: flex;
          gap: 6px;
          color: #585858;
        }
        .mr-prop-info-label {
          font-weight: 400;
          color: #585858;
        }
        .mr-prop-info-value {
          font-weight: 400;
          color: #585858;
        }

        /* ── Table ── */
        .mr-table-wrapper {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }
        .mr-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
        }
        .mr-table th {
          background-color: #2255A6;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 12px;
          text-align: left;
          position: sticky;
          top: 0;
          border-radius: 0;
        }
        .mr-table th:first-child {
          border-radius: 12px 0 0 0;
        }
        .mr-table th:last-child {
          border-radius: 0 12px 0 0;
        }
        .mr-table td {
          padding: 10px 12px;
          border: none;
          font-weight: 500;
          color: #848484;
        }
        .mr-table tbody tr:nth-child(odd) {
          background-color: #F2F2F2;
        }
        .mr-table tbody tr:nth-child(even) {
          background-color: #ECECEC;
        }
        .mr-table tbody tr:hover {
          background-color: #E8E8E8;
        }
        .mr-view-bill {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          font-weight: 700;
          font-size: 5px;
          color: #333333;
          text-decoration: none;
        }
        .mr-view-bill:hover {
          color: #FE7A42;
        }

        /* ── Mobile Cards ── */
        .mr-table-mobile { display: none; }
        .mr-table-desktop { display: block; }

        /* ── Footer ── */
        .mr-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          border-top: 1px solid #F0F0F0;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
        }
        .mr-footer-left {
          color: #848484;
          font-weight: 500;
        }
        .mr-pagination {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mr-pagination-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: 1px solid #DDDDDD;
          border-radius: 6px;
          background-color: #FFFFFF;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          transition: background-color 0.15s ease;
        }
        .mr-pagination-btn:hover {
          background-color: #F5F5F5;
        }
        .mr-pagination-btn.active {
          background-color: #1E4C93;
          color: #FFFFFF;
          border-color: #1E4C93;
        }
        .mr-pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .mr-page-num {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: #FE7A42;
        }

        .mr-footer-illustration {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 25%;
          height: 36%;
          background-image: url(/cityscape.png);
          background-repeat: repeat-x;
          background-position: bottom;
          background-size: auto 100%;
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 639px) {
          .mr-root        { height: auto; min-height: 100vh; overflow: visible; padding-bottom: 64px; }
          .mr-right       { height: auto; overflow: visible; }
          .mr-header      { padding: 12px 16px 5px; }
          .mr-breadcrumb  { font-size: 14px; }
          .mr-divider     { margin: 6px 14px; }
          .mr-card        { margin: 0 12px 16px; border-radius: 12px; flex: none; }
          .mr-card-content { padding: 14px; }
          .mr-top-section { flex-direction: column; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
          .mr-select-months { flex-wrap: wrap; gap: 8px; }
          .mr-heading-row { flex-direction: column; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
          .mr-heading-maint { font-size: 16px; }
          .mr-download-btn { width: 100%; justify-content: center; }
          .mr-property-info { flex-direction: column; gap: 6px; padding: 10px 0; }
          .mr-table-desktop { display: none; }
          .mr-table-mobile  { display: flex; flex-direction: column; gap: 10px; }
          .mr-footer      { padding: 10px 14px; flex-direction: column; align-items: flex-start; gap: 8px; }
        }

        @media (min-width: 640px) {
          .mr-header  { padding: 16px 40px 5px; }
          .mr-card    { margin: 0 44px 44px; }
          .mr-divider { margin: 10px 32px; }
          .mr-card-content { padding: 28px; }
        }

        @media (min-width: 1024px) {
          .mr-header  { padding: 20px 100px 10px; }
          .mr-card    { margin: 0 120px 20px; }
          .mr-divider { margin: 10px 100px; }
          .mr-card-content { padding: 32px; }
        }
      `}</style>

      <div className="mr-root">
        {/* SIDEBAR */}
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />

        {/* RIGHT SIDE */}
        <div className="mr-right">
          {/* ── Header ── */}
          <div className="mr-header">
            <div className="mr-breadcrumb">
              <Link href="/" style={{ color: "#5F5C5C", textDecoration: "none" }}>Dashboard</Link>
              &nbsp;&gt;&nbsp;
              <Link href="/maintenance" style={{ color: "#5F5C5C", textDecoration: "none" }}>Maintenance</Link>
            </div>

            <div className="mr-actions">
              <div className="mr-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="mr-badge" />
              </div>
              <div className="mr-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="mr-divider" />

          {/* ── Main Card ── */}
          <div className="mr-card">
            <div className="mr-card-content">

              {/* ── Top Section ── */}
              <div className="mr-top-section">
                <div className="mr-view-trans">
                  <span className="mr-view-trans-label">View Transactions of</span>
                  <div className="mr-prop-pill">
                    <Image src="/line.png" alt="property icon" width={14} height={14} />
                    Flat # 12, City Trade Center
                  </div>
                </div>

                <div className="mr-select-months">
                  <span className="mr-months-label">Select Months</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "8px", fontWeight: 500, color: "#797979" }}>From</span>
                    <select
                      className="mr-month-dropdown"
                      value={fromMonth}
                      onChange={(e) => setFromMonth(e.target.value)}
                    >
                      {MONTHS.map((month, idx) => (
                        <option key={`from-${idx}`} value={`${month}-2022`}>
                          {month}-2022
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "8px", fontWeight: 500, color: "#797979" }}>To</span>
                    <select
                      className="mr-month-dropdown"
                      value={toMonth}
                      onChange={(e) => setToMonth(e.target.value)}
                    >
                      {MONTHS.map((month, idx) => (
                        <option key={`to-${idx}`} value={`${month}-2023`}>
                          {month}-2023
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Heading Row ── */}
              <div className="mr-heading-row">
                <div className="mr-heading">
                  <div className="mr-heading-title">
                    <span className="mr-heading-maint">Maintenance:</span>
                    <span className="mr-heading-address">Flat # 12, 3rd Floor, CTC</span>
                  </div>
                  <div className="mr-property-info" style={{ borderBottom: "none", margin: 0, padding: "8px 0" }}>
                    <div className="mr-prop-info-item">
                      <span className="mr-prop-info-label">Property ID:</span>
                      <span className="mr-prop-info-value">{propertyIdDisplay}</span>
                    </div>
                    <div className="mr-prop-info-item">
                      <span className="mr-prop-info-label">Location:</span>
                      <span className="mr-prop-info-value">New City Phase II, Wahcantt</span>
                    </div>
                    <div className="mr-prop-info-item">
                      <span className="mr-prop-info-label">Registered From:</span>
                      <span className="mr-prop-info-value">DEC-2021</span>
                    </div>
                  </div>
                </div>
                <button className="mr-download-btn">
                  <MdDownload size={14} />
                  Download Statement
                </button>
              </div>

              {/* ── Desktop Table ── */}
              <div className="mr-table-wrapper mr-table-desktop">
                <table className="mr-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Month</th>
                      <th>Description</th>
                      <th>Work Status</th>
                      <th>Bill Status</th>
                      <th>Bill Amount</th>
                      <th style={{ width: "50px", textAlign: "center" }}>View Bill</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "40px 12px", color: "#AAAAAA" }}>
                          No transactions found
                        </td>
                      </tr>
                    ) : (
                      paginatedTransactions.map((trans, idx) => (
                        <tr key={idx}>
                          <td>{trans.invoice}</td>
                          <td>{trans.month}</td>
                          <td>{trans.description}</td>
                          <td>{trans.workStatus}</td>
                          <td>{trans.billStatus}</td>
                          <td>{trans.billAmount.toLocaleString()}.00</td>
                          <td style={{ textAlign: "center" }}>
                            <span className="mr-view-bill">
                              <Image src="/PdfRen.png" alt="PDF" width={12} height={12} style={{ objectFit: "contain" }} />
                              View Bill
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile Cards ── */}
              <div className="mr-table-mobile">
                {paginatedTransactions.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "#AAAAAA", fontSize: "14px" }}>
                    No transactions found
                  </div>
                ) : (
                  paginatedTransactions.map((trans, idx) => (
                    <div key={idx} style={{
                      backgroundColor: "#F8F9FF",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      border: "1px solid #E8EAF0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: "12px", color: "#2255A6" }}>{trans.invoice}</span>
                        <span style={{ fontSize: "11px", color: "#848484" }}>{trans.month}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#555" }}>{trans.description}</div>
                      <div style={{ height: "1px", backgroundColor: "#E0E0E0" }} />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "9px", color: "#999", fontWeight: 600, textTransform: "uppercase" }}>Work Status</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: trans.workStatus === "Completed" ? "#4CAF50" : trans.workStatus === "Un-Complete" ? "#F44336" : "#FF9800" }}>
                            {trans.workStatus}
                          </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
                          <span style={{ fontSize: "9px", color: "#999", fontWeight: 600, textTransform: "uppercase" }}>Bill Status</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: trans.billStatus === "Paid" ? "#4CAF50" : "#F44336" }}>
                            {trans.billStatus}
                          </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end" }}>
                          <span style={{ fontSize: "9px", color: "#999", fontWeight: 600, textTransform: "uppercase" }}>Amount</span>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#222" }}>
                            {trans.billAmount.toLocaleString()}.00
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* ── Footer ── */}
            <div className="mr-footer">
              <div className="mr-footer-left">
                Transaction Displayed: {paginatedTransactions.length}
              </div>

              <div className="mr-pagination">
                <button
                  className={`mr-pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  title="Previous"
                >
                  <MdChevronLeft size={16} color={currentPage === 1 ? "#CCC" : "#FE7A42"} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`mr-pagination-btn ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className={`mr-pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  title="Next"
                >
                  <MdChevronRight size={16} color={currentPage === totalPages ? "#CCC" : "#FE7A42"} />
                </button>
              </div>
            </div>
          </div>

          {/* Cityscape Footer Illustration */}
          <div className="mr-footer-illustration" />
        </div>
      </div>
    </>
  );
}
