// ── Types ─────────────────────────────────────────────────────────────────────

export interface RentalTransaction {
  invoice: string;
  month: string;
  bankAccount: string;
  totalRent: number;
  serviceCharges: number;
  deposited: number;
}

export type PropertyCategory = "Residential" | "Commercial" | "Apartment" | "Co-Space" | "Land" | "All Properties";
export type RentalStatus = "RENTED" | "VACANT" | "MAINTENANCE";

export interface PropertyDetail {
  overview: string;
  builtYear: number;
  area: string;
  bedrooms: number;
  baths: number;
  kitchens: number;
  floors: number;
  surveillance: boolean;
  status: RentalStatus;
  startingDate: string;
  tenant: string;
  tenantContact: string;
  occupation: string;
  images: string[];
  monthlyData: number[]; // Jan–Jun revenue in thousands
}

export interface Property {
  id: number;
  title: string;
  address: string;
  monthlyRent: number;
  image: string;
  category: PropertyCategory;
  detail: PropertyDetail;
}

// ── Rental Transactions ────────────────────────────────────────────────────────
export const rentalTransactions: Record<number, RentalTransaction[]> = {
  1: [
    { invoice: "DEP0523GUL", month: "May-2023", bankAccount: "Alfalah 1223 Branch", totalRent: 45000, serviceCharges: 2250, deposited: 33000 },
    { invoice: "DEP0423GUL", month: "Apr-2023", bankAccount: "Faysal Bank 7460-6365", totalRent: 45000, serviceCharges: 2250, deposited: 42750 },
    { invoice: "DEP0323GUL", month: "Mar-2023", bankAccount: "Alfalah 1223 Branch", totalRent: 45000, serviceCharges: 2250, deposited: 42750 },
    { invoice: "DEP0223GUL", month: "Feb-2023", bankAccount: "Faysal Bank 7460-6365", totalRent: 45000, serviceCharges: 2250, deposited: 42750 },
    { invoice: "DEP0123GUL", month: "Jan-2023", bankAccount: "Alfalah 1223 Branch", totalRent: 45000, serviceCharges: 2250, deposited: 42750 },
  ],
  2: [
    { invoice: "DEP0523RES", month: "May-2023", bankAccount: "HBL Main Branch", totalRent: 95000, serviceCharges: 4750, deposited: 90250 },
    { invoice: "DEP0423RES", month: "Apr-2023", bankAccount: "HBL Main Branch", totalRent: 95000, serviceCharges: 4750, deposited: 90250 },
  ],
  3: [
    { invoice: "DEP0523SAR", month: "May-2023", bankAccount: "MCB Bank 3310", totalRent: 98000, serviceCharges: 4900, deposited: 93100 },
    { invoice: "DEP0423SAR", month: "Apr-2023", bankAccount: "MCB Bank 3310", totalRent: 98000, serviceCharges: 4900, deposited: 93100 },
    { invoice: "DEP0323SAR", month: "Mar-2023", bankAccount: "MCB Bank 3310", totalRent: 98000, serviceCharges: 4900, deposited: 93100 },
  ],
  5: [
    { invoice: "DEP0523COM", month: "May-2023", bankAccount: "UBL Commercial", totalRent: 150000, serviceCharges: 7500, deposited: 142500 },
    { invoice: "DEP0423COM", month: "Apr-2023", bankAccount: "UBL Commercial", totalRent: 130000, serviceCharges: 6500, deposited: 123500 },
    { invoice: "DEP0323COM", month: "Mar-2023", bankAccount: "UBL Commercial", totalRent: 120000, serviceCharges: 6000, deposited: 114000 },
  ],
  7: [
    { invoice: "DEP0523APT", month: "May-2023", bankAccount: "Meezan Bank", totalRent: 45000, serviceCharges: 2250, deposited: 42750 },
    { invoice: "DEP0423APT", month: "Apr-2023", bankAccount: "Meezan Bank", totalRent: 45000, serviceCharges: 2250, deposited: 42750 },
  ],
  8: [
    { invoice: "DEP0523STD", month: "May-2023", bankAccount: "Allied Bank", totalRent: 35000, serviceCharges: 1750, deposited: 33250 },
    { invoice: "DEP0423STD", month: "Apr-2023", bankAccount: "Allied Bank", totalRent: 35000, serviceCharges: 1750, deposited: 33250 },
  ],
  9: [
    { invoice: "DEP0523CWS", month: "May-2023", bankAccount: "HBL Tech Branch", totalRent: 25000, serviceCharges: 1250, deposited: 23750 },
  ],
  12: [
    { invoice: "DEP0523PNT", month: "May-2023", bankAccount: "SCB Islamabad", totalRent: 180000, serviceCharges: 9000, deposited: 171000 },
    { invoice: "DEP0423PNT", month: "Apr-2023", bankAccount: "SCB Islamabad", totalRent: 160000, serviceCharges: 8000, deposited: 152000 },
    { invoice: "DEP0323PNT", month: "Mar-2023", bankAccount: "SCB Islamabad", totalRent: 150000, serviceCharges: 7500, deposited: 142500 },
  ],
};

