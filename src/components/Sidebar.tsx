"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdDashboard, MdApartment, MdHandyman,
  MdDescription, MdBarChart, MdAssessment, MdSell,
  MdSettings, MdWarning, MdGridView, MdClose,
} from "react-icons/md";
import { FaHome, FaUserTie, FaIdBadge } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

interface SidebarProps {
  firstName: string;
  lastName: string;
  userAvatar?: string;
}

const navItems = [
  { label: "Dashboard",         href: "/dashboard",              icon: MdDashboard },
  { label: "My Properties",     href: "/dashboard/properties",   icon: MdApartment },
  { label: "Rentals",           href: "/rentals",                icon: FaHome },
  { label: "Maintenance",       href: "/maintenance",            icon: MdHandyman },
  { label: "Utility Bills",     href: "/utility-bills",          icon: RiMoneyDollarCircleLine },
  { label: "Agreements",        href: "/agreements",             icon: MdDescription },
  { label: "Finance Report",    href: "/finance-report",         icon: MdBarChart },
  { label: "Assets Valuations", href: "/assets-valuations",      icon: MdAssessment },
  { label: "Buy/Sell Property", href: "/buy-sell",               icon: MdSell },
  { label: "Settings",          href: "/settings",               icon: MdSettings },
  { label: "Submit An Issue",   href: "/submit-issue",           icon: MdWarning },
];

// Bottom nav — 5 primary items + "More" trigger
const bottomNavItems = [
  { label: "Dashboard",    href: "/dashboard",            icon: MdDashboard },
  { label: "Properties",  href: "/dashboard/properties", icon: MdApartment },
  { label: "Rentals",     href: "/rentals",              icon: FaHome },
  { label: "Maintenance", href: "/maintenance",          icon: MdHandyman },
  { label: "Settings",    href: "/settings",             icon: MdSettings },
];

// Extra items shown in the "More" slide-up drawer
const moreNavItems = [
  { label: "Utility Bills",     href: "/utility-bills",     icon: RiMoneyDollarCircleLine },
  { label: "Agreements",        href: "/agreements",         icon: MdDescription },
  { label: "Finance Report",    href: "/finance-report",     icon: MdBarChart },
  { label: "Assets Valuations", href: "/assets-valuations",  icon: MdAssessment },
  { label: "Buy/Sell Property", href: "/buy-sell",           icon: MdSell },
  { label: "Submit An Issue",   href: "/submit-issue",       icon: MdWarning },
];

