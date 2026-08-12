'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { MdNotifications, MdChevronLeft, MdChevronRight, MdLocationOn } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';
import { usePropertiesData } from '@/lib/useProperties';
import type { PropertyCategory } from '@/lib/properties';
import { FaHome, FaBuilding, FaCity } from 'react-icons/fa';
import { MdApartment, MdLandscape } from 'react-icons/md';
import { TbBuildingEstate } from 'react-icons/tb';

const ITEMS_PER_PAGE = 4;

const categories: { label: PropertyCategory; icon: React.ElementType }[] = [
  { label: 'Residential', icon: FaHome },
  { label: 'Commercial', icon: FaBuilding },
  { label: 'Apartment', icon: FaCity },
  { label: 'Co-Space', icon: MdApartment },
  { label: 'Land', icon: MdLandscape },
  { label: 'All Properties', icon: TbBuildingEstate },
];

const valuationData = [
  { valuation: 'March,2023', amount: 47035000 },
  { valuation: 'March,2023', amount: 47035000 },
  { valuation: 'March,2023', amount: 47035000 },
  { valuation: 'March,2023', amount: 47035000 },
  { valuation: 'March,2023', amount: 47035000 },
  { valuation: 'March,2023', amount: 47035000 },
];

const forSaleProperties = [
  {
    title: 'Single Family House',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    rent: 45000,
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80',
  },
  {
    title: 'Single Family House',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    rent: 45000,
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80',
  },
  {
    title: 'Single Family House',
    address: 'D Markaz, Gulberg Greens. Islamabad',
    price: 11900000,
    rent: 45000,
    features: ['Newly Constructed', 'Double Story', 'Ideal Location'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  },
];

export default function AssetsValuationsPage() {
  const { allProperties } = usePropertiesData();
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>('Residential');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered =
    activeCategory === 'All Properties'
      ? allProperties
      : allProperties.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#F5F4F4', fontFamily: 'var(--font-josefin-sans), sans-serif' }}>
      <Sidebar firstName="Ali" lastName="Ahmed Khan" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px 5px', flexShrink: 0, flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontWeight: 400, fontSize: '24px', lineHeight: '24px', color: '#5F5C5C', whiteSpace: 'nowrap' }}>
            <Link href="/dashboard" style={{ color: '#5F5C5C', textDecoration: 'none' }}>Dashboard</Link>
            &nbsp;&gt;&nbsp;
            Asset Valuation
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#1C488C', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '13px', lineHeight: '16px', cursor: 'pointer', textDecoration: 'underline' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#FE7A42" strokeWidth="2" />
                <path d="M8 8h8M8 12h8M8 16h5" stroke="#FE7A42" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Request For Valuation
            </button>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
              <MdNotifications size={18} color="#FE7A42" />
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FE7A42' }} />
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', flexShrink: 0 }}>
              <BiLogOut size={18} color="#FE7A42" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 0, borderTop: '1px solid #B8B4B4', flexShrink: 0, margin: '0 32px' }} />

        {/* Main Card */}
        <div style={{ margin: '10px 32px 24px', background: '#FFFFFF', borderRadius: '15px', boxShadow: '2px 0px 12px rgba(0,0,0,0.08)', padding: '24px 28px 20px' }}>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', paddingBottom: '20px' }}>
            {categories.map(({ label, icon: Icon }) => {
              const isActive = activeCategory === label;
              return (
                <button
                  key={label}
                  onClick={() => { setActiveCategory(label); setCurrentPage(1); }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '10px 16px', border: 'none', borderRadius: '7px', cursor: 'pointer', minWidth: '80px',
                    backgroundColor: isActive ? '#FE7A42' : 'transparent',
                    fontFamily: "'Josefin Sans', sans-serif",
                  }}
                >
                  {label === 'Land' ? (
                    <Image
                      src="/Land.png"
                      alt="Land"
                      width={28}
                      height={28}
                      style={{
                        filter: isActive
                          ? 'brightness(0) invert(1)'
                          : 'brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)',
                      }}
                    />
                  ) : (
                    <Icon size={28} color={isActive ? '#FFFFFF' : '#CACACA'} />
                  )}
                  <span style={{ fontSize: '13px', fontWeight: 400, lineHeight: '13px', whiteSpace: 'nowrap', color: isActive ? '#FFFFFF' : '#5F5C5C' }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{ height: 0, borderTop: '1px solid #B8B4B4', margin: '0 0 4px' }} />

          {/* Property List */}
          <div style={{ padding: '4px 0' }}>
            {paginated.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#AAAAAA', fontSize: '15px', padding: '40px 0' }}>
                No properties found in this category.
              </div>
            ) : (
              paginated.map((property, idx) => {
                const val = valuationData[idx % valuationData.length];
                return (
                  <div key={property.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 0', borderBottom: '1px solid #F5F5F5', minWidth: 0 }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '7px', overflow: 'hidden', flexShrink: 0, background: '#D9D9D9' }}>
                      <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                          <circle cx="9.5" cy="9.5" r="8" stroke="#F47913" strokeWidth="1.5" fill="none" />
                          <line x1="9.5" y1="5" x2="9.5" y2="14" stroke="#F47913" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="5" y1="9.5" x2="14" y2="9.5" stroke="#F47913" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: '#000000' }}>{property.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, fontSize: '12px', lineHeight: '12px', color: '#979797' }}>
                        <MdLocationOn size={14} color="#FE7A42" style={{ flexShrink: 0 }} />
                        <span>{property.address}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '6px', lineHeight: '7px', color: '#1D1D1D', whiteSpace: 'nowrap' }}>Last Valuation: {val.valuation}</span>
                      <span style={{ background: '#F3790E', color: '#FFFFFF', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '13px', lineHeight: '20px', padding: '2px 8px', borderRadius: '3px', whiteSpace: 'nowrap' }}>PKR {val.amount.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 0 4px' }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', border: 'none', fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '8px', lineHeight: '10px', cursor: 'pointer', background: 'transparent', color: '#000000', opacity: currentPage === 1 ? 0.3 : 1 }}
            >
              Prev Page <MdChevronLeft size={10} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '15px',
                  border: 'none', cursor: 'pointer', borderRadius: '3px', padding: '2px 6px',
                  color: currentPage === page ? '#FFFFFF' : '#FE7A42',
                  backgroundColor: currentPage === page ? '#1E4C93' : 'transparent',
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', border: 'none', fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: '8px', lineHeight: '10px', cursor: 'pointer', background: 'transparent', color: '#000000', opacity: currentPage === totalPages ? 0.3 : 1 }}
            >
              Next Page <MdChevronRight size={10} />
            </button>
          </div>
        </div>

        {/* For Sale Section */}
        <div style={{ display: 'flex', gap: '20px', padding: '0 32px 32px' }}>
          {forSaleProperties.map((prop, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden', width: '200px', flexShrink: 0 }}>
              <div style={{ position: 'relative', width: '100%', height: '120px' }}>
                <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, background: '#F51414', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '18px', padding: '2px 8px', borderRadius: '0px 5px 0px 0px' }}>For Sale</div>
                <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', background: '#FF6421', color: '#FFFFFF', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '18px', padding: '2px 16px', borderRadius: '16px', whiteSpace: 'nowrap' }}>{prop.price.toLocaleString()} Pkr</div>
              </div>
              <div style={{ padding: '8px 10px 10px', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '11px', lineHeight: '14px', color: '#000000', margin: '0 0 2px' }}>{prop.title}</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '11px', lineHeight: '14px', color: '#FE7A42', margin: '0 0 4px' }}>Rented Monthly {prop.rent.toLocaleString()} Pkr</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '9px', lineHeight: '12px', color: '#575757', margin: '0 0 6px' }}>{prop.address}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '6px' }}>
                  {prop.features.map((f) => (
                    <span key={f} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '8px', lineHeight: '10px', color: '#000000', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#BFBFBF', flexShrink: 0 }} />
                      {f}
                    </span>
                  ))}
                </div>
                <button style={{ background: '#1F4D95', color: '#FFFFFF', border: 'none', borderRadius: '5px 5px 0px 0px', padding: '4px 16px', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '10px', lineHeight: '14px', cursor: 'pointer', width: '100%', marginTop: '4px' }}>Click For More</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Illustration */}
        <div style={{ width: '100%', minHeight: '100px', backgroundImage: 'url(/cityscape.png)', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom', backgroundSize: 'auto 100%', opacity: 0.15, pointerEvents: 'none', flexShrink: 0 }} />
      </div>
    </div>
  );
}
