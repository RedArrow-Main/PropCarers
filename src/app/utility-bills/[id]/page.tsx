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

export default function UtilityBillDetailPage() {
  const params = useParams();
  const { allProperties, utilityBillTransactions } = usePropertiesData();
  const propertyId = parseInt(params.id as string, 10);
  const property = allProperties.find(p => p.id === propertyId);
  const transactions = utilityBillTransactions[propertyId] || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [fromMonth, setFromMonth] = useState("Jan-2022");
  const [toMonth, setToMonth] = useState("May-2023");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  if (!property) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <p>Property not found</p>
      </div>
    );
  }

  const filtered = transactions.filter(t => {
    if (filterType !== "All" && t.billType !== filterType) return false;
    if (filterStatus !== "All" && t.billStatus !== filterStatus) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const propertyIdDisplay = `#DM${String(property.id).padStart(5, "0")}`;
  const billTypes = ["All", ...Array.from(new Set(transactions.map(t => t.billType)))];
  const billStatuses = ["All", "Paid", "Un-Paid"];

  return (
    <>
      <style>{`
        .ub-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: #F5F4F4;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .ub-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
          position: relative;
        }
        .ub-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 5px;
          background-color: transparent;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }
        .ub-breadcrumb {
          font-weight: 600;
          font-size: 20px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .ub-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ub-icon-btn {
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
        .ub-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #FE7A42;
          border: 2px solid #F0F0F0;
        }
        .ub-divider {
          height: 1px;
          background-color: #B8B4B4;
          flex-shrink: 0;
          margin: 10px 28px;
        }
        .ub-card {
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
        .ub-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 24px;
        }

        /* ── Top Section ── */
        .ub-top-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .ub-view-trans {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ub-view-trans-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #000000;
        }
        .ub-prop-pill {
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
        .ub-select-months {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ub-months-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #000000;
        }
        .ub-month-dropdown {
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
        .ub-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .ub-heading {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ub-heading-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ub-heading-util {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #585858;
        }
        .ub-heading-address {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #585858;
        }
        .ub-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          background: #F28B60;
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
        .ub-download-btn:hover {
          background: #FE7A42;
        }

        /* ── Property Info Row ── */
        .ub-property-info {
          display: flex;
          gap: 24px;
          margin-bottom: 20px;
          padding: 12px 0;
          border-bottom: 1px solid #E2E2E2;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          flex-wrap: wrap;
        }
        .ub-prop-info-item {
          display: flex;
          gap: 6px;
          color: #585858;
        }

        /* ── Filter Row ── */
        .ub-filter-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ub-filter-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #585858;
        }
        .ub-filter-dropdown {
          padding: 6px 10px;
          border: 0.5px solid #D6D6D6;
          border-radius: 4px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 400;
          cursor: pointer;
          background-color: #F4F2F2;
          color: #000000;
          min-width: 85px;
        }

        /* ── Table ── */
        .ub-table-wrapper {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }
        .ub-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
        }
        .ub-table th {
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
        .ub-table th:first-child {
          border-radius: 12px 0 0 0;
        }
        .ub-table th:last-child {
          border-radius: 0 12px 0 0;
        }
        .ub-table td {
          padding: 10px 12px;
          border: none;
          font-weight: 500;
          color: #848484;
        }
        .ub-table tbody tr:nth-child(odd) {
          background-color: #F2F2F2;
        }
        .ub-table tbody tr:nth-child(even) {
          background-color: #ECECEC;
        }
        .ub-table tbody tr:hover {
          background-color: #E8E8E8;
        }
        .ub-view-bill-link {
          color: #F28B60;
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
          font-size: 12px;
        }
        .ub-view-bill-link:hover {
          color: #FE7A42;
        }
        .ub-view-receipt {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 6px;
          color: #F28B60;
          text-decoration: underline;
          text-decoration-line: underline;
        }
        .ub-view-receipt:hover {
          color: #FE7A42;
        }

        /* ── Mobile Cards ── */
        .ub-table-mobile { display: none; }
        .ub-table-desktop { display: block; }

        /* ── Footer ── */
        .ub-footer {
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
        .ub-footer-left {
          color: #848484;
          font-weight: 500;
        }
        .ub-pagination {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ub-pagination-btn {
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
        .ub-pagination-btn:hover {
          background-color: #F5F5F5;
        }
        .ub-pagination-btn.active {
          background-color: #1E4C93;
          color: #FFFFFF;
          border-color: #1E4C93;
        }
        .ub-pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ub-footer-illustration {
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
          .ub-root        { height: auto; min-height: 100vh; overflow: visible; padding-bottom: 64px; }
          .ub-right       { height: auto; overflow: visible; }
          .ub-header      { padding: 12px 16px 5px; }
          .ub-breadcrumb  { font-size: 14px; }
          .ub-divider     { margin: 6px 14px; }
          .ub-card        { margin: 0 12px 16px; border-radius: 12px; flex: none; }
          .ub-card-content { padding: 14px; }
          .ub-top-section { flex-direction: column; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
          .ub-select-months { flex-wrap: wrap; gap: 8px; }
          .ub-heading-row { flex-direction: column; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
          .ub-heading-util { font-size: 16px; }
          .ub-download-btn { width: 100%; justify-content: center; }
          .ub-property-info { flex-direction: column; gap: 6px; padding: 10px 0; }
          .ub-filter-row { flex-wrap: wrap; gap: 8px; }
          .ub-table-desktop { display: none; }
          .ub-table-mobile  { display: flex; flex-direction: column; gap: 10px; }
          .ub-footer      { padding: 10px 14px; flex-direction: column; align-items: flex-start; gap: 8px; }
        }

        @media (min-width: 640px) {
          .ub-header  { padding: 16px 40px 5px; }
          .ub-card    { margin: 0 44px 44px; }
          .ub-divider { margin: 10px 32px; }
          .ub-card-content { padding: 28px; }
        }

        @media (min-width: 1024px) {
          .ub-header  { padding: 20px 100px 10px; }
          .ub-card    { margin: 0 120px 20px; }
          .ub-divider { margin: 10px 100px; }
          .ub-card-content { padding: 32px; }
        }
      `}</style>

      <div className="ub-root">
        {/* SIDEBAR */}
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />

        {/* RIGHT SIDE */}
        <div className="ub-right">
          {/* ── Header ── */}
          <div className="ub-header">
            <div className="ub-breadcrumb">
              <Link href="/" style={{ color: "#5F5C5C", textDecoration: "none" }}>Dashboard</Link>
              &nbsp;&gt;&nbsp;
              <Link href="/utility-bills" style={{ color: "#5F5C5C", textDecoration: "none" }}>Utility Bills</Link>
            </div>

            <div className="ub-actions">
              <div className="ub-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="ub-badge" />
              </div>
              <div className="ub-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="ub-divider" />

          {/* ── Main Card ── */}
          <div className="ub-card">
            <div className="ub-card-content">

              {/* ── Top Section ── */}
              <div className="ub-top-section">
                <div className="ub-view-trans">
                  <span className="ub-view-trans-label">View Transactions of</span>
                  <div className="ub-prop-pill">
                    <Image src="/line.png" alt="property icon" width={14} height={14} />
                    Flat # 12, City Trade Center
                  </div>
                </div>

                <div className="ub-select-months">
                  <span className="ub-months-label">Select Months</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "8px", fontWeight: 500, color: "#797979" }}>From</span>
                    <select
                      className="ub-month-dropdown"
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
                      className="ub-month-dropdown"
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
              <div className="ub-heading-row">
                <div className="ub-heading">
                  <div className="ub-heading-title">
                    <span className="ub-heading-util">Utility Bills:</span>
                    <span className="ub-heading-address">Flat # 12, 3rd Floor, CTC</span>
                  </div>
                  <div className="ub-property-info" style={{ borderBottom: "none", margin: 0, padding: "8px 0" }}>
                    <div className="ub-prop-info-item">
                      <span style={{ fontWeight: 400 }}>Property ID:</span>
                      <span>{propertyIdDisplay}</span>
                    </div>
                    <div className="ub-prop-info-item">
                      <span style={{ fontWeight: 400 }}>Location:</span>
                      <span>New City Phase II, Wahcantt</span>
                    </div>
                    <div className="ub-prop-info-item">
                      <span style={{ fontWeight: 400 }}>Registered From:</span>
                      <span>DEC-2021</span>
                    </div>
                  </div>
                </div>
                <button className="ub-download-btn">
                  <MdDownload size={14} />
                  Download Bill Summary
                </button>
              </div>

              {/* ── Filter Row ── */}
              <div className="ub-filter-row">
                <span className="ub-filter-label">Filter:</span>
                <select
                  className="ub-filter-dropdown"
                  value={filterType}
                  onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                >
                  {billTypes.map(type => (
                    <option key={type} value={type}>{type === "All" ? "Type" : type}</option>
                  ))}
                </select>
                <select
                  className="ub-filter-dropdown"
                  value={filterStatus}
                  onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                >
                  {billStatuses.map(status => (
                    <option key={status} value={status}>{status === "All" ? "Status" : status}</option>
                  ))}
                </select>
              </div>

              {/* ── Desktop Table ── */}
              <div className="ub-table-wrapper ub-table-desktop">
                <table className="ub-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bill Type</th>
                      <th>Original Bill</th>
                      <th>Bill Status</th>
                      <th>Bill Amount</th>
                      <th style={{ width: "70px", textAlign: "center" }}>View Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "40px 12px", color: "#AAAAAA" }}>
                          No transactions found
                        </td>
                      </tr>
                    ) : (
                      paginatedTransactions.map((trans, idx) => (
                        <tr key={idx}>
                          <td>{trans.date}</td>
                          <td>{trans.billType}</td>
                          <td>
                            <span className="ub-view-bill-link">View Bill</span>
                          </td>
                          <td>{trans.billStatus}</td>
                          <td>{trans.billAmount.toLocaleString()}.00</td>
                          <td style={{ textAlign: "center" }}>
                            <span className="ub-view-receipt">
                              <Image src="/PdfRen.png" alt="PDF" width={10} height={10} style={{ objectFit: "contain" }} />
                              View Receipt
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile Cards ── */}
              <div className="ub-table-mobile">
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
                        <span style={{ fontWeight: 700, fontSize: "12px", color: "#2255A6" }}>{trans.billType}</span>
                        <span style={{ fontSize: "11px", color: "#848484" }}>{trans.date}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span className="ub-view-bill-link">View Bill</span>
                      </div>
                      <div style={{ height: "1px", backgroundColor: "#E0E0E0" }} />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
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
            <div className="ub-footer">
              <div className="ub-footer-left">
                Transaction Displayed: {paginatedTransactions.length}
              </div>

              <div className="ub-pagination">
                <button
                  className={`ub-pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  title="Previous"
                >
                  <MdChevronLeft size={16} color={currentPage === 1 ? "#CCC" : "#FE7A42"} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`ub-pagination-btn ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className={`ub-pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
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
          <div className="ub-footer-illustration" />
        </div>
      </div>
    </>
  );
}
