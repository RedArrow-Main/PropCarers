"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { MdNotifications, MdDownload } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { allProperties, rentalTransactions } from "@/lib/properties";

const ITEMS_PER_PAGE = 5;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RentIncomeReportPage() {
  const params = useParams();
  const propertyId = parseInt(params.id as string, 10);
  const property = allProperties.find(p => p.id === propertyId);
  const transactions = rentalTransactions[propertyId] || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [fromMonth, setFromMonth] = useState("Jan-2023");
  const [toMonth, setToMonth] = useState("May-2023");

  if (!property) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <p>Property not found</p>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Format property ID
  const propertyIdDisplay = `#DM${String(property.id).padStart(5, "0")}`;

  return (
    <>
      <style>{`
        .report-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: #F0F0F0;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .report-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }
        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 5px;
          background-color: transparent;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }
        .report-breadcrumb {
          font-weight: 600;
          font-size: 18px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .report-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .report-icon-btn {
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
        .report-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: #FE7A42;
          border: 2px solid #F0F0F0;
        }
        .report-divider {
          height: 2px;
          background-color: #B8B4B4;
          flex-shrink: 0;
          margin: 10px 28px;
        }
        .report-card {
          flex: 1;
          margin: 0 40px 40px;
          background-color: #FFFFFF;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          min-height: 0;
        }
        .report-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 24px;
        }
        .report-top-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .report-view-trans {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .report-view-trans-label {
          font-size: 13px;
          color: #666666;
          font-weight: 500;
        }
        .report-prop-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: #E8E8E8;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          color: #333333;
        }
        .report-select-months {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .report-months-label {
          font-size: 13px;
          color: #666666;
          font-weight: 500;
          white-space: nowrap;
        }
        .report-month-dropdown {
          padding: 6px 10px;
          border: 1px solid #DDDDDD;
          border-radius: 6px;
          font-size: 12px;
          font-family: var(--font-josefin-sans), sans-serif;
          cursor: pointer;
          background-color: #FFFFFF;
          color: #333333;
        }
        .report-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .report-heading {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .report-heading-title {
          font-size: 16px;
          font-weight: 700;
          color: #222222;
        }
        .report-heading-address {
          font-size: 12px;
          color: #888888;
        }
        .report-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          background: linear-gradient(135deg, #FE7A42 0%, #F28B60 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-josefin-sans), sans-serif;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .report-property-info {
          display: flex;
          gap: 24px;
          margin-bottom: 20px;
          padding: 12px 0;
          border-bottom: 1px solid #F0F0F0;
          font-size: 12px;
        }
        .report-prop-info-item {
          display: flex;
          gap: 6px;
          color: #666666;
        }
        .report-prop-info-label {
          font-weight: 600;
          color: #333333;
        }
        .report-table-wrapper {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }
        .report-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }
        .report-table th {
          background-color: #1B3F7E;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          padding: 10px 12px;
          text-align: left;
          position: sticky;
          top: 0;
        }
        .report-table td {
          padding: 10px 12px;
          border: none;
        }
        .report-table tbody tr:nth-child(odd) {
          background-color: #FFFFFF;
        }
        .report-table tbody tr:nth-child(even) {
          background-color: #F8F9FF;
        }
        .report-table tbody tr:hover {
          background-color: #F0F4FF;
        }
        .report-pdf-icon {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .report-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          border-top: 1px solid #F0F0F0;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 12px;
        }
        .report-footer-left {
          color: #666666;
        }
        .report-pagination {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .report-pagination-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: 1px solid #DDDDDD;
          border-radius: 6px;
          background-color: #FFFFFF;
          cursor: pointer;
          font-size: 11px;
          font-family: var(--font-josefin-sans), sans-serif;
          transition: background-color 0.15s ease;
        }
        .report-pagination-btn:hover {
          background-color: #F5F5F5;
        }
        .report-pagination-btn.active {
          background-color: #FE7A42;
          color: #FFFFFF;
          border-color: #FE7A42;
        }
        .report-pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (min-width: 640px) {
          .report-header { padding: 16px 40px 5px; }
          .report-card { margin: 0 44px 44px; }
          .report-divider { margin: 10px 32px; }
          .report-card-content { padding: 28px; }
        }

        @media (min-width: 1024px) {
          .report-header { padding: 20px 100px 10px; }
          .report-card { margin: 0 120px 20px; }
          .report-divider { margin: 10px 100px; }
          .report-card-content { padding: 32px; }
        }
      `}</style>

      <div className="report-root">
        {/* SIDEBAR */}
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />

        {/* RIGHT SIDE */}
        <div className="report-right">
          {/* ── Header ── */}
          <div className="report-header">
            <div className="report-breadcrumb">
              <Link href="/" style={{ color: "#5F5C5C", textDecoration: "none" }}>Dashboard</Link>
              &nbsp;&gt;&nbsp;
              <Link href="/rentals" style={{ color: "#5F5C5C", textDecoration: "none" }}>Rental</Link>
            </div>

            <div className="report-actions">
              {/* Notification Bell */}
              <div className="report-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="report-badge" />
              </div>
              {/* Log Out */}
              <div className="report-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="report-divider" />

          {/* ── Main Card ── */}
          <div className="report-card">
            <div className="report-card-content">
              {/* Top Section: View Transactions + Select Months */}
              <div className="report-top-section">
                <div className="report-view-trans">
                  <span className="report-view-trans-label">View Transactions of</span>
                  <div className="report-prop-pill">
                    <Image src="/line.png" alt="property icon" width={14} height={14} />
                    {property.title}
                  </div>
                </div>

                <div className="report-select-months">
                  <span className="report-months-label">Select Months</span>
                  <select
                    className="report-month-dropdown"
                    value={fromMonth}
                    onChange={(e) => setFromMonth(e.target.value)}
                  >
                    {MONTHS.map((month, idx) => (
                      <option key={`from-${idx}`} value={`${month}-2023`}>
                        {month}-2023
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: "12px", color: "#999999" }}>to</span>
                  <select
                    className="report-month-dropdown"
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

              {/* Heading Row: Title + Address + Download Button */}
              <div className="report-heading-row">
                <div className="report-heading">
                  <div className="report-heading-title">Rent Income Report:</div>
                  <div className="report-heading-address">{property.address}</div>
                </div>
                <button className="report-download-btn">
                  <MdDownload size={14} />
                  Download Statement
                </button>
              </div>

              {/* Property Information Row */}
              <div className="report-property-info">
                <div className="report-prop-info-item">
                  <span className="report-prop-info-label">Property ID</span>
                  <span>{propertyIdDisplay}</span>
                </div>
                <div className="report-prop-info-item">
                  <span className="report-prop-info-label">Location</span>
                  <span>{property.address}</span>
                </div>
                <div className="report-prop-info-item">
                  <span className="report-prop-info-label">Registered From</span>
                  <span>{property.detail.startingDate}</span>
                </div>
              </div>

              {/* Table */}
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Month</th>
                      <th>Bank Account</th>
                      <th>Total Rent</th>
                      <th>Service Charges</th>
                      <th>Deposited</th>
                      <th style={{ width: "40px", textAlign: "center" }}>PDF</th>
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
                      paginatedTransactions.map((trans) => (
                        <tr key={trans.invoice}>
                          <td>{trans.invoice}</td>
                          <td>{trans.month}</td>
                          <td>{trans.bankAccount}</td>
                          <td>{trans.totalRent.toLocaleString()}</td>
                          <td>{trans.serviceCharges.toLocaleString()}</td>
                          <td>{trans.deposited.toLocaleString()}</td>
                          <td style={{ textAlign: "center" }}>
                            <div className="report-pdf-icon">
                              <Image
                                src="/PdfRen.png"
                                alt="PDF"
                                width={14}
                                height={14}
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer: Transaction Count + Pagination */}
            <div className="report-footer">
              <div className="report-footer-left">
                Transaction Displayed: {paginatedTransactions.length}
              </div>

              <div className="report-pagination">
                <button
                  className={`report-pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  title="Previous"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`report-pagination-btn ${currentPage === pageNum ? "active" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className={`report-pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  title="Next"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
