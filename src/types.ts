export interface RoomPackage {
  id: 'package_01' | 'package_02';
  name: string;
  code: string;
  badge?: string;
  description: string;
  basePrice: number; // for 2 persons
  extraPersonPrice: number;
  inclusions: string[];
  popular?: boolean;
}

export interface RoomDetails {
  id: string;
  title: string;
  inventory: number;
  description: string;
  size: string;
  bedType: string;
  maxOccupancy: string;
  view: string;
  images: string[];
  amenities: {
    icon: string;
    label: string;
    highlight?: boolean;
  }[];
  packages: RoomPackage[];
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  extraBeds: number;
  packageId: 'package_01' | 'package_02';
  roomsCount: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
  appliedPromo: string;
  discountAmount: number;
}

export interface NearbyAttraction {
  id: string;
  name: string;
  distance: string;
  distanceNumMeters: number;
  travelTime: string;
  type: 'walking' | 'short_drive' | 'day_trip';
  description: string;
  image: string;
  tag: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'indian_mains' | 'chinese' | 'beverages' | 'chef_specials';
  description: string;
  tag?: string;
  isVeg: boolean;
}

export interface DirectPerk {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface HeroContent {
  badgeText: string;
  mainHeading: string;
  subHeading: string;
  bgImage: string;
  chip1: string;
  chip2: string;
  chip3: string;
}

export interface DiningInfo {
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  partnerName: string;
  partnerRole: string;
  bgImage: string;
  operatingHours: string;
}

export interface GuestReview {
  id: string;
  guestName: string;
  city: string;
  tripType: string;
  rating: number;
  date: string;
  comment: string;
  verifiedStay: boolean;
  highlight: string;
}

