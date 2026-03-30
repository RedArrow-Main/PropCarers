"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { allProperties } from "@/lib/properties";
import { MdNotifications, MdSecurity, MdStairs } from "react-icons/md";
import { FaBed, FaBath, FaUtensils, FaPlus } from "react-icons/fa";
import { BiCalendar, BiLogOut } from "react-icons/bi";
import { TbRulerMeasure } from "react-icons/tb";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June"];

const statusColors: Record<string, string> = {
  RENTED: "#FE7A42",
  VACANT: "#4CAF50",
  MAINTENANCE: "#F44336",
};

export default function PropertyDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const property = allProperties.find((p) => p.id === id);

  const [imgIdx, setImgIdx] = useState(0);

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Property not found.
      </div>
    );
  }

  const { detail } = property;
  const images = detail.images;
  const maxVal = Math.max(...detail.monthlyData, 1);
  const highlightIdx = detail.monthlyData.indexOf(Math.max(...detail.monthlyData));

  const prevImg = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % images.length);

  // Feature icons
  const features = [
    { icon: <TbRulerMeasure size={22} color="#fff" />, label: detail.area, highlight: true },
    ...(detail.builtYear > 0 ? [{ icon: <BiCalendar size={22} color="#FE7A42" />, label: `Built ${detail.builtYear}`, highlight: false }] : []),
    ...(detail.bedrooms > 0 ? [{ icon: <FaBed size={22} color="#FE7A42" />, label: `${detail.bedrooms} Bedrooms`, highlight: false }] : []),
    ...(detail.baths > 0 ? [{ icon: <FaBath size={22} color="#FE7A42" />, label: `${detail.baths} Baths`, highlight: false }] : []),
    ...(detail.kitchens > 0 ? [{ icon: <FaUtensils size={22} color="#FE7A42" />, label: `${detail.kitchens} Kitchens`, highlight: false }] : []),
    ...(detail.floors > 0 ? [{ icon: <MdStairs size={22} color="#FE7A42" />, label: `${detail.floors} Floors`, highlight: false }] : []),
    { icon: <MdSecurity size={22} color={detail.surveillance ? "#FE7A42" : "#ccc"} />, label: "Surveillance", highlight: false },
  ];

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#F5F5F5", fontFamily: "var(--font-josefin-sans), sans-serif" }}
    >
      {/* Sidebar */}
      <Sidebar firstName="Muhammad" lastName="Jamal" />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden" style={{ minWidth: 0 }}>

        {/* ── Header ── */}
        <style>{`
          .pd-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 60px 10px; background-color: #F5F5F5; flex-shrink: 0; flex-wrap: wrap; gap: 8px; }
          .pd-breadcrumb { font-size: 18px; color: #444; font-weight: 600; font-family: var(--font-josefin-sans), sans-serif; display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
          .pd-actions { display: flex; align-items: center; gap: 10px; flex-wrap: nowrap; }
          .pd-add-btn { display: flex; align-items: center; gap: 6px; background-color: #1B4587; color: #fff; border: none; border-radius: 8px; padding: 6px 14px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: var(--font-josefin-sans), sans-serif; white-space: nowrap; }
          .pd-icon-btn { width: 36px; height: 36px; background-color: #fff; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.10); cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .pd-divider { height: 2px; background-color: #E0E0E0; margin: 0 60px; flex-shrink: 0; }
          .pd-outer { flex: 1; overflow-y: auto; padding: 20px 20px 24px; display: flex; flex-direction: column; align-items: center; }
          .pd-white-card { background-color: #fff; border-radius: 16px; padding: 20px 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); width: 100%; max-width: 900px; box-sizing: border-box; overflow: hidden; position: relative; flex-shrink: 0; }
          .pd-top-btns { display: flex; justify-content: space-evenly; align-items: center; margin-bottom: 20px; gap: 8px; flex-wrap: wrap; }
          .pd-top-btn { height: 29px; border-radius: 5px; background: linear-gradient(180deg, #FFA27A 6.9%, #E86831 100%); box-shadow: 0px 2px 4px 0px #00000040; border: none; color: #fff; font-size: 11px; font-weight: 700; cursor: pointer; font-family: var(--font-josefin-sans), sans-serif; padding: 0 14px; white-space: nowrap; }
          .pd-content-row { display: flex; gap: 28px; align-items: flex-start; }
          .pd-overview-text { width: 100%; font-family: Montserrat, sans-serif; font-weight: 400; font-size: 14px; line-height: 20px; letter-spacing: 0.05em; text-align: justify; color: #555; margin: 0 0 16px 0; }
          .pd-bottom-row { display: flex; gap: 20px; flex-wrap: wrap; }
          .pd-blue-card { flex: 1; min-width: 220px; background-color: #1B3F7E; border-radius: 15px; padding: 20px 18px; display: flex; flex-direction: column; align-items: center; gap: 14px; box-sizing: border-box; }
          .pd-orange-card { flex: 2; min-width: 240px; background-color: #FE7A42; border-radius: 4px; padding: 20px 24px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; }
          .pd-divider-inner { border-top: 1px solid #E0E0E0; margin: 20px 0; }

          @media (max-width: 639px) {
            .pd-header    { padding: 12px 16px 8px; }
            .pd-breadcrumb { font-size: 14px; }
            .pd-add-btn span.add-label { display: none; }
            .pd-divider   { margin: 0 14px; }
            .pd-outer     { padding: 14px 12px 80px; }
            .pd-white-card { padding: 14px 14px; border-radius: 12px; }
            .pd-content-row { flex-direction: column; gap: 16px; }
            .pd-top-btns  { gap: 6px; margin-bottom: 14px; }
            .pd-top-btn   { font-size: 10px; padding: 0 10px; height: 26px; }
            .pd-bottom-row { flex-direction: column; gap: 14px; }
            .pd-blue-card  { min-width: unset; width: 100%; flex-direction: row; flex-wrap: wrap; gap: 10px; align-items: flex-start; padding: 14px; border-radius: 12px; }
            .pd-orange-card { min-width: unset; width: 100%; }
          }

          @media (min-width: 640px) and (max-width: 1023px) {
            .pd-header    { padding: 14px 24px 10px; }
            .pd-divider   { margin: 0 24px; }
            .pd-outer     { padding: 20px 16px 24px; }
          }
        `}</style>

        <div className="pd-header">
          <div className="pd-breadcrumb">
            <Link href="/" style={{ color: "#444", textDecoration: "none" }}>Dashboard</Link>
            <span style={{ color: "#444", margin: "0 4px" }}>&gt;</span>
            <Link href="/dashboard" style={{ color: "#444", textDecoration: "none" }}>My Properties</Link>
          </div>
          <div className="pd-actions">
            <button className="pd-add-btn">
              <FaPlus size={11} />
              <span className="add-label">Add New Property</span>
            </button>
            <div className="pd-icon-btn">
              <MdNotifications size={20} color="#FE7A42" />
              <span style={{ position: "absolute", top: "6px", right: "6px", width: "8px", height: "8px", backgroundColor: "#FE7A42", borderRadius: "50%", border: "2px solid #fff" }} />
            </div>
            <div className="pd-icon-btn">
              <BiLogOut size={18} color="#FE7A42" />
            </div>
          </div>
        </div>

        {/* Thin divider */}
        <div className="pd-divider" />

        <div className="pd-outer">

          {/* ── Big White Card ── */}
          <div className="pd-white-card">

            {/* ── 4 Buttons Row ── */}
            <div className="pd-top-btns">
              {["View Contract", "Rental History", "Maintenance History", "Tenant Agreement"].map((label) => (
                <button key={label} className="pd-top-btn">{label}</button>
              ))}
            </div>

            {/* ── Content Row: Image + Overview + Features ── */}
            <div className="pd-content-row">

              {/* ── Image Carousel ── */}
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "100%", maxWidth: "220px" }}>
                {/* Image Frame */}
                <div style={{
                  width: "100%",
                  aspectRatio: "220/230",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#eee",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}>
                  <Image
                    src={images[imgIdx]}
                    alt={`Property image ${imgIdx + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  {/* Left Arrow */}
                  {images.length > 1 && (
                    <button
                      onClick={prevImg}
                      style={{
                        position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.75)", border: "none", borderRadius: "50%",
                        width: "26px", height: "26px", display: "flex", alignItems: "center",
                        justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      <MdChevronLeft size={18} color="#333" />
                    </button>
                  )}
                  {/* Right Arrow */}
                  {images.length > 1 && (
                    <button
                      onClick={nextImg}
                      style={{
                        position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.75)", border: "none", borderRadius: "50%",
                        width: "26px", height: "26px", display: "flex", alignItems: "center",
                        justifyContent: "center", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      <MdChevronRight size={18} color="#333" />
                    </button>
                  )}
                </div>

                {/* Dot Indicators */}
                <div style={{ display: "flex", gap: "6px" }}>
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      style={{
                        width: i === imgIdx ? "18px" : "8px",
                        height: "8px",
                        borderRadius: "4px",
                        backgroundColor: i === imgIdx ? "#FE7A42" : "#ccc",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "width 0.2s, background-color 0.2s",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ── Property Overview + Features ── */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Title */}
                <h2 style={{
                  fontSize: "18px", fontWeight: 700, color: "#222",
                  margin: "0 0 10px 0", fontFamily: "var(--font-josefin-sans), sans-serif",
                }}>
                  Property Overview
                </h2>

                {/* Overview text */}
                <p className="pd-overview-text">
                  {detail.overview}
                </p>

                {/* Features heading */}
                <h3 style={{
                  fontSize: "15px", fontWeight: 700, color: "#222",
                  margin: "0 0 12px 0", fontFamily: "var(--font-josefin-sans), sans-serif",
                }}>
                  Features
                </h3>

                {/* Feature icons row */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {features.map((f, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", minWidth: "56px" }}>
                      <div style={{
                        width: "44px", height: "44px", borderRadius: "8px",
                        backgroundColor: f.highlight ? "#FE7A42" : "#FFF3EE",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      }}>
                        {f.icon}
                      </div>
                      <span style={{
                        fontSize: "10px", color: "#666", textAlign: "center",
                        fontFamily: "var(--font-josefin-sans), sans-serif", fontWeight: 600,
                      }}>
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Divider inside white card ── */}
            <div className="pd-divider-inner" />

            {/* ── Blue Card + Orange Summary Card (inside white card) ── */}
            <div className="pd-bottom-row">

            {/* ── Blue Current Status Card ── */}
            <div className="pd-blue-card">
              {/* Title */}
              <p style={{
                color: "#fff",
                fontFamily: "var(--font-josefin-sans), sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                margin: 0,
                textAlign: "center",
              }}>
                Current Status
              </p>

              {/* Status Badge */}
              <div style={{
                background: "linear-gradient(180deg, #FFA27A 6.9%, #E86831 100%)",
                borderRadius: "8px",
                padding: "6px 24px",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
              }}>
                <span style={{
                  color: "#fff",
                  fontFamily: "var(--font-josefin-sans), sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}>
                  {detail.status}
                </span>
              </div>

              {/* Info rows */}
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Starting Date:", value: detail.startingDate },
                  { label: "Tenant:", value: detail.tenant },
                  { label: "Tenant Contact:", value: detail.tenantContact },
                  { label: "Occupation:", value: detail.occupation },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                    <span style={{
                      color: "#fff",
                      fontFamily: "var(--font-josefin-sans), sans-serif",
                      fontWeight: 700,
                      fontSize: "10px",
                    }}>
                      {row.label}
                    </span>
                    <span style={{
                      color: "#cdd6e8",
                      fontFamily: "var(--font-josefin-sans), sans-serif",
                      fontWeight: 400,
                      fontSize: "10px",
                    }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* View Contract button */}
              <button style={{
                marginTop: "6px",
                width: "110px",
                height: "27px",
                borderRadius: "5px",
                background: "linear-gradient(180deg, #FFA27A 6.9%, #E86831 100%)",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
                border: "none",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-josefin-sans), sans-serif",
                lineHeight: 1,
              }}>
                View Contract
              </button>
            </div>

            {/* ── Orange Summary / Bar Chart Card ── */}
            <div className="pd-orange-card">
              {/* Title */}
              <p style={{
                color: "#fff",
                fontFamily: "var(--font-josefin-sans), sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                margin: 0,
              }}>
                Summary
              </p>

              {/* Y-axis labels + bars */}
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", flex: 1 }}>
                {/* Y-axis */}
                <div style={{
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  height: "120px", paddingBottom: "20px",
                }}>
                  {["$60k", "$30k", "$10k", "0"].map((label) => (
                    <span key={label} style={{
                      color: "#fff",
                      fontSize: "10px",
                      fontFamily: "var(--font-josefin-sans), sans-serif",
                      fontWeight: 600,
                      textAlign: "right",
                      minWidth: "32px",
                    }}>
                      {label}
                    </span>
                  ))}
                </div>

                {/* Bars */}
                <div style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "18px",
                  flex: 1,
                  height: "120px",
                }}>
                  {MONTHS.map((month, i) => {
                    const barH = detail.monthlyData[i] > 0
                      ? Math.max(10, (detail.monthlyData[i] / maxVal) * 100)
                      : 6;
                    const isHighlight = i === highlightIdx && detail.monthlyData[i] > 0;
                    return (
                      <div key={month} style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flex: 1,
                      }}>
                        <div style={{
                          width: "100%",
                          maxWidth: "36px",
                          height: `${barH}px`,
                          borderRadius: "4px 4px 0 0",
                          backgroundColor: isHighlight ? "#fff" : "rgba(255,255,255,0.35)",
                        }} />
                        <span style={{
                          color: "#fff",
                          fontSize: "10px",
                          fontFamily: "var(--font-josefin-sans), sans-serif",
                          fontWeight: 600,
                        }}>
                          {month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
