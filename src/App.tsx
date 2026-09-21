import { useState } from 'react';
import { CMSProvider } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DirectBookingPerks } from './components/DirectBookingPerks';
import { RoomsSection } from './components/RoomsSection';
import { AttractionsRadar } from './components/AttractionsRadar';
import { DiningSection } from './components/DiningSection';
import { GuestReviewsWall } from './components/GuestReviewsWall';
import { TripPlannerAssistant } from './components/TripPlannerAssistant';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { BookingModal } from './components/BookingModal';
import { AdminCMSModal } from './components/AdminCMSModal';

function MainApp() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState<boolean>(false);
  const [bookingParams, setBookingParams] = useState<{
    checkIn?: string;
    checkOut?: string;
    packageId?: 'package_01' | 'package_02';
    adults?: number;
    children?: number;
  }>({});

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleHeroQuickBook = (params: {
    checkIn: string;
    checkOut: string;
    packageId: 'package_01' | 'package_02';
    adults: number;
    children: number;
  }) => {
    setBookingParams(params);
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (packageId: 'package_01' | 'package_02') => {
    setBookingParams((prev) => ({ ...prev, packageId }));
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Navigation with Weather Widget & Dynamic Booking Link */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main>
        {/* Hero Section with Live Booking Engine Bar & Motion Reveal */}
        <HeroSection onQuickBook={handleHeroQuickBook} />

        {/* Direct Booking Advantage */}
        <DirectBookingPerks onBookNow={handleOpenBooking} />

        {/* 18 Super Deluxe Rooms & Packages Showcase */}
        <RoomsSection onSelectPackage={handleSelectPackage} />

        {/* Happy Valley Attractions & Proximity Radar */}
        <AttractionsRadar />

        {/* In-House Rezzala Multicuisine Dining */}
        <DiningSection onSelectMapPackage={() => handleSelectPackage('package_02')} />

        {/* Happy Guests Wall & Testimonials */}
        <GuestReviewsWall />

        {/* Mussoorie Smart Itinerary & Trip Guide */}
        <TripPlannerAssistant onBookNow={handleOpenBooking} />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer with VYUVIK LABS Branding & Admin Portal Access */}
      <Footer onOpenBooking={handleOpenBooking} onOpenAdminCMS={() => setIsAdminCMSOpen(true)} />

      {/* Mobile Sticky Booking Bar */}
      <StickyMobileBar onOpenBooking={handleOpenBooking} />

      {/* Direct Booking Modal Engine with Transparent Math Calculation */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialParams={bookingParams}
      />

      {/* Full Management CMS Admin Portal Modal */}
      <AdminCMSModal
        isOpen={isAdminCMSOpen}
        onClose={() => setIsAdminCMSOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <MainApp />
    </CMSProvider>
  );
}
