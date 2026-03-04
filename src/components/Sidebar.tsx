"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard, MdApartment, MdHandyman,
  MdDescription, MdBarChart, MdAssessment, MdSell,
  MdSettings, MdWarning,
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
  { label: "Maintenance",       href: "/maintenance",       icon: MdHandyman },
  { label: "Utility Bills",     href: "/utility-bills",     icon: RiMoneyDollarCircleLine },
  { label: "Agreements",        href: "/agreements",        icon: MdDescription },
  { label: "Finance Report",    href: "/finance-report",    icon: MdBarChart },
  { label: "Assets Valuations", href: "/assets-valuations", icon: MdAssessment },
  { label: "Buy/Sell Property", href: "/buy-sell",          icon: MdSell },
  { label: "Settings",          href: "/settings",          icon: MdSettings },
  { label: "Submit An Issue",   href: "/submit-issue",      icon: MdWarning },
];

export default function Sidebar({ firstName, lastName, userAvatar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .sidebar-slim { display: flex; }
        .sidebar-full { display: none; }
        @media (min-width: 640px) {
          .sidebar-slim { display: none; }
          .sidebar-full { display: flex; }
        }
      `}</style>

      {/* ── MOBILE (< 640px): slim icon-only sidebar ── */}
      <aside
        className="sidebar-slim"
        style={{
          width: "60px",
          height: "100vh",
          backgroundColor: "#DADADA",
          borderRadius: "0 16px 16px 0",
          boxShadow: "4px 0 16px rgba(0,0,0,0.08)",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          overflowY: "hidden",
          padding: "16px 0",
          gap: "6px",
          fontFamily: "var(--font-josefin-sans), sans-serif",
        }}
      >
        <Image src="/logo.png" alt="PropCarers" width={32} height={32} style={{ objectFit: "contain", marginBottom: "8px" }} />
        <div style={{ height: "1px", backgroundColor: "#E8E8E8", width: "80%", marginBottom: "8px" }} />
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/dashboard"
            ? pathname === "/dashboard"
            : href === "/dashboard/properties"
            ? pathname.startsWith("/dashboard/properties") || pathname.startsWith("/dashboard/property")
            : pathname === href;
          return (
            <Link key={href} href={href} title={label} style={{ textDecoration: "none", width: "100%" }}>
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                padding: "10px 0", borderRadius: "10px", margin: "0 6px",
                backgroundColor: isActive ? "#FE7A42" : "transparent",
                transition: "background-color 0.15s ease",
              }}>
                <Icon size={20} color={isActive ? "#FFFFFF" : "#FE7A42"} />
              </div>
            </Link>
          );
        })}
      </aside>

      {/* ── TABLET, LAPTOP & DESKTOP (640px+): full sidebar ── */}
      <aside
        className="sidebar-full"
        style={{
          width: "230px",
          height: "100vh",
          backgroundColor: "#FFFFFF",
          borderRadius: "0 24px 24px 0",
          boxShadow: "4px 0 24px rgba(0,0,0,0.08)",
          flexDirection: "column",
          flexShrink: 0,
          overflowY: "hidden",
          fontFamily: "var(--font-josefin-sans), sans-serif",
        }}
      >
        {/* ── Logo ── */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          padding: "22px 20px 16px",
        }}>
          <Image src="/logo.png" alt="PropCarers Logo" width={130} height={38} style={{ objectFit: "contain" }} />
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#E8E8E8", margin: "0 16px" }} />

        {/* ── User Profile ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "14px 16px",
        }}>
          {/* Gray avatar box */}
          <div style={{
            flexShrink: 0,
            width: "68px", height: "70px",
            borderRadius: "10px",
            backgroundColor: "#D9D9D9",
            position: "relative",
          }}>
            <div style={{
              position: "absolute",
              top: "7px", left: "10px",
              width: "49px", height: "54px",
              backgroundColor: "#FFFFFF",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              overflow: "hidden",
            }}>
              {userAvatar
                ? <Image src={userAvatar} alt={`${firstName} ${lastName}`} width={49} height={54} style={{ objectFit: "cover" }} />
                : <FaUserTie size={38} color="#AAAAAA" style={{ marginBottom: "-2px" }} />
              }
            </div>
          </div>

          {/* Name + View Profile */}
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

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#E8E8E8", margin: "0 16px 4px" }} />

        {/* ── Nav Items ── */}
        <nav style={{
          padding: "4px 10px",
          display: "flex", flexDirection: "column",
          flex: 1,
          justifyContent: "space-evenly",
          minHeight: 0,
        }}>
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = href === "/dashboard"
              ? pathname === "/dashboard"
              : href === "/dashboard/properties"
              ? pathname.startsWith("/dashboard/properties") || pathname.startsWith("/dashboard/property")
              : pathname === href;
            return (
              <Link key={href} href={href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "9px 14px",
                  borderRadius: "12px",
                  backgroundColor: isActive ? "#FE7A42" : "transparent",
                  color: isActive ? "#FFFFFF" : "#444444",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                }}>
                  <Icon size={20} color={isActive ? "#FFFFFF" : "#FE7A42"} style={{ flexShrink: 0 }} />
                  <span style={{
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div style={{
          padding: "10px 16px 14px",
          textAlign: "center",
          borderTop: "1px solid #E8E8E8",
        }}>
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
