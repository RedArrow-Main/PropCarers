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
import { usePropertiesData } from '@/lib/useProperties';
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

export default function AgreementsPage() {
  const { allProperties } = usePropertiesData();
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
        .agr-root {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: #F5F4F4;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .agr-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
          position: relative;
        }
        .agr-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px 5px;
          background-color: transparent;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 10px;
        }
        .agr-breadcrumb {
          font-weight: 600;
          font-size: 20px;
          color: #5F5C5C;
          white-space: nowrap;
        }
        .agr-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .agr-icon-btn {
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
        .agr-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #FE7A42;
          border: 2px solid #F0F0F0;
        }
        .agr-divider {
          height: 1px;
          background-color: #B8B4B4;
          flex-shrink: 0;
          margin: 10px 28px;
        }
        .agr-card {
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
        .agr-tabs {
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
        .agr-tabs::-webkit-scrollbar { display: none; }
        .agr-tab {
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
        .agr-tab-label {
          font-size: 13px;
          white-space: nowrap;
        }
        .agr-list {
          flex: 1;
          overflow-y: auto;
          padding: 4px 16px;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-height: 0;
        }
        .agr-prop-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #EAEAEA;
        }
        .agr-prop-img {
          width: 102px;
          height: 102px;
          border-radius: 7px;
          overflow: hidden;
          flex-shrink: 0;
          background-color: #D9D9D9;
        }
        .agr-prop-info {
          flex: 1;
          min-width: 0;
        }
        .agr-prop-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 5px;
        }
        .agr-prop-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #000000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .agr-prop-addr {
          display: flex;
          align-items: flex-start;
          gap: 3px;
        }
        .agr-prop-addr-text {
          font-size: 12px;
          font-weight: 600;
          color: #979797;
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .agr-prop-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }
        .agr-contract-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 101px;
          height: 18px;
          background: #2356A6;
          color: #FFFFFF;
          border: none;
          border-radius: 2px;
          font-family: 'Montserrat', sans-serif;
          font-size: 7px;
          font-weight: 700;
          line-height: 9px;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
        }
        .agr-contract-btn:hover {
          background: #1E4C93;
        }
        .agr-rental-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 101px;
          height: 18px;
          background: #F28B60;
          color: #FFFFFF;
          border: none;
          border-radius: 2px;
          font-family: 'Montserrat', sans-serif;
          font-size: 7px;
          font-weight: 700;
          line-height: 9px;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
        }
        .agr-rental-btn:hover {
          background: #FE7A42;
        }
        .agr-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 16px;
          border-top: 1px solid #F0F0F0;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .agr-page-btn {
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
        .agr-page-num-btn {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .agr-footer-illustration {
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
          .agr-root      { height: auto; min-height: 100vh; overflow: visible; padding-bottom: 64px; }
          .agr-right     { height: auto; overflow: visible; }
          .agr-header    { padding: 14px 16px 5px; }
          .agr-breadcrumb { font-size: 14px; white-space: normal; }
          .agr-divider   { margin: 8px 14px; }
          .agr-card      { margin: 0 12px 16px; border-radius: 12px; }
          .agr-tabs      { gap: 4px; padding: 10px 8px; }
          .agr-tab       { padding: 7px 8px; min-width: 52px; }
          .agr-tab-label { font-size: 10px; }
          .agr-list      { padding: 4px 12px; }
          .agr-prop-card { gap: 8px; }
          .agr-prop-img  { width: 80px; height: 80px; border-radius: 8px; }
          .agr-prop-title { font-size: 16px; }
          .agr-prop-addr-text { font-size: 10px; }
          .agr-contract-btn { width: 80px; font-size: 6px; height: 15px; }
          .agr-rental-btn   { width: 80px; font-size: 6px; height: 15px; }
        }

        @media (min-width: 640px) {
          .agr-header    { padding: 16px 40px 5px; }
          .agr-card      { margin: 0 44px 44px; }
          .agr-divider   { margin: 10px 32px; }
          .agr-tabs      { gap: 6px; padding: 16px 20px 14px; }
          .agr-tab       { padding: 10px 14px; min-width: 72px; }
          .agr-tab-label { font-size: 14px; }
          .agr-list      { padding: 6px 20px; }
          .agr-prop-img  { width: 102px; height: 102px; }
        }

        @media (min-width: 1024px) {
          .agr-header  { padding: 20px 100px 10px; }
          .agr-card    { margin: 0 120px 20px; }
          .agr-divider { margin: 10px 100px; }
          .agr-tabs    { gap: 8px; padding: 20px 24px 16px; }
          .agr-tab     { padding: 10px 16px; min-width: 80px; }
          .agr-tab-label { font-size: 14px; }
          .agr-list    { padding: 8px 24px; }
        }
      `}</style>

      <div className="agr-root">

        {/* SIDEBAR */}
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />

        {/* RIGHT SIDE */}
        <div className="agr-right">

          {/* ── Header ── */}
          <div className="agr-header">
            <div className="agr-breadcrumb">
              <Link href="/" style={{ color: "#5F5C5C", textDecoration: "none" }}>Dashboard</Link>
              &nbsp;&gt;&nbsp;
              Agreements
            </div>

            <div className="agr-actions">
              <div className="agr-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="agr-badge" />
              </div>
              <div className="agr-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="agr-divider" />

          {/* ── Main Card ── */}
          <div className="agr-card">

            {/* ── Category Tabs ── */}
            <div className="agr-tabs">
              {categories.map(({ label, icon: Icon }) => {
                const isActive = activeCategory === label;
                return (
                  <button
                    key={label}
                    className="agr-tab"
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
                      <Icon size={24} color={isActive ? "#FFFFFF" : "#CACACA"} />
                    )}
                    <span
                      className="agr-tab-label"
                      style={{
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#FFFFFF" : "#5F5C5C",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Property List ── */}
            <div className="agr-list">
              {paginated.length === 0 ? (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  height: "100%", color: "#AAAAAA", fontSize: "15px",
                }}>
                  No properties found in this category.
                </div>
              ) : paginated.map((property) => (
                <div key={property.id} className="agr-prop-card">
                  {/* Image */}
                  <div className="agr-prop-img">
                    <img
                      src={property.image}
                      alt={property.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Info */}
                  <div className="agr-prop-info">
                    <div className="agr-prop-title-row">
                      <Image src="/line.png" alt="property icon" width={18} height={18} />
                      <span className="agr-prop-title">{property.title}</span>
                    </div>
                    <div className="agr-prop-addr">
                      <MdLocationOn size={13} color="#FE7A42" style={{ flexShrink: 0, marginTop: "1px" }} />
                      <span className="agr-prop-addr-text">{property.address}</span>
                    </div>
                  </div>

                  {/* Agreement Buttons */}
                  <div className="agr-prop-right">
                    <Link href={`/agreements/${property.id}`} style={{ textDecoration: "none" }}>
                      <button className="agr-contract-btn">
                        PROPCARERS CONTRACT
                      </button>
                    </Link>
                    <Link href={`/agreements/${property.id}`} style={{ textDecoration: "none" }}>
                      <button className="agr-rental-btn">
                        RENTAL AGREEMENT
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="agr-pagination">
                <button
                  className="agr-page-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    backgroundColor: currentPage === 1 ? "#F0F0F0" : "#FFFFFF",
                    color: currentPage === 1 ? "#AAAAAA" : "#444",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    boxShadow: currentPage === 1 ? "none" : "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Prev Page <MdChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className="agr-page-num-btn"
                    onClick={() => setCurrentPage(page)}
                    style={{
                      backgroundColor: currentPage === page ? "#1E4C93" : "#FFFFFF",
                      color: currentPage === page ? "#FFFFFF" : "#FE7A42",
                      fontWeight: currentPage === page ? 700 : 400,
                      boxShadow: currentPage === page ? "none" : "0 1px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="agr-page-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    backgroundColor: currentPage === totalPages ? "#F0F0F0" : "#FFFFFF",
                    color: currentPage === totalPages ? "#AAAAAA" : "#444",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    boxShadow: currentPage === totalPages ? "none" : "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Next Page <MdChevronRight size={16} />
                </button>
              </div>
            )}

          </div>

          {/* Cityscape Footer Illustration */}
          <div className="agr-footer-illustration" />
        </div>
      </div>
    </>
  );
}
