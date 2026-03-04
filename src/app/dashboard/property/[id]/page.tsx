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
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* ── Header ── */}
        {/* 📐 ADJUST: px-{n} = left/right padding | py-{n} = top/bottom padding */}
        <div
          className="flex items-center justify-between px-30 py-3"
          style={{ backgroundColor: "#F5F5F5", flexShrink: 0 }}
        >
          {/* Breadcrumb â€” matches Figma: "Dashboard > My Properties" */}
          <div
            className="flex items-center gap-1"
            style={{ fontSize: "20px", color: "#444", fontWeight: 600, fontFamily: "var(--font-josefin-sans), sans-serif" }}
          >
            <Link href="/" style={{ color: "#444", textDecoration: "none" }}>Dashboard</Link>
            <span style={{ color: "#444", margin: "7px 4px" }}>&gt;</span>
            <Link href="/dashboard" style={{ color: "#444", textDecoration: "none" }}>My Properties</Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Add New Property */}
            <button
              className="flex items-center gap-2"
              style={{
                backgroundColor: "#1B4587",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "6px 14px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-josefin-sans), sans-serif",
              }}
            >
              <FaPlus size={11} />
              Add New Property
            </button>

            {/* Bell */}
            <div
              style={{
                width: "36px", height: "36px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                cursor: "pointer",
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <MdNotifications size={20} color="#FE7A42" />
              <span
                style={{
                  position: "absolute", top: "6px", right: "6px",
                  width: "8px", height: "8px",
                  backgroundColor: "#FE7A42",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                }}
              />
            </div>

            {/* Logout */}
            <div
              style={{
                width: "36px", height: "36px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <BiLogOut size={18} color="#FE7A42" />
            </div>
          </div>
        </div>

        {/* Thin divider */}
        {/* 📐 ADJUST: margin "0 Xpx" = left/right indent of divider line | height = thickness */}
        <div style={{ height: "2px", backgroundColor: "#E0E0E0", margin: "-8px 120px", flexShrink: 0 }} />

        {/* ═══════════════════════════════════════════════════════
            📐 SIZE CONTROL VARIABLES — edit these to resize things
            ═══════════════════════════════════════════════════════

            OUTER AREA (grey background padding around white card):
              outerPadding: "top leftRight bottom"

            WHITE CARD:
              whiteCardMaxWidth  — max width of the white card  (e.g. "820px", "100%")
              whiteCardPadding   — inner breathing room          (e.g. "20px 28px")

            IMAGE:
              imageWidth / imageHeight — size of the property photo

            BLUE CARD (Current Status):
              blueCardWidth      — fixed width of blue card      (e.g. "200px")

            ORANGE CARD (Summary):
              orangeCardWidth    — fixed width of orange card    (e.g. "400px")
              chartHeight        — height of the bar chart       (e.g. "120px")
        ═══════════════════════════════════════════════════════ */}

        <div className="flex-1 overflow-y-auto" style={{ padding: "35px 60px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* ── Big White Card ── */}
          {/*
            ╔══════════════════════════════════════════════╗
            ║  📐 WHITE CARD SIZE — EDIT THESE VALUES      ║
            ║  width  = controls the WIDTH  of the card    ║
            ║  height = controls the HEIGHT of the card    ║
            ╚══════════════════════════════════════════════╝
          */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "20px 24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            width: "900px",    /* ← 📐 CARD WIDTH:  change this number */
            height: "750px",   /* ← 📐 CARD HEIGHT: change this number */
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
            boxSizing: "border-box",
          }}>

            {/* ── 4 Buttons Row — centered with equal gaps ── */}
            <div style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginBottom: "24px",
            }}>
              {["View Contract", "Rental History", "Maintenance History", "Tenant Agreement"].map((label) => (
                <button key={label} style={{
                  width: "120px",
                  height: "29px",
                  borderRadius: "5px",
                  background: "linear-gradient(180deg, #FFA27A 6.9%, #E86831 100%)",
                  boxShadow: "0px 2px 4px 0px #00000040",
                  backdropFilter: "blur(4px)",
                  border: "none",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-josefin-sans), sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                  flexShrink: 0,
                }}>
                  {label}
                </button>
              ))}
            </div>

            {/* ── Content Row: Image + Overview + Features ── */}
            <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>

              {/* ── Image Carousel ── */}
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                {/* Image Frame */}
                <div style={{
                  width: "220px",
                  height: "230px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#eee",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  left:"20px"
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
              <div style={{ flex: 1, paddingLeft: "20px" }}>
                {/* Title */}
                <h2 style={{
                  fontSize: "18px", fontWeight: 700, color: "#222",
                  margin: "0 0 10px 0", fontFamily: "var(--font-josefin-sans), sans-serif",
                }}>
                  Property Overview
                </h2>

                {/* Overview text */}
                <p style={{
                  width: "506px",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "0.05em",
                  textAlign: "justify",
                  color: "#555",
                  margin: "0 0 16px 0",
                }}>
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
            <div style={{
              width: "703px",
              height: "0px",
              borderTop: "1px solid #E0E0E0",
              margin: "24px 0",
            }} />

            {/* ── Blue Card + Orange Summary Card (inside white card) ── */}
            <div style={{ display: "flex", gap: "20px" }}>

            {/* ── Blue Current Status Card ── */}
            <div style={{
              width: "276px",
              height: "318px",
              flexShrink: 0,
              backgroundColor: "#1B3F7E",
              borderRadius: "15px",
              padding: "20px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              boxSizing: "border-box",
            }}>
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
            <div style={{
              width: "492px",
              height: "321px",
              flexShrink: 0,
              backgroundColor: "#FE7A42",
              borderRadius: "4px",
              padding: "20px 24px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
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
