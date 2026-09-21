import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  Building,
  DollarSign,
  Image as ImageIcon,
  Utensils,
  Tag,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  MapPin,
  Sparkles,
  Star,
  HelpCircle,
  Percent,
  Download,
  Upload,
  Shield,
  Clock,
  HeartHandshake,
  Check,
  Edit2,
  Layers,
  FileText,
  Phone,
  Mail,
  Globe,
  Sliders,
  Compass,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { NearbyAttraction, MenuItem, GuestReview, DirectPerk } from '../types';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab =
  | 'general'
  | 'hero'
  | 'rooms'
  | 'tariffs'
  | 'places'
  | 'dining'
  | 'perks'
  | 'reviews'
  | 'faqs'
  | 'promos'
  | 'backup';

export const AdminCMSModal = ({ isOpen, onClose }: AdminCMSModalProps) => {
  const {
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
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
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
    addPromoCode,
    togglePromoCode,
    deletePromoCode,
    importFullCMS,
    resetToDefaults,
  } = useCMS();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Logged in by default when opened from admin portal
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AdminTab>('general');
  const [saveToast, showToastMessage] = useState<string>('');
  const [jsonInput, setJsonInput] = useState<string>('');

  // 1. Hotel info form
  const [hotelForm, setHotelForm] = useState(data.hotelInfo);
  // 2. Hero form
  const [heroForm, setHeroForm] = useState(data.heroInfo);
  const [announcement, setAnnouncement] = useState(data.announcementText);
  // 3. Room details form
  const [roomForm, setRoomForm] = useState(data.roomInfo);
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('');
  const [newAmenityLabel, setNewAmenityLabel] = useState<string>('');
  const [newAmenityIcon, setNewAmenityIcon] = useState<string>('CheckCircle2');
  // 4. Packages form
  const [packagesList, setPackagesList] = useState(data.packages);
  // 5. Dining info form
  const [diningForm, setDiningForm] = useState(data.diningInfo);
  // 6. New Attraction form state
  const [newPlace, setNewPlace] = useState<Partial<NearbyAttraction>>({
    name: '',
    distance: '',
    distanceNumMeters: 500,
    travelTime: '',
    type: 'walking',
    description: '',
    image: '',
    tag: 'Must Visit',
  });
  // 7. New Dish form state
  const [newDish, setNewDish] = useState<Partial<MenuItem>>({
    name: '',
    category: 'indian_mains',
    description: '',
    tag: 'Chef Special',
    isVeg: true,
  });
  // 8. New Review form state
  const [newReview, setNewReview] = useState<Partial<GuestReview>>({
    guestName: '',
    city: '',
    tripType: 'Couple Getaway',
    rating: 5,
    date: 'Recent Stay',
    comment: '',
    verifiedStay: true,
    highlight: 'Amazing hospitality & serene views',
  });
  // 9. New Perk form state
  const [newPerk, setNewPerk] = useState<Partial<DirectPerk>>({
    title: '',
    desc: '',
    icon: 'Sparkles',
  });
  // 10. New FAQ form state
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  // 11. New Promo form state
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState(10);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    showToastMessage(msg);
    setTimeout(() => showToastMessage(''), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin' || pinInput === 'mistwood') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. (Default Master PIN: 1234)');
    }
  };

  // Sync state when data changes
  const refreshFromContext = () => {
    setHotelForm(data.hotelInfo);
    setHeroForm(data.heroInfo);
    setAnnouncement(data.announcementText);
    setRoomForm(data.roomInfo);
    setPackagesList(data.packages);
    setDiningForm(data.diningInfo);
  };

  const handleSaveHotelInfo = () => {
    updateHotelInfo(hotelForm);
    showToast('Hotel profile & contact information updated live!');
  };

  const handleSaveHeroInfo = () => {
    updateHeroInfo(heroForm);
    updateAnnouncement(announcement);
    showToast('Hero banner, titles & top announcement saved!');
  };

  const handleSaveRoomInfo = () => {
    updateRoomInfo(roomForm);
    showToast('Room specifications and descriptions updated!');
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const updated = [...(roomForm.images || []), newPhotoUrl.trim()];
    setRoomForm({ ...roomForm, images: updated });
    updateRoomPhotos(updated);
    setNewPhotoUrl('');
    showToast('New room photo added to gallery!');
  };

  const handleDeletePhoto = (index: number) => {
    const updated = roomForm.images.filter((_, i) => i !== index);
    setRoomForm({ ...roomForm, images: updated });
    updateRoomPhotos(updated);
    showToast('Photo removed from room gallery.');
  };

  const handleAddAmenity = () => {
    if (!newAmenityLabel.trim()) return;
    const updated = [
      ...(roomForm.amenities || []),
      { icon: newAmenityIcon, label: newAmenityLabel.trim(), highlight: false },
    ];
    setRoomForm({ ...roomForm, amenities: updated });
    updateRoomInfo({ ...roomForm, amenities: updated });
    setNewAmenityLabel('');
    showToast('New amenity added!');
  };

  const handleDeleteAmenity = (index: number) => {
    const updated = roomForm.amenities.filter((_, i) => i !== index);
    setRoomForm({ ...roomForm, amenities: updated });
    updateRoomInfo({ ...roomForm, amenities: updated });
    showToast('Amenity removed.');
  };

  const handleToggleAmenityHighlight = (index: number) => {
    const updated = roomForm.amenities.map((item, i) =>
      i === index ? { ...item, highlight: !item.highlight } : item
    );
    setRoomForm({ ...roomForm, amenities: updated });
    updateRoomInfo({ ...roomForm, amenities: updated });
  };

  const handleSavePackages = () => {
    updatePackages(packagesList);
    showToast('Package rates, inclusions and policies saved live!');
  };

  const handleSaveDining = () => {
    updateDiningInfo(diningForm);
    showToast('Dining partner info and highlights updated!');
  };

  const handleCreateAttraction = () => {
    if (!newPlace.name || !newPlace.distance) {
      alert('Please enter at least the attraction name and distance.');
      return;
    }
    const place: NearbyAttraction = {
      id: `attraction_${Date.now()}`,
      name: newPlace.name,
      distance: newPlace.distance,
      distanceNumMeters: Number(newPlace.distanceNumMeters) || 500,
      travelTime: newPlace.travelTime || '5 Min',
      type: (newPlace.type as any) || 'walking',
      description: newPlace.description || '',
      image:
        newPlace.image ||
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tag: newPlace.tag || 'Popular Point',
    };
    addAttraction(place);
    setNewPlace({
      name: '',
      distance: '',
      distanceNumMeters: 500,
      travelTime: '',
      type: 'walking',
      description: '',
      image: '',
      tag: 'Must Visit',
    });
    showToast('New nearby attraction added successfully!');
  };

  const handleCreateDish = () => {
    if (!newDish.name) {
      alert('Please enter a dish name.');
      return;
    }
    const item: MenuItem = {
      id: `dish_${Date.now()}`,
      name: newDish.name,
      category: newDish.category || 'indian_mains',
      description: newDish.description || '',
      tag: newDish.tag || 'Chef Special',
      isVeg: newDish.isVeg ?? true,
    };
    addMenuItem(item);
    setNewDish({
      name: '',
      category: 'indian_mains',
      description: '',
      tag: 'Chef Special',
      isVeg: true,
    });
    showToast('New chef special added to menu!');
  };

  const handleCreateReview = () => {
    if (!newReview.guestName || !newReview.comment) {
      alert('Please enter guest name and review comment.');
      return;
    }
    const rev: GuestReview = {
      id: `rev_${Date.now()}`,
      guestName: newReview.guestName,
      city: newReview.city || 'Mussoorie Visitor',
      tripType: newReview.tripType || 'Couple Getaway',
      rating: Number(newReview.rating) || 5,
      date: newReview.date || 'Recent Stay',
      comment: newReview.comment,
      verifiedStay: newReview.verifiedStay ?? true,
      highlight: newReview.highlight || 'Superb stay and hospitality',
    };
    addGuestReview(rev);
    setNewReview({
      guestName: '',
      city: '',
      tripType: 'Couple Getaway',
      rating: 5,
      date: 'Recent Stay',
      comment: '',
      verifiedStay: true,
      highlight: 'Amazing hospitality & serene views',
    });
    showToast('New verified guest review published!');
  };

  const handleCreateFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) {
      alert('Please enter both Question and Answer.');
      return;
    }
    addFaq({ q: newFaqQ.trim(), a: newFaqA.trim() });
    setNewFaqQ('');
    setNewFaqA('');
    showToast('New FAQ added to website!');
  };

  const handleCreatePromo = () => {
    if (!newPromoCode.trim()) return;
    addPromoCode(newPromoCode, newPromoDiscount);
    setNewPromoCode('');
    showToast(`Promo Code ${newPromoCode.toUpperCase()} activated!`);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mistwood_manor_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full website CMS backup downloaded as JSON!');
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      importFullCMS(parsed);
      refreshFromContext();
      setJsonInput('');
      showToast('All CMS settings restored and applied from JSON!');
    } catch {
      alert('Invalid JSON format. Please check and try again.');
    }
  };

  const navItems = [
    { id: 'general', label: 'Hotel Info & Contacts', icon: Building, badge: '14 Fields' },
    { id: 'hero', label: 'Hero & Announcement', icon: Sparkles, badge: 'Live Banner' },
    { id: 'rooms', label: '18 Super Deluxe Rooms', icon: Layers, badge: `${data.roomInfo.images?.length || 5} Photos` },
    { id: 'tariffs', label: 'Tariff & Packages (CP/MAP)', icon: DollarSign, badge: '2 Packages' },
    { id: 'places', label: 'Nearby Attractions', icon: MapPin, badge: `${data.nearbyAttractions?.length || 0} Places` },
    { id: 'dining', label: 'Rezzala Dining & Menu', icon: Utensils, badge: `${data.menuSpecials?.length || 0} Dishes` },
    { id: 'perks', label: 'Direct Booking Perks', icon: Shield, badge: `${data.directPerks?.length || 4} Perks` },
    { id: 'reviews', label: 'Guest Reviews Wall', icon: Star, badge: `${data.guestReviews?.length || 0} Reviews` },
    { id: 'faqs', label: 'FAQs & Policies', icon: HelpCircle, badge: `${data.faqs?.length || 0} Q&As` },
    { id: 'promos', label: 'Promo Codes & Discounts', icon: Percent, badge: `${data.promoCodes?.length || 0} Active` },
    { id: 'backup', label: 'Export / Import & Reset', icon: Download, badge: 'System' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#06080e] text-slate-100 flex flex-col overflow-hidden animate-fadeIn">
      {/* Top Admin Header Bar */}
      <header className="h-14 sm:h-16 px-3 sm:px-6 bg-[#0a0f1c] border-b border-slate-800 flex items-center justify-between shrink-0 z-20 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-serif font-black text-base sm:text-lg shadow-lg shrink-0">
            M
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-base font-serif font-bold text-white tracking-wide truncate">
                Mistwood Manor Admin
              </h1>
              <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] sm:text-[10px] font-bold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden xs:inline">Live Sync</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-sans hidden sm:block truncate">
              Happy Valley, Mussoorie • 100% Full Website Content Management Suite
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {saveToast && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-semibold animate-pulse shadow-md">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[180px]">{saveToast}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1 sm:gap-1.5 transition-all transform active:scale-95"
            title="Preview Live Website Changes"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">Preview</span>
            <span>Site</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close Admin Panel"
            aria-label="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Section Tabs Bar (< md viewports) */}
      <div className="md:hidden bg-[#090d18] border-b border-slate-800/80 px-2 py-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{item.label.split(' ')[0]}</span>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded ${
                    isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Full-Screen Layout: Left Sidebar (Desktop) + Right Workspace (Full Screen Mobile) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        {/* Left Sidebar Navigation (Visible on md: and above) */}
        <aside className="hidden md:flex w-64 lg:w-72 bg-[#090d18] border-r border-slate-800/90 flex-col shrink-0 overflow-y-auto">
          <div className="p-3.5 border-b border-slate-800/60">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 px-2">
              Website Management Sections
            </span>
          </div>

          <nav className="p-2 space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md shrink-0 ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950 font-bold'
                        : 'bg-slate-800/80 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-800/80 bg-[#070a13] text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Master Pin:</span>
              <span className="font-mono text-amber-400 font-bold">1234</span>
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">
              All edits update live instantly in guest previews & booking calculation engines.
            </div>
          </div>
        </aside>

        {/* Right Main Content Workspace (Scrolls full height on mobile and desktop) */}
        <main className="flex-1 bg-[#060911] overflow-y-auto p-3.5 sm:p-6 lg:p-8 space-y-6">
          {/* Section 1: Hotel Profile & Contacts */}
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Hotel Profile & Contact Hotlines
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage hotel branding, property address, Delhi corporate office, phones, and policies.
                  </p>
                </div>
                <button
                  onClick={handleSaveHotelInfo}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save General Info</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Hotel Name</label>
                  <input
                    type="text"
                    value={hotelForm.name}
                    onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Tagline</label>
                  <input
                    type="text"
                    value={hotelForm.tagline}
                    onChange={(e) => setHotelForm({ ...hotelForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Location Area</label>
                  <input
                    type="text"
                    value={hotelForm.locationArea}
                    onChange={(e) => setHotelForm({ ...hotelForm, locationArea: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Short Subtitle / Description</label>
                  <textarea
                    rows={2}
                    value={hotelForm.subtitle}
                    onChange={(e) => setHotelForm({ ...hotelForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Full Property Address (Mussoorie)</label>
                  <input
                    type="text"
                    value={hotelForm.address}
                    onChange={(e) => setHotelForm({ ...hotelForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">New Delhi Corporate Office</label>
                  <input
                    type="text"
                    value={hotelForm.delhiOffice}
                    onChange={(e) => setHotelForm({ ...hotelForm, delhiOffice: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Front Desk Phone 1 (with WhatsApp)</label>
                  <input
                    type="text"
                    value={hotelForm.phone1}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/[^0-9]/g, '');
                      setHotelForm({ ...hotelForm, phone1: e.target.value, phone1Clean: clean });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Reservation Phone 2</label>
                  <input
                    type="text"
                    value={hotelForm.phone2}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/[^0-9]/g, '');
                      setHotelForm({ ...hotelForm, phone2: e.target.value, phone2Clean: clean });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Official Email</label>
                  <input
                    type="email"
                    value={hotelForm.email}
                    onChange={(e) => setHotelForm({ ...hotelForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Website URL</label>
                  <input
                    type="text"
                    value={hotelForm.website}
                    onChange={(e) => setHotelForm({ ...hotelForm, website: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Star Rating Score (e.g. 4.8)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={hotelForm.starRating}
                    onChange={(e) => setHotelForm({ ...hotelForm, starRating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Verified Reviews Count (e.g. 342)</label>
                  <input
                    type="number"
                    value={hotelForm.reviewCount}
                    onChange={(e) => setHotelForm({ ...hotelForm, reviewCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Check-in Time</label>
                  <input
                    type="text"
                    value={hotelForm.checkInTime}
                    onChange={(e) => setHotelForm({ ...hotelForm, checkInTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Check-out Time</label>
                  <input
                    type="text"
                    value={hotelForm.checkOutTime}
                    onChange={(e) => setHotelForm({ ...hotelForm, checkOutTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Child Policy Text</label>
                  <textarea
                    rows={2}
                    value={hotelForm.childPolicy}
                    onChange={(e) => setHotelForm({ ...hotelForm, childPolicy: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Hero Banner & Announcement */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Hero Section & Top Announcement Banner
                  </h2>
                  <p className="text-xs text-slate-400">
                    Customize the homepage visual banner, main headline, trust chips, and notification banner.
                  </p>
                </div>
                <button
                  onClick={handleSaveHeroInfo}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Hero Settings</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    Top Announcement Bar (Header)
                  </h3>
                  <input
                    type="text"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-amber-200 text-sm focus:border-amber-500 outline-none"
                  />
                  <p className="text-[11px] text-slate-400">
                    This text scrolls at the very top of every page across all devices.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Hero Main Headline</label>
                    <input
                      type="text"
                      value={heroForm?.mainHeading || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, mainHeading: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Hero Subheadline</label>
                    <textarea
                      rows={2}
                      value={heroForm?.subHeading || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, subHeading: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Hero Background Image URL</label>
                    <input
                      type="text"
                      value={heroForm?.bgImage || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, bgImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                    />
                    {heroForm?.bgImage && (
                      <div className="mt-2 h-36 rounded-xl overflow-hidden border border-slate-800 relative">
                        <img
                          src={heroForm.bgImage}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-slate-950/80 rounded text-[10px] text-amber-300">
                          Live Hero Background Preview
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Trust Chip 1 (Ratings / Area)</label>
                    <input
                      type="text"
                      value={heroForm?.chip1 || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, chip1: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Trust Chip 2 (Rooms / Water)</label>
                    <input
                      type="text"
                      value={heroForm?.chip2 || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, chip2: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Trust Chip 3 (Dining)</label>
                    <input
                      type="text"
                      value={heroForm?.chip3 || ''}
                      onChange={(e) => setHeroForm({ ...heroForm, chip3: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: 18 Super Deluxe Rooms, Photos & Amenities */}
          {activeTab === 'rooms' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    18 Super Deluxe Rooms & Photo Gallery
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage room dimensions, bed configuration, descriptions, photo gallery, and room amenities.
                  </p>
                </div>
                <button
                  onClick={handleSaveRoomInfo}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Room Details</span>
                </button>
              </div>

              {/* Room specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Room Category Title</label>
                  <input
                    type="text"
                    value={roomForm.title}
                    onChange={(e) => setRoomForm({ ...roomForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Total Room Inventory</label>
                  <input
                    type="number"
                    value={roomForm.inventory}
                    onChange={(e) => setRoomForm({ ...roomForm, inventory: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Room Size (e.g. 280 sq.ft)</label>
                  <input
                    type="text"
                    value={roomForm.size}
                    onChange={(e) => setRoomForm({ ...roomForm, size: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Bed Type</label>
                  <input
                    type="text"
                    value={roomForm.bedType}
                    onChange={(e) => setRoomForm({ ...roomForm, bedType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Max Occupancy</label>
                  <input
                    type="text"
                    value={roomForm.maxOccupancy}
                    onChange={(e) => setRoomForm({ ...roomForm, maxOccupancy: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Room Description</label>
                  <textarea
                    rows={3}
                    value={roomForm.description}
                    onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Photo Gallery Manager */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>Room Photo Gallery ({roomForm.images?.length || 0} Photos)</span>
                  </h3>
                </div>

                {/* Add new photo */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Enter Image URL (Unsplash or direct image link)..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleAddPhoto}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>

                {/* Grid of photos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {roomForm.images?.map((url, i) => (
                    <div
                      key={i}
                      className="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950"
                    >
                      <img src={url} alt={`Room ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDeletePhoto(i)}
                          className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-500 cursor-pointer"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {i === 0 && (
                        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[9px]">
                          Cover Photo
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Manager */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Room Amenities & Highlights</span>
                </h3>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="New Amenity Name (e.g. Electric Kettle, Hair Dryer)..."
                    value={newAmenityLabel}
                    onChange={(e) => setNewAmenityLabel(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleAddAmenity}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Amenity</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {roomForm.amenities?.map((item, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${item.highlight ? 'text-amber-400' : 'text-slate-500'}`}
                        />
                        <span className="text-xs text-slate-200 truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleToggleAmenityHighlight(i)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                            item.highlight
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                          title="Toggle Hero Highlight Badge"
                        >
                          {item.highlight ? 'Highlighted' : 'Standard'}
                        </button>
                        <button
                          onClick={() => handleDeleteAmenity(i)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Tariff & Packages */}
          {activeTab === 'tariffs' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Room Packages & Tariff Calculation
                  </h2>
                  <p className="text-xs text-slate-400">
                    Set base rates, extra adult rates, package badges, meal plan descriptions and inclusions.
                  </p>
                </div>
                <button
                  onClick={handleSavePackages}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Packages</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {packagesList.map((pkg, pkgIndex) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-serif">
                        {pkg.code}
                      </span>
                      <span className="text-xs text-slate-400">{pkg.id}</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Package Name</label>
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => {
                          const updated = [...packagesList];
                          updated[pkgIndex].name = e.target.value;
                          setPackagesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-300">
                          Base Rate (2 Adults) ₹
                        </label>
                        <input
                          type="number"
                          value={pkg.basePrice}
                          onChange={(e) => {
                            const updated = [...packagesList];
                            updated[pkgIndex].basePrice = Number(e.target.value);
                            setPackagesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-bold text-sm outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-300">
                          Extra Person / Child ₹
                        </label>
                        <input
                          type="number"
                          value={pkg.extraPersonPrice}
                          onChange={(e) => {
                            const updated = [...packagesList];
                            updated[pkgIndex].extraPersonPrice = Number(e.target.value);
                            setPackagesList(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Badge Text</label>
                      <input
                        type="text"
                        value={pkg.badge || ''}
                        onChange={(e) => {
                          const updated = [...packagesList];
                          updated[pkgIndex].badge = e.target.value;
                          setPackagesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Package Description</label>
                      <textarea
                        rows={2}
                        value={pkg.description}
                        onChange={(e) => {
                          const updated = [...packagesList];
                          updated[pkgIndex].description = e.target.value;
                          setPackagesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Inclusions */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <label className="text-xs font-bold text-amber-400">Package Inclusions (One per line)</label>
                      <textarea
                        rows={5}
                        value={pkg.inclusions.join('\n')}
                        onChange={(e) => {
                          const updated = [...packagesList];
                          updated[pkgIndex].inclusions = e.target.value
                            .split('\n')
                            .filter((line) => line.trim().length > 0);
                          setPackagesList(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Nearby Attractions in Happy Valley */}
          {activeTab === 'places' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Happy Valley & Mussoorie Attractions
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, or delete tourist places shown in the Location & Distance Radar.
                  </p>
                </div>
              </div>

              {/* Add New Attraction Box */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Attraction / Landmark</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Place Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Gun Hill Point, Cloud End..."
                      value={newPlace.name}
                      onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Tag / Highlight</label>
                    <input
                      type="text"
                      placeholder="e.g. Top Sunset Point, Family Favorite..."
                      value={newPlace.tag}
                      onChange={(e) => setNewPlace({ ...newPlace, tag: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Distance Text (e.g. 100 Mtrs)</label>
                    <input
                      type="text"
                      placeholder="100 Mtrs or 1.5 Kms..."
                      value={newPlace.distance}
                      onChange={(e) => setNewPlace({ ...newPlace, distance: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Travel Time (e.g. 2 Min Walk)</label>
                    <input
                      type="text"
                      placeholder="2 Min Walk or 10 Min Drive..."
                      value={newPlace.travelTime}
                      onChange={(e) => setNewPlace({ ...newPlace, travelTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Category / Filter</label>
                    <select
                      value={newPlace.type}
                      onChange={(e) => setNewPlace({ ...newPlace, type: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    >
                      <option value="walking">Walking Distance (&lt;500m)</option>
                      <option value="short_drive">Short Drive (&lt;5km)</option>
                      <option value="day_trip">Day Excursion (&gt;5km)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Image URL</label>
                    <input
                      type="text"
                      placeholder="Image URL..."
                      value={newPlace.image}
                      onChange={(e) => setNewPlace({ ...newPlace, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-300 font-medium">Description</label>
                    <input
                      type="text"
                      placeholder="Brief details about the place..."
                      value={newPlace.description}
                      onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreateAttraction}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish New Attraction</span>
                </button>
              </div>

              {/* List of current attractions */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Existing Attractions ({data.nearbyAttractions?.length || 0})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.nearbyAttractions?.map((place) => (
                    <div
                      key={place.id}
                      className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex gap-3 items-center justify-between"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                        <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">{place.name}</span>
                        </div>
                        <div className="text-[11px] text-amber-400 font-medium">
                          {place.distance} • {place.travelTime}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{place.description}</div>
                      </div>
                      <button
                        onClick={() => deleteAttraction(place.id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800/80 cursor-pointer shrink-0"
                        title="Delete Attraction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Dining & Rezzala Menu */}
          {activeTab === 'dining' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    In-House Rezzala Dining & Menu
                  </h2>
                  <p className="text-xs text-slate-400">
                    Edit restaurant partner details, meal timings, and chef specials dishes list.
                  </p>
                </div>
                <button
                  onClick={handleSaveDining}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Dining Info</span>
                </button>
              </div>

              {/* Dining info fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Dining Section Headline</label>
                  <input
                    type="text"
                    value={diningForm?.title || ''}
                    onChange={(e) => setDiningForm({ ...diningForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Partner Name & Role</label>
                  <input
                    type="text"
                    value={diningForm?.partnerName || ''}
                    onChange={(e) => setDiningForm({ ...diningForm, partnerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Operating Hours</label>
                  <input
                    type="text"
                    value={diningForm?.operatingHours || ''}
                    onChange={(e) => setDiningForm({ ...diningForm, operatingHours: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Dining Description</label>
                  <textarea
                    rows={2}
                    value={diningForm?.description || ''}
                    onChange={(e) => setDiningForm({ ...diningForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Add New Dish */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Chef Special Dish</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Dish Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Garhwali Kadhai Paneer..."
                      value={newDish.name}
                      onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Category</label>
                    <select
                      value={newDish.category}
                      onChange={(e) => setNewDish({ ...newDish, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    >
                      <option value="indian_mains">North Indian & Curries</option>
                      <option value="chinese">Chinese & Tibetan Wok</option>
                      <option value="breakfast">Hot Mountain Breakfast</option>
                      <option value="chef_specials">Chef Signature Specials</option>
                      <option value="beverages">Beverages & Chai</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Tag (e.g. Guest Favorite)</label>
                    <input
                      type="text"
                      placeholder="Guest Favorite, House Special..."
                      value={newDish.tag}
                      onChange={(e) => setNewDish({ ...newDish, tag: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1 flex items-end">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pb-2">
                      <input
                        type="checkbox"
                        checked={newDish.isVeg}
                        onChange={(e) => setNewDish({ ...newDish, isVeg: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>Is Vegetarian (Green Badge)</span>
                    </label>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-300 font-medium">Dish Description</label>
                    <input
                      type="text"
                      placeholder="Description of spices, slow-cooking method, ingredients..."
                      value={newDish.description}
                      onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreateDish}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Dish to Menu</span>
                </button>
              </div>

              {/* Current dishes list */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Active Chef Dishes ({data.menuSpecials?.length || 0})
                </h3>
                <div className="space-y-2">
                  {data.menuSpecials?.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                            dish.isVeg ? 'border-emerald-500 bg-emerald-500/40' : 'border-red-500 bg-red-500/40'
                          }`}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">{dish.name}</span>
                            {dish.tag && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-semibold">
                                {dish.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{dish.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMenuItem(dish.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 cursor-pointer shrink-0"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Direct Perks */}
          {activeTab === 'perks' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Direct Booking Advantages
                  </h2>
                  <p className="text-xs text-slate-400">
                    Configure the 4 key reason cards encouraging guests to book directly on your website.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.directPerks?.map((perk) => (
                  <div key={perk.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-amber-400">Perk Title</label>
                      <input
                        type="text"
                        value={perk.title}
                        onChange={(e) => updateDirectPerk(perk.id, { title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Description</label>
                      <textarea
                        rows={2}
                        value={perk.desc}
                        onChange={(e) => updateDirectPerk(perk.id, { desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 8: Guest Reviews Wall */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Guest Reviews & Experiences Wall
                  </h2>
                  <p className="text-xs text-slate-400">
                    Publish, edit, and moderate guest ratings, feedback, and verified badges.
                  </p>
                </div>
              </div>

              {/* Add New Review Form */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Guest Review</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Guest Name(s)</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul & Neha Sharma..."
                      value={newReview.guestName}
                      onChange={(e) => setNewReview({ ...newReview, guestName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Guest City</label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi NCR, Mumbai..."
                      value={newReview.city}
                      onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Trip Type</label>
                    <input
                      type="text"
                      placeholder="Couple Getaway, Family Vacation..."
                      value={newReview.tripType}
                      onChange={(e) => setNewReview({ ...newReview, tripType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Star Rating (1 to 5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-bold text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-300 font-medium">Highlight / Key Takeaway</label>
                    <input
                      type="text"
                      placeholder="e.g. Peaceful location & exceptional Rezzala dining..."
                      value={newReview.highlight}
                      onChange={(e) => setNewReview({ ...newReview, highlight: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-300 font-medium">Guest Comment</label>
                    <textarea
                      rows={2}
                      placeholder="Detailed feedback from the guest..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreateReview}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Guest Review</span>
                </button>
              </div>

              {/* Current Reviews List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Published Reviews ({data.guestReviews?.length || 0})
                </h3>
                <div className="space-y-3">
                  {data.guestReviews?.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{rev.guestName}</span>
                          <span className="text-[10px] text-slate-400">({rev.city})</span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                            {rev.rating} ★
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-amber-300">"{rev.highlight}"</div>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">{rev.comment}</p>
                      </div>
                      <button
                        onClick={() => deleteGuestReview(rev.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 cursor-pointer shrink-0"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 9: FAQs Manager */}
          {activeTab === 'faqs' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Frequently Asked Questions (FAQs)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, or delete common guest inquiries regarding location, hot water, packages, and cabs.
                  </p>
                </div>
              </div>

              {/* Add FAQ Box */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Question</label>
                    <input
                      type="text"
                      placeholder="e.g. Is parking available on the property?..."
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Answer</label>
                    <textarea
                      rows={2}
                      placeholder="Clear, helpful response for guests..."
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreateFaq}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish FAQ</span>
                </button>
              </div>

              {/* Current FAQs */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Published FAQs ({data.faqs?.length || 0})
                </h3>
                <div className="space-y-3">
                  {data.faqs?.map((faq, index) => (
                    <div
                      key={faq.id || index}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => updateFaq(index, { q: e.target.value })}
                          className="flex-1 bg-transparent font-bold text-xs text-white outline-none border-b border-transparent focus:border-amber-500"
                        />
                        <button
                          onClick={() => deleteFaq(index)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 cursor-pointer shrink-0"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.a}
                        onChange={(e) => updateFaq(index, { a: e.target.value })}
                        className="w-full bg-slate-950/60 p-2 rounded-lg text-xs text-slate-300 outline-none border border-slate-800/80 focus:border-amber-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 10: Promo Codes */}
          {activeTab === 'promos' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Promo Codes & Discount Engine
                  </h2>
                  <p className="text-xs text-slate-400">
                    Create instant discount voucher coupons for website direct bookings.
                  </p>
                </div>
              </div>

              {/* Add Promo Box */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create New Promo Voucher</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Coupon Code (e.g. SUMMER15)</label>
                    <input
                      type="text"
                      placeholder="CODE10"
                      value={newPromoCode}
                      onChange={(e) => setNewPromoCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono font-bold text-xs uppercase outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Discount Percentage (%)</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={newPromoDiscount}
                      onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-bold text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreatePromo}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Activate Promo Code</span>
                </button>
              </div>

              {/* Current Promos List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Active Discount Codes ({data.promoCodes?.length || 0})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.promoCodes?.map((promo) => (
                    <div
                      key={promo.code}
                      className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs">
                            {promo.code}
                          </span>
                          <span className="text-xs font-bold text-emerald-400">
                            {promo.discountPercent}% OFF
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {promo.active ? 'Status: Active & Usable' : 'Status: Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => togglePromoCode(promo.code)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                            promo.active
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {promo.active ? 'Active' : 'Disabled'}
                        </button>
                        <button
                          onClick={() => deletePromoCode(promo.code)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 11: Export / Import & System Reset */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-4xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Data Backup, JSON Import & Reset
                  </h2>
                  <p className="text-xs text-slate-400">
                    Export complete website database to JSON, restore backups, or reset back to default values.
                  </p>
                </div>
              </div>

              {/* Export JSON */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Full Website CMS Backup (JSON)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Exports all room rates, photo galleries, FAQs, dining menus, attractions, and contact details into a single JSON file.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON File</span>
                </button>
              </div>

              {/* Import JSON */}
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Restore / Import CMS from JSON</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Paste JSON backup text below to restore all website content at once.
                </p>
                <textarea
                  rows={4}
                  placeholder='Paste JSON content here e.g. { "hotelInfo": { ... }, "packages": [ ... ] }'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleImportJSON}
                  disabled={!jsonInput.trim()}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import & Apply JSON</span>
                </button>
              </div>

              {/* Danger Zone: Factory Reset */}
              <div className="p-5 rounded-3xl bg-red-950/20 border border-red-900/50 space-y-3">
                <h3 className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Reset All Content to Factory Defaults</span>
                </h3>
                <p className="text-xs text-slate-400">
                  This will clear custom edits and restore original verified Mistwood Manor rates (₹2,700 / ₹3,700), hotel details, and attractions.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all CMS content to default settings?')) {
                      resetToDefaults();
                      refreshFromContext();
                      showToast('Website content successfully reset to factory defaults.');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-200 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Confirm Reset to Defaults</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