// ── Dummy Data ─────────────────────────────────────────────────────────────────
export const allProperties: Property[] = [
  {
    id: 1, title: "10 Marla Double Story", address: "House No D-12, Street # 3, D Markaz, Gulberg Residencia, Islamabad",
    monthlyRent: 86000, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&q=80", category: "Residential",
    detail: {
      overview: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
      builtYear: 2018, area: "10 Marla", bedrooms: 5, baths: 4, kitchens: 2, floors: 2, surveillance: true,
      status: "RENTED", startingDate: "01/01/2025", tenant: "Muhammad Jamaludeen", tenantContact: "+92 630 3010", occupation: "Civil Engineer",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      ],
      monthlyData: [20, 35, 28, 45, 60, 38],
    },
  },
  {
    id: 2, title: "10 Marla Double Story", address: "House No D-12, Street # 3, D Markaz, Gulberg Residencia, Islamabad",
    monthlyRent: 95000, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80", category: "Residential",
    detail: {
      overview: "A beautifully maintained double story house in a prime location with modern amenities and spacious rooms. Perfect for families looking for comfort and convenience in Islamabad.",
      builtYear: 2020, area: "10 Marla", bedrooms: 4, baths: 3, kitchens: 1, floors: 2, surveillance: true,
      status: "VACANT", startingDate: "–", tenant: "–", tenantContact: "–", occupation: "–",
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
      ],
      monthlyData: [30, 30, 30, 30, 0, 0],
    },
  },
  {
    id: 3, title: "10 Marla Double Story", address: "House No D-12, Street # 3, D Markaz, Gulberg Residencia, Islamabad",
    monthlyRent: 98000, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80", category: "Residential",
    detail: {
      overview: "Elegant property with top-notch finishing, surrounded by green landscapes. The house features premium fixtures, a spacious backyard, and a modern kitchen layout.",
      builtYear: 2019, area: "10 Marla", bedrooms: 5, baths: 5, kitchens: 2, floors: 2, surveillance: false,
      status: "RENTED", startingDate: "03/15/2024", tenant: "Sara Ahmed", tenantContact: "+92 300 1234567", occupation: "Doctor",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      ],
      monthlyData: [50, 55, 55, 55, 55, 55],
    },
  },
  {
    id: 4, title: "10 Marla Double Story", address: "House No D-12, Street # 3, D Markaz, Gulberg Residencia, Islamabad",
    monthlyRent: 99000, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80", category: "Residential",
    detail: {
      overview: "Spacious family home with excellent ventilation and natural lighting. Features a beautiful garden, covered parking for two vehicles, and a serene neighborhood.",
      builtYear: 2021, area: "10 Marla", bedrooms: 6, baths: 4, kitchens: 2, floors: 3, surveillance: true,
      status: "MAINTENANCE", startingDate: "–", tenant: "–", tenantContact: "–", occupation: "–",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      ],
      monthlyData: [60, 60, 60, 0, 0, 0],
    },
  },
  {
    id: 5, title: "Commercial Plaza", address: "Blue Area, Islamabad",
    monthlyRent: 250000, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80", category: "Commercial",
    detail: {
      overview: "Prime commercial plaza in the heart of Blue Area, Islamabad. Ground floor retail units with basement parking, high foot traffic, and excellent visibility from the main road.",
      builtYear: 2015, area: "4500 sq ft", bedrooms: 0, baths: 4, kitchens: 1, floors: 5, surveillance: true,
      status: "RENTED", startingDate: "06/01/2024", tenant: "Zara Retail Group", tenantContact: "+92 51 1112223", occupation: "Retail Business",
      images: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      ],
      monthlyData: [120, 140, 140, 150, 160, 250],
    },
  },
  {
    id: 6, title: "Office Space", address: "G-8 Markaz, Islamabad",
    monthlyRent: 120000, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80", category: "Commercial",
    detail: {
      overview: "Modern open-plan office space with partitioned cabins, a dedicated server room, and a large conference hall. Ideal for medium-sized companies seeking a professional address.",
      builtYear: 2017, area: "2200 sq ft", bedrooms: 0, baths: 3, kitchens: 1, floors: 1, surveillance: true,
      status: "VACANT", startingDate: "–", tenant: "–", tenantContact: "–", occupation: "–",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      ],
      monthlyData: [80, 80, 80, 80, 0, 0],
    },
  },
  {
    id: 7, title: "2 Bedroom Apartment", address: "Bahria Town, Phase 4, Rawalpindi",
    monthlyRent: 45000, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80", category: "Apartment",
    detail: {
      overview: "Cozy 2-bedroom apartment in the heart of Bahria Town. Gated community with 24/7 security, gym access, and a rooftop garden for residents.",
      builtYear: 2022, area: "1200 sq ft", bedrooms: 2, baths: 2, kitchens: 1, floors: 1, surveillance: true,
      status: "RENTED", startingDate: "09/01/2024", tenant: "Bilal Chaudhry", tenantContact: "+92 321 9876543", occupation: "Software Engineer",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      ],
      monthlyData: [25, 35, 40, 40, 40, 40],
    },
  },
  {
    id: 8, title: "Studio Apartment", address: "G-11 Markaz, Islamabad",
    monthlyRent: 35000, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80", category: "Apartment",
    detail: {
      overview: "Compact and fully furnished studio apartment perfect for young professionals. Close to shopping centres, restaurants and public transport hubs.",
      builtYear: 2023, area: "650 sq ft", bedrooms: 1, baths: 1, kitchens: 1, floors: 1, surveillance: false,
      status: "RENTED", startingDate: "01/15/2025", tenant: "Ayesha Malik", tenantContact: "+92 333 5556667", occupation: "Journalist",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      ],
      monthlyData: [20, 28, 30, 32, 33, 35],
    },
  },
  {
    id: 9, title: "Co-Working Space", address: "I-8 Markaz, Islamabad",
    monthlyRent: 25000, image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&q=80", category: "Co-Space",
    detail: {
      overview: "Dynamic co-working space with dedicated desks, private booths, and collaborative zones. Lightning-fast internet, unlimited coffee, and a vibrant startup community.",
      builtYear: 2021, area: "1800 sq ft", bedrooms: 0, baths: 2, kitchens: 1, floors: 1, surveillance: true,
      status: "RENTED", startingDate: "02/01/2025", tenant: "TechHub Pvt. Ltd.", tenantContact: "+92 51 9998887", occupation: "Tech Company",
      images: [
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
      ],
      monthlyData: [15, 18, 20, 22, 23, 25],
    },
  },
  {
    id: 10, title: "1 Kanal Plot", address: "DHA Phase 2, Islamabad",
    monthlyRent: 200000, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&q=80", category: "Land",
    detail: {
      overview: "Highly sought-after 1 Kanal residential plot in DHA Phase 2. Corner plot with three road access points. Ideal for constructing a luxury villa or investment.",
      builtYear: 0, area: "1 Kanal", bedrooms: 0, baths: 0, kitchens: 0, floors: 0, surveillance: false,
      status: "VACANT", startingDate: "–", tenant: "–", tenantContact: "–", occupation: "–",
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
      ],
      monthlyData: [0, 0, 0, 0, 0, 0],
    },
  },
  {
    id: 11, title: "5 Marla Plot", address: "Bahria Town, Lahore",
    monthlyRent: 80000, image: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=200&q=80", category: "Land",
    detail: {
      overview: "Prime 5 Marla plot in Bahria Town Lahore with all utilities available. Perfectly levelled land in a well-developed sector with parks and commercial areas nearby.",
      builtYear: 0, area: "5 Marla", bedrooms: 0, baths: 0, kitchens: 0, floors: 0, surveillance: false,
      status: "VACANT", startingDate: "–", tenant: "–", tenantContact: "–", occupation: "–",
      images: [
        "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=600&q=80",
      ],
      monthlyData: [0, 0, 0, 0, 0, 0],
    },
  },
  {
    id: 12, title: "Penthouse Apartment", address: "E-11, Islamabad",
    monthlyRent: 180000, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200&q=80", category: "Apartment",
    detail: {
      overview: "Stunning penthouse with panoramic views of the Margalla Hills. Features a private rooftop terrace, jacuzzi, and premium imported finishes throughout.",
      builtYear: 2022, area: "4000 sq ft", bedrooms: 5, baths: 6, kitchens: 2, floors: 2, surveillance: true,
      status: "RENTED", startingDate: "11/01/2024", tenant: "Omar Farooq", tenantContact: "+92 311 2223334", occupation: "CEO",
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
      ],
      monthlyData: [100, 130, 150, 160, 170, 180],
    },
  },
];
