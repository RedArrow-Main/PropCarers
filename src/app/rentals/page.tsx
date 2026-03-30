"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { MdLocationOn, MdNotifications, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaHome, FaBuilding, FaCity } from "react-icons/fa";
import { MdApartment, MdLandscape } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { allProperties } from "@/lib/properties";
import type { PropertyCategory } from "@/lib/properties";

const ITEMS_PER_PAGE = 4;

const categories: { label: PropertyCategory; icon: React.ElementType }[] = [
  { label: "Residential",    icon: FaHome },
  { label: "Commercial",     icon: FaBuilding },
  { label: "Apartment",      icon: MdApartment },
  { label: "Co-Space",       icon: FaCity },
  { label: "Land",           icon: MdLandscape },
  { label: "All Properties", icon: TbBuildingEstate },
];

export default function RentalsPage() {
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>("Residential");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeCategory === "All Properties"
    ? allProperties
    : allProperties.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: PropertyCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <>
      <style>{`
        .rent-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: #F0F0F0;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .rent-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }
        .rent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 5px;
          background-color: transparent;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }
        .rent-breadcrumb {
          font-weight: 600;
          font-size: 18px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .rent-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rent-icon-btn {
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
        .rent-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: #FE7A42;
          border: 2px solid #F0F0F0;
        }
        .rent-divider {
          height: 2px;
          background-color: #B8B4B4;
          flex-shrink: 0;
          margin: 10px 28px;
        }
        .rent-card {
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
        .rent-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 14px 12px 12px;
          border-bottom: 1px solid #F0F0F0;
          flex-shrink: 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .rent-tabs::-webkit-scrollbar { display: none; }
        .rent-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 12px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          min-width: 64px;
          flex-shrink: 0;
          transition: background-color 0.15s ease;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .rent-tab-label {
          font-size: 11px;
          white-space: nowrap;
        }
        .rent-list {
          flex: 1;
          overflow-y: auto;
          padding: 4px 16px;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-height: 0;
        }
        .rent-prop-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #F5F5F5;
        }
        .rent-prop-img {
          width: 80px;
          height: 64px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          background-color: #F0F0F0;
        }
        .rent-prop-info {
          flex: 1;
          min-width: 0;
        }
        .rent-prop-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 5px;
        }
        .rent-prop-title {
          font-size: 14px;
          font-weight: 700;
          color: #222;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rent-prop-addr {
          display: flex;
          align-items: flex-start;
          gap: 3px;
        }
        .rent-prop-addr-text {
          font-size: 11px;
          color: #888;
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .rent-prop-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }
        .rent-report-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 109px;
          height: 25px;
          background: #F28B60;
          color: #FFFFFF;
          border: none;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          font-family: var(--font-josefin-sans), sans-serif;
          white-space: nowrap;
          box-shadow: 0px 2px 4px rgba(0,0,0,0.25);
          flex-shrink: 0;
          padding: 0;
          vertical-align: middle;
        }
        .rent-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 16px;
          border-top: 1px solid #F0F0F0;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .rent-page-btn {
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 6px 10px;
          border: none;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .rent-page-num-btn {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-josefin-sans), sans-serif;
        }

        @media (max-width: 639px) {
          .rent-root      { height: auto; min-height: 100vh; overflow: visible; padding-bottom: 64px; }
          .rent-right     { height: auto; overflow: visible; }
          .rent-header    { padding: 14px 16px 5px; }
          .rent-breadcrumb { font-size: 14px; white-space: normal; }
          .rent-divider   { margin: 8px 14px; }
          .rent-card      { margin: 0 12px 16px; border-radius: 12px; }
          .rent-tabs      { gap: 4px; padding: 10px 8px; }
          .rent-tab       { padding: 7px 8px; min-width: 52px; }
          .rent-tab-label { font-size: 10px; }
          .rent-list      { padding: 4px 12px; }
          .rent-prop-img  { width: 64px; height: 52px; border-radius: 8px; }
          .rent-prop-title { font-size: 13px; }
          .rent-prop-addr-text { font-size: 10px; }
          .rent-report-btn { width: 90px; font-size: 9px; }
        }

        @media (min-width: 640px) {
          .rent-header    { padding: 16px 40px 5px; }
          .rent-card      { margin: 0 44px 44px; }
          .rent-divider   { margin: 10px 32px; }
          .rent-tabs      { gap: 6px; padding: 16px 20px 14px; }
          .rent-tab       { padding: 10px 14px; min-width: 72px; }
          .rent-tab-label { font-size: 18px; }
          .rent-list      { padding: 6px 20px; }
          .rent-prop-img  { width: 88px; height: 68px; }
          .rent-prop-title { font-size: 15px; }
          .rent-prop-addr-text { font-size: 12px; }
          .rent-report-btn { font-size: 11px; padding: 7px 14px; }
        }

        @media (min-width: 1024px) {
          .rent-header  { padding: 20px 100px 10px; }
          .rent-card    { margin: 0 120px 20px; }
          .rent-divider { margin: 10px 100px; }
          .rent-tabs    { gap: 8px; padding: 20px 24px 16px; }
          .rent-tab     { padding: 10px 16px; min-width: 80px; }
          .rent-list    { padding: 8px 24px; }
          .rent-prop-img { width: 90px; height: 70px; }
        }
      `}</style>

      <div className="rent-root">

        {/* SIDEBAR */}
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />

        {/* RIGHT SIDE */}
        <div className="rent-right">

          {/* ── Header ── */}
          <div className="rent-header">
            <div className="rent-breadcrumb">
              <Link href="/" style={{ color: "#5F5C5C", textDecoration: "none" }}>Dashboard</Link>
              &nbsp;&gt;&nbsp;
              Rentals
            </div>

            <div className="rent-actions">
              {/* Notification Bell */}
              <div className="rent-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="rent-badge" />
              </div>
              {/* Log Out */}
              <div className="rent-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="rent-divider" />

          {/* ── Main Card ── */}
          <div className="rent-card">

            {/* ── Category Tabs ── */}
            <div className="rent-tabs">
              {categories.map(({ label, icon: Icon }) => {
                const isActive = activeCategory === label;
                return (
                  <button
                    key={label}
                    className="rent-tab"
                    onClick={() => handleCategoryChange(label)}
                    style={{ backgroundColor: isActive ? "#FE7A42" : "transparent" }}
                  >
                    {label === "Land" ? (
                      <Image
                        src="/Land.png"
                        alt="Land"
                        width={24}
                        height={24}
                        style={{
                          filter: isActive
                            ? "brightness(0) invert(1)"
                            : "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)",
                        }}
                      />
                    ) : (
                      <Icon size={24} color={isActive ? "#FFFFFF" : "#AAAAAA"} />
                    )}
                    <span
                      className="rent-tab-label"
                      style={{
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#FFFFFF" : "#888888",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Property List ── */}
            <div className="rent-list">
              {paginated.length === 0 ? (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  height: "100%", color: "#AAAAAA", fontSize: "15px",
                }}>
                  No properties found in this category.
                </div>
              ) : paginated.map((property) => (
                <div key={property.id} className="rent-prop-card">
                  {/* Image */}
                  <div className="rent-prop-img">
                    <img
                      src={property.image}
                      alt={property.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Info */}
                  <div className="rent-prop-info">
                    <div className="rent-prop-title-row">
                      <Image src="/line.png" alt="property icon" width={18} height={18} />
                      <span className="rent-prop-title">{property.title}</span>
                    </div>
                    <div className="rent-prop-addr">
                      <MdLocationOn size={13} color="#FE7A42" style={{ flexShrink: 0, marginTop: "1px" }} />
                      <span className="rent-prop-addr-text">{property.address}</span>
                    </div>
                  </div>

                  {/* Rental Report Button */}
                  <div className="rent-prop-right">
                    <Link href={`/rentals/${property.id}`} style={{ textDecoration: "none" }}>
                      <button className="rent-report-btn">
                        <Image
                          src="/PdfRen.png"
                          alt="PDF"
                          width={14}
                          height={14}
                          style={{ objectFit: "contain", flexShrink: 0, display: "block" }}
                        />
                        Rental Report
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="rent-pagination">
                <button
                  className="rent-page-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    backgroundColor: currentPage === 1 ? "#F0F0F0" : "#FFFFFF",
                    color: currentPage === 1 ? "#AAAAAA" : "#444",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    boxShadow: currentPage === 1 ? "none" : "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <MdChevronLeft size={16} /> Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className="rent-page-num-btn"
                    onClick={() => setCurrentPage(page)}
                    style={{
                      backgroundColor: currentPage === page ? "#2356A6" : "#FFFFFF",
                      color: currentPage === page ? "#FFFFFF" : "#444",
                      fontWeight: currentPage === page ? 700 : 400,
                      boxShadow: currentPage === page ? "none" : "0 1px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="rent-page-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    backgroundColor: currentPage === totalPages ? "#F0F0F0" : "#FFFFFF",
                    color: currentPage === totalPages ? "#AAAAAA" : "#444",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    boxShadow: currentPage === totalPages ? "none" : "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Next <MdChevronRight size={16} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
