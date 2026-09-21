import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  HOTEL_INFO as DEFAULT_HOTEL_INFO,
  HERO_INFO as DEFAULT_HERO_INFO,
  DINING_INFO as DEFAULT_DINING_INFO,
  PACKAGES as DEFAULT_PACKAGES,
  SUPER_DELUXE_ROOM as DEFAULT_ROOM,
  NEARBY_ATTRACTIONS as DEFAULT_ATTRACTIONS,
  MENU_SPECIALS as DEFAULT_MENU,
  GUEST_REVIEWS as DEFAULT_REVIEWS,
  DIRECT_BOOKING_PERKS as DEFAULT_PERKS,
  FAQS as DEFAULT_FAQS,
} from '../data/hotelData';
import {
  RoomPackage,
  RoomDetails,
  NearbyAttraction,
  MenuItem,
  GuestReview,
  HeroContent,
  DiningInfo,
  DirectPerk,
} from '../types';

export interface HotelInfoData {
  name: string;
  tagline: string;
  subtitle: string;
  address: string;
  delhiOffice: string;
  phone1: string;
  phone1Clean: string;
  phone2: string;
  phone2Clean: string;
  email: string;
  website: string;
  starRating: number;
  reviewCount: number;
  totalRooms: number;
  locationArea: string;
  partners: { name: string; role: string }[];
  checkInTime: string;
  checkOutTime: string;
  childPolicy: string;
}

export interface FAQItem {
  id?: string;
  q: string;
  a: string;
}

export interface PromoCodeItem {
  code: string;
  discountPercent: number;
  active: boolean;
}

export interface CMSData {
  hotelInfo: HotelInfoData;
  heroInfo: HeroContent;
  diningInfo: DiningInfo;
  packages: RoomPackage[];
  roomInfo: RoomDetails;
  nearbyAttractions: NearbyAttraction[];
  menuSpecials: MenuItem[];
  directPerks: DirectPerk[];
  guestReviews: GuestReview[];
  faqs: FAQItem[];
  promoCodes: PromoCodeItem[];
  announcementText: string;
  videoUrl: string;
}

const CMS_STORAGE_KEY = 'mistwood_manor_full_cms_v3';

const initialHotelInfo: HotelInfoData = {
  ...DEFAULT_HOTEL_INFO,
  locationArea: 'Happy Valley',
};

export const defaultCMSData: CMSData = {
  hotelInfo: initialHotelInfo,
  heroInfo: DEFAULT_HERO_INFO,
  diningInfo: DEFAULT_DINING_INFO,
  packages: DEFAULT_PACKAGES,
  roomInfo: DEFAULT_ROOM,
  nearbyAttractions: DEFAULT_ATTRACTIONS,
  menuSpecials: DEFAULT_MENU,
  directPerks: DEFAULT_PERKS,
  guestReviews: DEFAULT_REVIEWS,
  faqs: DEFAULT_FAQS.map((f, i) => ({ id: `faq_${i + 1}`, ...f })),
  promoCodes: [
    { code: 'MISTWOOD10', discountPercent: 10, active: true },
    { code: 'EARLYBIRD', discountPercent: 10, active: true },
    { code: 'HAPPYVALLEY', discountPercent: 10, active: true },
    { code: 'DIRECT15', discountPercent: 15, active: true },
    { code: 'VYUVIK20', discountPercent: 20, active: true },
  ],
  announcementText: 'Best Seller at Best Price in Mussoorie • 100m to Buddha Temple & Dalai Hills',
  videoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
};

