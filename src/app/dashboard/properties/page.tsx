"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { MdLocationOn, MdAdd, MdNotifications, MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
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

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "13px", fontWeight: 600,
  color: "#444", marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 12px",
  border: "1px solid #E0E0E0", borderRadius: "8px",
  fontSize: "13px", fontFamily: "var(--font-josefin-sans), sans-serif",
  color: "#333", outline: "none", boxSizing: "border-box",
  backgroundColor: "#FAFAFA",
};

function AddPropertyModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      backgroundColor: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{
        backgroundColor: "#FFFFFF", borderRadius: "16px",
        padding: "32px", width: "100%", maxWidth: "500px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        position: "relative",
        fontFamily: "var(--font-josefin-sans), sans-serif",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "16px",
          background: "none", border: "none", cursor: "pointer", padding: "4px",
        }}>
          <MdClose size={22} color="#444" />
        </button>
        <h2 style={{ margin: "0 0 20px", fontSize: "20px", fontWeight: 700, color: "#1B4587" }}>
          Add New Property
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={labelStyle}>Property Title</label>
            <input placeholder="e.g. 10 Marla Double Story" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle}>
              {categories.filter(c => c.label !== "All Properties").map(c => (
                <option key={c.label}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <input placeholder="Full property address" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Monthly Rent (PKR)</label>
            <input type="number" placeholder="e.g. 85000" style={inputStyle} />
          </div>
          <button style={{
            marginTop: "6px", padding: "12px",
            backgroundColor: "#FE7A42", color: "#FFFFFF",
            border: "none", borderRadius: "10px",
            fontSize: "15px", fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-josefin-sans), sans-serif",
          }}>
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>("Residential");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

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
        .dash-root { display: flex; height: 100vh; overflow: hidden; background-color: #F0F0F0; font-family: var(--font-josefin-sans), sans-serif; }
        .dash-right { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
        @media (max-width: 639px) {
          .dash-root  { height: auto; min-height: 100vh; overflow: visible; }
          .dash-right { height: auto; overflow: visible; }
        }
        .dash-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 32px 5px; background-color: transparent; flex-shrink: 0; flex-wrap: wrap; gap: 10px; }
        .dash-breadcrumb { font-weight: 600; font-size: 18px; color: #5F5C5C; white-space: nowrap; }
        .dash-actions { display: flex; align-items: center; gap: 10px; flex-wrap: nowrap; }
        .dash-add-btn { display: flex; align-items: center; justify-content: center; gap: 5px; padding: 6px 14px; height: 32px; background-color: #FE7A42; color: #FFFFFF; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: var(--font-josefin-sans), sans-serif; white-space: nowrap; }
        .dash-icon-btn { width: 36px; height: 36px; border-radius: 50%; background-color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; flex-shrink: 0; position: relative; }
        .dash-badge { position: absolute; top: -2px; right: -2px; width: 11px; height: 11px; border-radius: 50%; background-color: #FE7A42; border: 2px solid #F0F0F0; }
        .dash-divider { height: 2px; background-color: #B8B4B4; flex-shrink: 0; margin: 10px 28px; }
        .dash-card { flex: 1; margin: 0 40px 40px; background-color: #FFFFFF; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.06); min-height: 0; }
        .dash-tabs { display: flex; align-items: center; justify-content: center; gap: 4px; padding: 14px 12px 12px; border-bottom: 1px solid #F0F0F0; flex-shrink: 0; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .dash-tabs::-webkit-scrollbar { display: none; }
        .dash-tab { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; padding: 8px 12px; border: none; border-radius: 12px; cursor: pointer; min-width: 64px; flex-shrink: 0; transition: background-color 0.15s ease; font-family: var(--font-josefin-sans), sans-serif; }
        .dash-tab-label { font-size: 11px; white-space: nowrap; }
        .dash-list { flex: 1; overflow-y: auto; padding: 4px 16px; display: flex; flex-direction: column; gap: 0; min-height: 0; }
        .prop-card { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #F5F5F5; }
        .prop-img { width: 80px; height: 64px; border-radius: 10px; overflow: hidden; flex-shrink: 0; background-color: #F0F0F0; }
        .prop-info { flex: 1; min-width: 0; }
        .prop-title-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
        .prop-title { font-size: 14px; font-weight: 700; color: #222; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .prop-addr { display: flex; align-items: flex-start; gap: 3px; }
        .prop-addr-text { font-size: 11px; color: #888; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .prop-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
        .prop-rent-label { font-size: 9px; color: #888; text-align: right; }
        .prop-rent-value { font-size: 13px; font-weight: 700; color: #FE7A42; text-align: right; white-space: nowrap; }
        .prop-view-btn { padding: 6px 12px; background-color: #FE7A42; color: #FFFFFF; border: none; border-radius: 20px; font-size: 10px; font-weight: 600; cursor: pointer; font-family: var(--font-josefin-sans), sans-serif; white-space: nowrap; }
        .dash-pagination { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 16px; border-top: 1px solid #F0F0F0; flex-shrink: 0; flex-wrap: wrap; }
        .page-btn { display: flex; align-items: center; gap: 3px; padding: 6px 10px; border: none; border-radius: 8px; font-size: 11px; font-weight: 500; cursor: pointer; font-family: var(--font-josefin-sans), sans-serif; }
        .page-num-btn { width: 30px; height: 30px; border: none; border-radius: 8px; font-size: 12px; cursor: pointer; font-family: var(--font-josefin-sans), sans-serif; }
        @media (min-width: 640px) {
          .dash-header { padding: 16px 40px 5px; } .dash-card { margin: 0 44px 44px; } .dash-divider { margin: 10px 32px; }
          .dash-tabs { gap: 6px; padding: 16px 20px 14px; } .dash-tab { padding: 10px 14px; min-width: 72px; } .dash-tab-label { font-size: 18px; }
          .dash-list { padding: 6px 20px; } .prop-img { width: 88px; height: 68px; } .prop-title { font-size: 15px; }
          .prop-addr-text { font-size: 12px; } .prop-rent-label { font-size: 10px; } .prop-rent-value { font-size: 14px; } .prop-view-btn { font-size: 11px; padding: 7px 14px; }
        }
        @media (min-width: 1024px) {
          .dash-header { padding: 20px 100px 10px; } .dash-card { margin: 0 120px 20px; } .dash-divider { margin: 10px 100px; }
          .dash-tabs { gap: 8px; padding: 20px 24px 16px; } .dash-tab { padding: 10px 16px; min-width: 80px; }
          .dash-list { padding: 8px 24px; } .prop-img { width: 90px; height: 70px; } .dash-add-btn { font-size: 11px; }
        }
        @media (max-width: 639px) {
          /* Mobile: bottom nav is visible, add padding so content doesn't hide behind it */
          .dash-root     { padding-bottom: 64px; }
          .dash-header   { padding: 14px 16px 5px; }
          .dash-divider  { margin: 8px 14px; }
          .dash-card     { margin: 0 12px 16px; border-radius: 12px; }
          .dash-tabs     { gap: 4px; padding: 10px 8px; }
          .dash-tab      { padding: 7px 8px; min-width: 52px; }
          .dash-tab-label { font-size: 10px; }
          .dash-list     { padding: 4px 12px; }
          .prop-card     { gap: 8px; }
          .prop-img      { width: 64px; height: 52px; border-radius: 8px; }
          .prop-right    { gap: 4px; }
          .dash-breadcrumb { font-size: 14px; }
          .dash-add-btn span.add-label { display: none; }
          .dash-pagination { padding: 8px 12px; gap: 4px; }
        }

        @media (max-width: 479px) {
          .prop-title    { font-size: 13px; }
          .prop-rent-value { font-size: 12px; }
        }
      `}</style>

      <div className="dash-root">
        <Sidebar firstName="Ali" lastName="Ahmed Khan" />
        <div className="dash-right">
          <div className="dash-header">
            <div className="dash-breadcrumb">Dashboard &gt; My Properties</div>
            <div className="dash-actions">
              <button className="dash-add-btn" onClick={() => setShowModal(true)}>
                <MdAdd size={14} color="#FFFFFF" />
                <span className="add-label">Add New Property</span>
              </button>
              <div className="dash-icon-btn">
                <MdNotifications size={18} color="#FE7A42" />
                <div className="dash-badge" />
              </div>
              <div className="dash-icon-btn">
                <BiLogOut size={18} color="#FE7A42" />
              </div>
            </div>
          </div>

          <div className="dash-divider" />

          <div className="dash-card">
            <div className="dash-tabs">
              {categories.map(({ label, icon: Icon }) => {
                const isActive = activeCategory === label;
                return (
                  <button key={label} className="dash-tab" onClick={() => handleCategoryChange(label)} style={{ backgroundColor: isActive ? "#FE7A42" : "transparent" }}>
                    {label === "Land" ? (
                      <Image src="/Land.png" alt="Land" width={24} height={24} style={{ filter: isActive ? "brightness(0) invert(1)" : "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)" }} />
                    ) : (
                      <Icon size={24} color={isActive ? "#FFFFFF" : "#AAAAAA"} />
                    )}
                    <span className="dash-tab-label" style={{ fontWeight: isActive ? 600 : 400, color: isActive ? "#FFFFFF" : "#888888" }}>{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="dash-list">
              {paginated.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#AAAAAA", fontSize: "15px" }}>
                  No properties found in this category.
                </div>
              ) : paginated.map((property) => (
                <div key={property.id} className="prop-card">
                  <div className="prop-img">
                    <img src={property.image} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="prop-info">
                    <div className="prop-title-row">
                      <Image src="/line.png" alt="property icon" width={18} height={18} />
                      <span className="prop-title">{property.title}</span>
                    </div>
                    <div className="prop-addr">
                      <MdLocationOn size={13} color="#FE7A42" style={{ flexShrink: 0, marginTop: "1px" }} />
                      <span className="prop-addr-text">{property.address}</span>
                    </div>
                  </div>
                  <div className="prop-right">
                    <div>
                      <div className="prop-rent-label">Monthly Rent :</div>
                      <div className="prop-rent-value">{property.monthlyRent.toLocaleString()} Pkr</div>
                    </div>
                    <Link href={`/dashboard/property/${property.id}`} style={{ textDecoration: "none" }}>
                      <span className="prop-view-btn" style={{ display: "inline-block" }}>View All Details</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="dash-pagination">
                <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? "#F0F0F0" : "#FFFFFF", color: currentPage === 1 ? "#AAAAAA" : "#444", cursor: currentPage === 1 ? "not-allowed" : "pointer", boxShadow: currentPage === 1 ? "none" : "0 1px 4px rgba(0,0,0,0.1)" }}>
                  <MdChevronLeft size={16} /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} className="page-num-btn" onClick={() => setCurrentPage(page)} style={{ backgroundColor: currentPage === page ? "#2356A6" : "#FFFFFF", color: currentPage === page ? "#FFFFFF" : "#444", fontWeight: currentPage === page ? 700 : 400, boxShadow: currentPage === page ? "none" : "0 1px 4px rgba(0,0,0,0.1)" }}>
                    {page}
                  </button>
                ))}
                <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? "#F0F0F0" : "#FFFFFF", color: currentPage === totalPages ? "#AAAAAA" : "#444", cursor: currentPage === totalPages ? "not-allowed" : "pointer", boxShadow: currentPage === totalPages ? "none" : "0 1px 4px rgba(0,0,0,0.1)" }}>
                  Next <MdChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {showModal && <AddPropertyModal onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}