export default function Sidebar({ firstName, lastName, userAvatar }: SidebarProps) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const isActiveHref = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/dashboard/properties")
      return pathname.startsWith("/dashboard/properties") || pathname.startsWith("/dashboard/property");
    return pathname === href;
  };

  return (
    <>
      <style>{`
        /* ── Mobile bottom nav (< 640px) ── */
        .sidebar-bottom-nav {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 64px;
          background-color: #FFFFFF;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.10);
          border-top: 1px solid #F0F0F0;
          align-items: center;
          justify-content: space-around;
          padding: 0 8px;
          font-family: var(--font-josefin-sans), sans-serif;
        }

        /* ── Slim icon sidebar (640px–1023px) ── */
        .sidebar-slim {
          display: none;
          width: 64px;
          height: 100vh;
          background-color: #FFFFFF;
          border-radius: 0 16px 16px 0;
          box-shadow: 4px 0 16px rgba(0,0,0,0.08);
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          overflow-y: hidden;
          padding: 16px 0;
          gap: 4px;
          font-family: var(--font-josefin-sans), sans-serif;
        }

        /* ── Full sidebar (1024px+) ── */
        .sidebar-full {
          display: none;
          width: 230px;
          height: 100vh;
          background-color: #FFFFFF;
          border-radius: 0 24px 24px 0;
          box-shadow: 4px 0 24px rgba(0,0,0,0.08);
          flex-direction: column;
          flex-shrink: 0;
          overflow-y: hidden;
          font-family: var(--font-josefin-sans), sans-serif;
        }

        @media (min-width: 640px) {
          .sidebar-bottom-nav { display: none; }
          .sidebar-slim        { display: flex; }
          .sidebar-full        { display: none; }
        }

        @media (min-width: 1024px) {
          .sidebar-slim { display: none; }
          .sidebar-full { display: flex; }
        }

        /* Bottom nav item */
        .bnav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          flex: 1;
          padding: 6px 4px;
          text-decoration: none;
          border-radius: 12px;
          transition: background-color 0.15s ease;
          cursor: pointer;
        }

        .bnav-label {
          font-size: 9px;
          font-weight: 600;
          white-space: nowrap;
          font-family: var(--font-josefin-sans), sans-serif;
        }

        /* Slim sidebar item */
        .slim-item {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          border-radius: 10px;
          margin: 0 8px;
          width: calc(100% - 16px);
          transition: background-color 0.15s ease;
        }

        /* ── More drawer backdrop ── */
        .more-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 98;
          background-color: rgba(0,0,0,0.4);
        }
        .more-backdrop.open { display: block; }

        /* ── More slide-up drawer ── */
        .more-drawer {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 64px;
          z-index: 99;
          background-color: #FFFFFF;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.15);
          padding: 0 0 16px;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .more-drawer.open { transform: translateY(0); }

        /* Drag handle */
        .more-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
        }
        .more-handle-bar {
          width: 36px;
          height: 4px;
          border-radius: 2px;
          background-color: #D0D0D0;
        }

        /* Drawer header */
        .more-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 20px 12px;
          border-bottom: 1px solid #F0F0F0;
          margin-bottom: 8px;
        }
        .more-drawer-title {
          font-size: 15px;
          font-weight: 700;
          color: #222;
          font-family: var(--font-josefin-sans), sans-serif;
        }
        .more-close-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #F5F5F5;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Drawer grid: 3 columns */
        .more-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          padding: 8px 16px;
        }

        /* Each drawer item */
        .more-grid-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 8px;
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .more-grid-item:active { background-color: #FFF3EE; }

        .more-grid-label {
          font-size: 10px;
          font-weight: 600;
          color: #444;
          text-align: center;
          line-height: 1.3;
          font-family: var(--font-josefin-sans), sans-serif;
        }

        /* Hide drawer + backdrop on tablet/desktop */
        @media (min-width: 640px) {
          .more-backdrop { display: none !important; }
          .more-drawer   { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          MOBILE (< 640px): Fixed Bottom Nav Bar
      ══════════════════════════════════════════ */}
      <nav className="sidebar-bottom-nav">
        {bottomNavItems.map(({ label, href, icon: Icon }) => {
          const active = isActiveHref(href);
          return (
            <Link key={href} href={href} className="bnav-item" style={{ backgroundColor: active ? "#FFF3EE" : "transparent" }}>
              <Icon size={22} color={active ? "#FE7A42" : "#AAAAAA"} />
              <span className="bnav-label" style={{ color: active ? "#FE7A42" : "#AAAAAA" }}>
                {label}
              </span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          className="bnav-item"
          onClick={() => setMoreOpen(true)}
          style={{
            backgroundColor: moreOpen ? "#FFF3EE" : "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <MdGridView size={22} color={moreOpen ? "#FE7A42" : "#AAAAAA"} />
          <span className="bnav-label" style={{ color: moreOpen ? "#FE7A42" : "#AAAAAA" }}>More</span>
        </button>
      </nav>

      {/* ══════════════════════════════════════════
          MOBILE: Backdrop (closes drawer on tap)
      ══════════════════════════════════════════ */}
      <div
        className={`more-backdrop${moreOpen ? " open" : ""}`}
        onClick={() => setMoreOpen(false)}
      />

      {/* ══════════════════════════════════════════
          MOBILE: Slide-up "More" Drawer
      ══════════════════════════════════════════ */}
      <div className={`more-drawer${moreOpen ? " open" : ""}`}>
        {/* Drag handle */}
        <div className="more-handle">
          <div className="more-handle-bar" />
        </div>

        {/* Header */}
        <div className="more-drawer-header">
          <span className="more-drawer-title">More Options</span>
          <button className="more-close-btn" onClick={() => setMoreOpen(false)}>
            <MdClose size={16} color="#666" />
          </button>
        </div>

        {/* 3-column grid of nav items */}
        <div className="more-grid">
          {moreNavItems.map(({ label, href, icon: Icon }) => {
            const active = isActiveHref(href);
            return (
              <Link
                key={href}
                href={href}
                className="more-grid-item"
                onClick={() => setMoreOpen(false)}
                style={{ backgroundColor: active ? "#FFF3EE" : "transparent" }}
              >
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "12px",
                  backgroundColor: active ? "#FE7A42" : "#F5F5F5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} color={active ? "#FFFFFF" : "#FE7A42"} />
                </div>
                <span className="more-grid-label" style={{ color: active ? "#FE7A42" : "#444" }}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TABLET (640px–1023px): Slim Icon Sidebar
      ══════════════════════════════════════════ */}
      <aside className="sidebar-slim">
        <Image src="/logo.png" alt="PropCarers" width={36} height={36} style={{ objectFit: "contain", marginBottom: "10px" }} />
        <div style={{ height: "1px", backgroundColor: "#F0F0F0", width: "75%", marginBottom: "8px" }} />
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = isActiveHref(href);
          return (
            <Link key={href} href={href} title={label} style={{ textDecoration: "none", width: "100%" }}>
              <div className="slim-item" style={{ backgroundColor: active ? "#FE7A42" : "transparent" }}>
                <Icon size={20} color={active ? "#FFFFFF" : "#FE7A42"} />
              </div>
            </Link>
          );
        })}
      </aside>

      {/* ══════════════════════════════════════════
          DESKTOP (1024px+): Full Sidebar
      ══════════════════════════════════════════ */}
      <aside className="sidebar-full">
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "22px 20px 16px" }}>
          <Image src="/logo.png" alt="PropCarers Logo" width={130} height={38} style={{ objectFit: "contain" }} />
        </div>

        <div style={{ height: "1px", backgroundColor: "#E8E8E8", margin: "0 16px" }} />

        {/* User Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px" }}>
          <div style={{
            flexShrink: 0, width: "68px", height: "70px",
            borderRadius: "10px", backgroundColor: "#D9D9D9", position: "relative",
          }}>
            <div style={{
              position: "absolute", top: "7px", left: "10px",
              width: "49px", height: "54px", backgroundColor: "#FFFFFF",
              display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden",
            }}>
              {userAvatar
                ? <Image src={userAvatar} alt={`${firstName} ${lastName}`} width={49} height={54} style={{ objectFit: "cover" }} />
                : <FaUserTie size={38} color="#AAAAAA" style={{ marginBottom: "-2px" }} />
              }
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 0 }}>
            <div style={{ fontWeight: 400, fontSize: "14px", lineHeight: "1.3", color: "#444444" }}>
              Hi!{" "}
              <span style={{ fontWeight: 700, fontSize: "16px", color: "#1B4587" }}>
                {firstName} {lastName}
              </span>
            </div>
            <Link href="/profile" style={{ textDecoration: "none" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                padding: "4px 10px 4px 7px",
                backgroundColor: "#FE7A42", color: "#FFFFFF",
                borderRadius: "20px", fontSize: "11px", fontWeight: 600,
                cursor: "pointer", whiteSpace: "nowrap",
              }}>
                <FaIdBadge size={11} color="#FFFFFF" />
                View Profile
              </span>
            </Link>
          </div>
        </div>

        <div style={{ height: "1px", backgroundColor: "#E8E8E8", margin: "0 16px 4px" }} />

        {/* Nav Items */}
        <nav style={{
          padding: "4px 10px", display: "flex", flexDirection: "column",
          flex: 1, justifyContent: "space-evenly", minHeight: 0,
        }}>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActiveHref(href);
            return (
              <Link key={href} href={href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "9px 14px", borderRadius: "12px",
                  backgroundColor: active ? "#FE7A42" : "transparent",
                  color: active ? "#FFFFFF" : "#444444",
                  cursor: "pointer", transition: "background-color 0.15s ease",
                }}>
                  <Icon size={20} color={active ? "#FFFFFF" : "#FE7A42"} style={{ flexShrink: 0 }} />
                  <span style={{
                    fontSize: "14px", fontWeight: active ? 600 : 400,
                    letterSpacing: "0.01em", whiteSpace: "nowrap",
                  }}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "10px 16px 14px", textAlign: "center", borderTop: "1px solid #E8E8E8" }}>
          <p style={{ fontSize: "10px", fontWeight: 600, color: "#444444", margin: "0 0 2px" }}>
            Safeguard Your Rental Journey
          </p>
          <p style={{ fontSize: "9px", color: "#999999", margin: "0 0 6px" }}>
            © 2025 PropCarers. | Let Us Care Your Property
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
            {["Social Connect", "Privacy Policy", "Accessibility Statement"].map((link) => (
              <Link key={link} href="#" style={{ fontSize: "8px", color: "#AAAAAA", textDecoration: "none" }}>
                {link}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