interface CMSContextType {
  data: CMSData;
  updateHotelInfo: (info: Partial<HotelInfoData>) => void;
  updateHeroInfo: (info: Partial<HeroContent>) => void;
  updateDiningInfo: (info: Partial<DiningInfo>) => void;
  updateRoomInfo: (info: Partial<RoomDetails>) => void;
  updateRoomPhotos: (photos: string[]) => void;
  updatePackage: (packageId: 'package_01' | 'package_02', updated: Partial<RoomPackage>) => void;
  updatePackages: (packages: RoomPackage[]) => void;
  addAttraction: (attraction: NearbyAttraction) => void;
  updateAttraction: (id: string, updated: Partial<NearbyAttraction>) => void;
  deleteAttraction: (id: string) => void;
  updateAttractions: (attractions: NearbyAttraction[]) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, updated: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  updateMenuItems: (items: MenuItem[]) => void;
  addDirectPerk: (perk: DirectPerk) => void;
  updateDirectPerk: (id: string, updated: Partial<DirectPerk>) => void;
  deleteDirectPerk: (id: string) => void;
  addGuestReview: (review: GuestReview) => void;
  updateGuestReview: (id: string, updated: Partial<GuestReview>) => void;
  deleteGuestReview: (id: string) => void;
  addFaq: (faq: FAQItem) => void;
  updateFaq: (index: number, updated: Partial<FAQItem>) => void;
  deleteFaq: (index: number) => void;
  updateAnnouncement: (text: string) => void;
  updateVideoUrl: (url: string) => void;
  addPromoCode: (code: string, discountPercent: number) => void;
  togglePromoCode: (code: string) => void;
  deletePromoCode: (code: string) => void;
  importFullCMS: (imported: Partial<CMSData>) => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCMSData,
          ...parsed,
          hotelInfo: { ...defaultCMSData.hotelInfo, ...(parsed.hotelInfo || {}) },
          heroInfo: { ...defaultCMSData.heroInfo, ...(parsed.heroInfo || {}) },
          diningInfo: { ...defaultCMSData.diningInfo, ...(parsed.diningInfo || {}) },
          packages: parsed.packages || defaultCMSData.packages,
          roomInfo: { ...defaultCMSData.roomInfo, ...(parsed.roomInfo || {}) },
          nearbyAttractions: parsed.nearbyAttractions || defaultCMSData.nearbyAttractions,
          menuSpecials: parsed.menuSpecials || defaultCMSData.menuSpecials,
          directPerks: parsed.directPerks || defaultCMSData.directPerks,
          guestReviews: parsed.guestReviews || defaultCMSData.guestReviews,
          faqs: parsed.faqs || defaultCMSData.faqs,
          promoCodes: parsed.promoCodes || defaultCMSData.promoCodes,
        };
      }
    } catch {
      // fallback
    }
    return defaultCMSData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // quota or private mode fallback
    }
  }, [data]);

  const updateHotelInfo = (info: Partial<HotelInfoData>) => {
    setData((prev) => ({
      ...prev,
      hotelInfo: { ...prev.hotelInfo, ...info },
    }));
  };

  const updateHeroInfo = (info: Partial<HeroContent>) => {
    setData((prev) => ({
      ...prev,
      heroInfo: { ...prev.heroInfo, ...info },
    }));
  };

  const updateDiningInfo = (info: Partial<DiningInfo>) => {
    setData((prev) => ({
      ...prev,
      diningInfo: { ...prev.diningInfo, ...info },
    }));
  };

  const updateRoomInfo = (info: Partial<RoomDetails>) => {
    setData((prev) => ({
      ...prev,
      roomInfo: { ...prev.roomInfo, ...info },
    }));
  };

  const updateRoomPhotos = (photos: string[]) => {
    setData((prev) => ({
      ...prev,
      roomInfo: {
        ...prev.roomInfo,
        images: photos,
      },
    }));
  };

  const updatePackage = (packageId: 'package_01' | 'package_02', updated: Partial<RoomPackage>) => {
    setData((prev) => ({
      ...prev,
      packages: prev.packages.map((pkg) => (pkg.id === packageId ? { ...pkg, ...updated } : pkg)),
    }));
  };

  const updatePackages = (packages: RoomPackage[]) => {
    setData((prev) => ({
      ...prev,
      packages,
    }));
  };

  const addAttraction = (attraction: NearbyAttraction) => {
    setData((prev) => ({
      ...prev,
      nearbyAttractions: [attraction, ...prev.nearbyAttractions],
    }));
  };

  const updateAttraction = (id: string, updated: Partial<NearbyAttraction>) => {
    setData((prev) => ({
      ...prev,
      nearbyAttractions: prev.nearbyAttractions.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    }));
  };

  const deleteAttraction = (id: string) => {
    setData((prev) => ({
      ...prev,
      nearbyAttractions: prev.nearbyAttractions.filter((a) => a.id !== id),
    }));
  };

  const updateAttractions = (attractions: NearbyAttraction[]) => {
    setData((prev) => ({
      ...prev,
      nearbyAttractions: attractions,
    }));
  };

  const addMenuItem = (item: MenuItem) => {
    setData((prev) => ({
      ...prev,
      menuSpecials: [...prev.menuSpecials, item],
    }));
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setData((prev) => ({
      ...prev,
      menuSpecials: prev.menuSpecials.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    }));
  };

  const deleteMenuItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      menuSpecials: prev.menuSpecials.filter((m) => m.id !== id),
    }));
  };

  const updateMenuItems = (items: MenuItem[]) => {
    setData((prev) => ({
      ...prev,
      menuSpecials: items,
    }));
  };

  const addDirectPerk = (perk: DirectPerk) => {
    setData((prev) => ({
      ...prev,
      directPerks: [...prev.directPerks, perk],
    }));
  };

  const updateDirectPerk = (id: string, updated: Partial<DirectPerk>) => {
    setData((prev) => ({
      ...prev,
      directPerks: prev.directPerks.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteDirectPerk = (id: string) => {
    setData((prev) => ({
      ...prev,
      directPerks: prev.directPerks.filter((p) => p.id !== id),
    }));
  };

  const addGuestReview = (review: GuestReview) => {
    setData((prev) => ({
      ...prev,
      guestReviews: [review, ...prev.guestReviews],
    }));
  };

  const updateGuestReview = (id: string, updated: Partial<GuestReview>) => {
    setData((prev) => ({
      ...prev,
      guestReviews: prev.guestReviews.map((r) => (r.id === id ? { ...r, ...updated } : r)),
    }));
  };

  const deleteGuestReview = (id: string) => {
    setData((prev) => ({
      ...prev,
      guestReviews: prev.guestReviews.filter((r) => r.id !== id),
    }));
  };

  const addFaq = (faq: FAQItem) => {
    setData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { ...faq, id: faq.id || `faq_${Date.now()}` }],
    }));
  };

  const updateFaq = (index: number, updated: Partial<FAQItem>) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, ...updated } : f)),
    }));
  };

  const deleteFaq = (index: number) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const updateAnnouncement = (text: string) => {
    setData((prev) => ({
      ...prev,
      announcementText: text,
    }));
  };

  const updateVideoUrl = (url: string) => {
    setData((prev) => ({
      ...prev,
      videoUrl: url,
    }));
  };

  const addPromoCode = (code: string, discountPercent: number) => {
    setData((prev) => ({
      ...prev,
      promoCodes: [...prev.promoCodes, { code: code.trim().toUpperCase(), discountPercent, active: true }],
    }));
  };

  const togglePromoCode = (code: string) => {
    setData((prev) => ({
      ...prev,
      promoCodes: prev.promoCodes.map((p) => (p.code === code ? { ...p, active: !p.active } : p)),
    }));
  };

  const deletePromoCode = (code: string) => {
    setData((prev) => ({
      ...prev,
      promoCodes: prev.promoCodes.filter((p) => p.code !== code),
    }));
  };

  const importFullCMS = (imported: Partial<CMSData>) => {
    setData((prev) => ({
      ...prev,
      ...imported,
    }));
  };

  const resetToDefaults = () => {
    setData(defaultCMSData);
    localStorage.removeItem(CMS_STORAGE_KEY);
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        updateHotelInfo,
        updateHeroInfo,
        updateDiningInfo,
        updateRoomInfo,
        updateRoomPhotos,
        updatePackage,
        updatePackages,
        addAttraction,
        updateAttraction,
        deleteAttraction,
        updateAttractions,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateMenuItems,
        addDirectPerk,
        updateDirectPerk,
        deleteDirectPerk,
        addGuestReview,
        updateGuestReview,
        deleteGuestReview,
        addFaq,
        updateFaq,
        deleteFaq,
        updateAnnouncement,
        updateVideoUrl,
        addPromoCode,
        togglePromoCode,
        deletePromoCode,
        importFullCMS,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
