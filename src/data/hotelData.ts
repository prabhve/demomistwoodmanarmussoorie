import { RoomDetails, RoomPackage, NearbyAttraction, MenuItem, GuestReview, HeroContent, DiningInfo, DirectPerk } from '../types';

export const HOTEL_INFO = {
  name: 'Mistwood Manor Mussoorie',
  tagline: 'Your Gateway to the Queen of the Hills',
  subtitle: 'Peaceful luxury nestled in scenic Happy Valley with 18 Super Deluxe Rooms, Rezzala dining, and panoramic Himalayan serenity.',
  address: 'Harendale Estate, Buddha Temple Road, Happy Valley, Mussoorie, Uttarakhand, India - 248179',
  delhiOffice: '1209, Pragati Tower, Rajendra Place, New Delhi 110 008',
  phone1: '+91 88299 44911',
  phone1Clean: '918829944911',
  phone2: '+91 84698 92020',
  phone2Clean: '918469892020',
  email: 'hotelmistwoodmanor@gmail.com',
  website: 'www.mistwoodmanor.com',
  starRating: 4.8,
  reviewCount: 342,
  totalRooms: 18,
  partners: [
    { name: 'Rezzala Foodkraft', role: 'In-House Multicuisine Dining Partner' },
    { name: 'tripClogix', role: 'Associate Travel Partner' },
  ],
  checkInTime: '12:00 PM',
  checkOutTime: '11:00 AM',
  childPolicy: 'Children below the age of 6 years stay complimentary. Children aged 6 and above are charged as extra person rates.',
};

export const PACKAGES: RoomPackage[] = [
  {
    id: 'package_01',
    name: 'Super Deluxe with Breakfast (CP)',
    code: 'PACKAGE 01',
    badge: 'Popular Choice',
    description: 'Perfect for exploring Mussoorie during the day with a wholesome hot mountain breakfast to start your morning.',
    basePrice: 2700,
    extraPersonPrice: 800,
    inclusions: [
      'Accommodation in Super Deluxe Room (2 Adults)',
      'Complimentary Delicious Hot Breakfast (Buffet / A-la-carte)',
      '2 Complimentary Packaged Drinking Water Bottles daily',
      'High-Speed High Altitude Free Wi-Fi',
      '24x7 Hot & Cold Running Mountain Spring Water',
      'Intercom & Dedicated Room Service',
      'Free Parking & 24x7 Property Security',
    ],
    popular: false,
  },
  {
    id: 'package_02',
    name: 'Super Deluxe with Breakfast & Dinner (MAP)',
    code: 'PACKAGE 02',
    badge: 'Best Value & Best Seller',
    description: 'Complete relaxed holiday package featuring gourmet multi-course dinner by Rezzala and hot breakfast every day.',
    basePrice: 3700,
    extraPersonPrice: 1300,
    inclusions: [
      'Accommodation in Super Deluxe Room (2 Adults)',
      'Rich Breakfast Spread & Gourmet Chef Dinner (Buffet / Multi-Course)',
      'In-house Rezzala Multicuisine Indian & Chinese Specialties',
      '2 Complimentary Drinking Water Bottles daily',
      'High-Speed Wi-Fi for work or streaming',
      'Priority Mountain/Valley View Room Allocation',
      '24x7 Hot & Cold Water & First Class Security',
      'Complimentary Late Check-out (subject to availability)',
    ],
    popular: true,
  },
];

export const SUPER_DELUXE_ROOM: RoomDetails = {
  id: 'super-deluxe',
  title: 'Super Deluxe Room',
  inventory: 18,
  size: '280 sq.ft',
  bedType: 'Plush Queen Size Bed with Cushioned Headboard',
  maxOccupancy: '2 Adults + 1 Extra Bed (Up to 3 Adults + 1 Child)',
  view: 'Happy Valley Pines & Mountain Ridge Vistas',
  description:
    'Mistwood Manor offers 18 spacious & well-appointed Super Deluxe Rooms crafted with modern amenities, wooden flooring accents, dedicated work desk, cozy seating nook, and modern ensuite bathroom with 24x7 hot water.',
  images: [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', // Beautiful modern hotel bedroom
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Warm ambient room
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', // Deluxe interior
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80', // Modern bathroom
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', // Resort reception & lounge
  ],
  amenities: [
    { icon: 'BedDouble', label: 'Comfortable Queen Size Bed', highlight: true },
    { icon: 'Flame', label: '24x7 Running Hot & Cold Water', highlight: true },
    { icon: 'Wifi', label: 'High-Speed Free Wi-Fi', highlight: true },
    { icon: 'UtensilsCrossed', label: 'In-House Rezzala Restaurant & Room Service', highlight: true },
    { icon: 'PhoneCall', label: 'Intercom Facility', highlight: false },
    { icon: 'Compass', label: 'Writing / Laptop Work Desk', highlight: false },
    { icon: 'Coffee', label: 'Cozy Coffee Table & Armchairs', highlight: false },
    { icon: 'Droplets', label: '2 Complimentary Water Bottles Daily', highlight: false },
    { icon: 'Bath', label: 'Modern Attached Bathroom & Vanity', highlight: false },
    { icon: 'ShieldCheck', label: 'First Class 24x7 Security & CCTV', highlight: false },
    { icon: 'Tv', label: 'Flat-Screen HD TV with Satellite Channels', highlight: false },
    { icon: 'Car', label: 'Convenient On-site / Nearby Parking', highlight: false },
  ],
  packages: PACKAGES,
};

export const NEARBY_ATTRACTIONS: NearbyAttraction[] = [
  {
    id: 'buddha-temple',
    name: 'Buddha Temple (Tibetan Monastery)',
    distance: '100 Mtrs',
    distanceNumMeters: 100,
    travelTime: '1 Min Walk',
    type: 'walking',
    description: 'A tranquil Buddhist monastery in Happy Valley featuring golden prayer wheels, serene meditation halls, and panoramic valley views.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tag: 'Must Visit',
  },
  {
    id: 'dalai-hills',
    name: 'Dalai Hills',
    distance: '150 Mtrs',
    distanceNumMeters: 150,
    travelTime: '2 Min Walk',
    type: 'walking',
    description: 'Iconic hill adorned with thousands of colorful Tibetan prayer flags and a majestic golden statue of Lord Buddha overlooking the Garhwal peaks.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tag: 'Top Sunset Point',
  },
  {
    id: 'company-garden',
    name: 'Company Garden',
    distance: '300 Mtrs',
    distanceNumMeters: 300,
    travelTime: '4 Min Walk',
    type: 'walking',
    description: 'Historic British-era botanical garden with lush floral nursery, artificial lake with pedal boating, and cascading waterfalls.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    tag: 'Family Favorite',
  },
  {
    id: 'lbsnaa',
    name: 'LBSNAA Entry Gate (IAS Academy)',
    distance: '500 Mtrs',
    distanceNumMeters: 500,
    travelTime: '6 Min Walk',
    type: 'walking',
    description: 'Prestigious Lal Bahadur Shastri National Academy of Administration training civil services officers, situated right in Happy Valley.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    tag: 'Historic Landmark',
  },
  {
    id: 'mall-road',
    name: 'The Mall Road, Mussoorie',
    distance: '1.4 Kms (1400 Mtrs)',
    distanceNumMeters: 1400,
    travelTime: '5 Min Drive / Scenic Stroll',
    type: 'short_drive',
    description: 'The vibrant beating heart of Mussoorie packed with wooden handicrafts, cafes, bakeries, and breathtaking colonial viewpoints.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    tag: 'Shopping & Dining',
  },
  {
    id: 'george-everest',
    name: 'Sir George Everest House',
    distance: '1.5 Kms',
    distanceNumMeters: 1500,
    travelTime: '5 Min Drive',
    type: 'short_drive',
    description: 'Historic home and observatory of the Surveyor General of India who measured Mt. Everest, with breathtaking views of Doon Valley & snow peaks.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tag: '360° Mountain Views',
  },
  {
    id: 'landour',
    name: 'Landour & Chaar Dukan',
    distance: '5 Kms',
    distanceNumMeters: 5000,
    travelTime: '15 Min Drive',
    type: 'short_drive',
    description: 'Enchanting deodar-canopied hamlet famous for Bakehouse pancakes, Ruskin Bond’s retreat, Sister’s Bazaar, and old-world British heritage.',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
    tag: 'Heritage & Cafes',
  },
  {
    id: 'kempty-fall',
    name: 'Kempty Falls',
    distance: '11 Kms',
    distanceNumMeters: 11000,
    travelTime: '25 Min Drive',
    type: 'day_trip',
    description: 'Mussoorie’s most famous gigantic perennial waterfall roaring down high mountain cliffs, perfect for photos and cool splashes.',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80',
    tag: 'Water Adventure',
  },
  {
    id: 'dehradun',
    name: 'Dehradun Railway Station',
    distance: '30 Kms',
    distanceNumMeters: 30000,
    travelTime: '1 Hour Drive',
    type: 'day_trip',
    description: 'Main rail terminus connecting Mussoorie to New Delhi, Mumbai, and all major Indian cities via Shatabdi and Vande Bharat trains.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    tag: 'Transit Hub',
  },
  {
    id: 'jolly-grant',
    name: 'Jolly Grant Airport (DED)',
    distance: '37 Kms',
    distanceNumMeters: 37000,
    travelTime: '1.5 Hours Drive',
    type: 'day_trip',
    description: 'Nearest commercial airport with daily flights from Delhi, Mumbai, Bangalore, and Lucknow.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    tag: 'Flight Arrival',
  },
];

export const MENU_SPECIALS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Shahi Butter Paneer & Dal Makhani',
    category: 'indian_mains',
    description: 'Slow-cooked rich black lentils tempered with mountain butter, served with cottage cheese in creamy tomato gravy and butter naan.',
    tag: 'Guest Favorite',
    isVeg: true,
  },
  {
    id: 'm2',
    name: 'Himalayan Kadhai Chicken / Mutton Rogan Josh',
    category: 'indian_mains',
    description: 'Tender meat braised in aromatic Garhwali spices, coriander seeds, and bell peppers, cooked to perfection by Rezzala chefs.',
    tag: 'House Special',
    isVeg: false,
  },
  {
    id: 'm3',
    name: 'Steamed & Fried Tibetan Momos with Fiery Chutney',
    category: 'chinese',
    description: 'Authentic Happy Valley style handmade dumplings filled with fresh vegetables or chicken, served with garlic chilli dip.',
    tag: 'Happy Valley Classic',
    isVeg: true,
  },
  {
    id: 'm4',
    name: 'Chilli Paneer & Hakka Noodles',
    category: 'chinese',
    description: 'Wok-tossed noodles with crunchy spring vegetables and golden paneer cubes in savory soya-chilli glaze.',
    tag: 'Bestseller',
    isVeg: true,
  },
  {
    id: 'm5',
    name: 'Warm Masala Chai & Stuffed Aloo Puri / Paratha',
    category: 'breakfast',
    description: 'Crisp golden parathas with homemade mountain curd, pickle, and hot ginger-cardamom tea.',
    tag: 'Breakfast Special',
    isVeg: true,
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'r1',
    guestName: 'Rohit & Priyanka Sharma',
    city: 'New Delhi',
    tripType: 'Couple Getaway',
    rating: 5,
    date: 'Stayed Sept 2026',
    comment:
      'We booked Package 02 (MAP with Dinner & Breakfast) for 3 nights. The location in Happy Valley is pure bliss—away from the chaotic Mall Road traffic yet only 5 mins away. Walking to Buddha Temple in the morning was magical. The Rezzala food was piping hot and delicious!',
    verifiedStay: true,
    highlight: 'Peaceful location & exceptional Rezzala dining',
  },
  {
    id: 'r2',
    guestName: 'Amit Verma & Family',
    city: 'Chandigarh',
    tripType: 'Family Vacation',
    rating: 5,
    date: 'Stayed August 2026',
    comment:
      'Super Deluxe room was very spacious for our family of 3. Continuous 24h hot water was a lifesaver in the chilly Mussoorie climate. The staff was polite and arranged a taxi for George Everest & Kempty Falls at genuine rates.',
    verifiedStay: true,
    highlight: 'Spacious rooms, hot water & great hospitality',
  },
  {
    id: 'r3',
    guestName: 'Dr. Sunita Deshmukh',
    city: 'Mumbai',
    tripType: 'Solo Nature Retreat',
    rating: 5,
    date: 'Stayed July 2026',
    comment:
      'Mistwood Manor is right next to Dalai Hills and Company Garden. The Wi-Fi was strong enough for my remote calls, and the mountain breeze was rejuvenating. Best price for Mussoorie without burning a hole in the pocket!',
    verifiedStay: true,
    highlight: '100m to Buddha Temple & high-speed Wi-Fi',
  },
  {
    id: 'r4',
    guestName: 'Vikram & Friends Group',
    city: 'Noida',
    tripType: 'Friends Trip',
    rating: 5,
    date: 'Stayed May 2026',
    comment:
      'Booked 4 rooms directly on their website. Got free early check-in and the best rates compared to booking portals. The evening snacks and dinner prepared by chef were top notch.',
    verifiedStay: true,
    highlight: 'Best rate guarantee & smooth direct booking',
  },
];

export const HERO_INFO: HeroContent = {
  badgeText: 'Exclusive Mountain Sanctuary • Happy Valley, Mussoorie',
  mainHeading: 'Mistwood Manor Mussoorie',
  subHeading: 'Experience peaceful mountain luxury nestled in scenic Happy Valley with 18 Super Deluxe Rooms, in-house Rezzala multicuisine dining, and panoramic Himalayan serenity.',
  bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
  chip1: '4.8/5 Rated • 100m to Buddha Temple & Dalai Hills',
  chip2: '18 Super Deluxe Rooms • 24x7 Hot Spring Water',
  chip3: 'In-House Rezzala Multicuisine Restaurant',
};

export const DINING_INFO: DiningInfo = {
  tagline: 'Culinary Excellence at High Altitude',
  title: 'In-House Rezzala Multicuisine Restaurant',
  subtitle: 'Fresh Himalayan Ingredients, Authentic North Indian Specialties, Tibetan Delicacies & Warm Mountain Hospitality',
  description:
    'Indulge in soul-warming culinary creations crafted by master chefs at Rezzala Foodkraft. From steaming stuffed parathas with fresh mountain curd in the morning to sizzling Kadhai specialties and handmade Tibetan momos under the starry Mussoorie sky.',
  partnerName: 'Rezzala Foodkraft',
  partnerRole: 'Official In-House Dining Partner',
  bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  operatingHours: 'Breakfast: 7:30 AM - 10:30 AM | Lunch & Dinner: 12:30 PM - 10:30 PM',
};

export const DIRECT_BOOKING_PERKS: DirectPerk[] = [
  {
    id: 'perk_1',
    title: 'Guaranteed Lowest Tariff',
    desc: 'Get exclusive direct rates starting ₹2,700/night with zero booking fees or OTA markups.',
    icon: 'Sparkles',
  },
  {
    id: 'perk_2',
    title: 'Priority Room Allocation',
    desc: 'Direct bookings enjoy priority allocation of premium mountain & garden view rooms.',
    icon: 'Shield',
  },
  {
    id: 'perk_3',
    title: 'Complimentary High-Speed Wi-Fi & Hot Water',
    desc: 'Seamless connectivity and 24x7 running hot water for uninterrupted mountain comfort.',
    icon: 'Clock',
  },
  {
    id: 'perk_4',
    title: 'Direct Front Desk WhatsApp',
    desc: 'Instant 24x7 support from local hosts for cab coordination, trekking tips, and room service.',
    icon: 'HeartHandshake',
  },
];


export const FAQS = [
  {
    q: 'How far is Mistwood Manor from Mall Road and Buddha Temple?',
    a: 'Mistwood Manor is centrally located in scenic Happy Valley, just 100 meters (1 minute walk) from the historic Buddha Temple & Tibetan Monastery, 150 meters from Dalai Hills, and only 1.4 km (5 minutes by car/cab) from The Mall Road.',
  },
  {
    q: 'What is the difference between Package 01 and Package 02?',
    a: 'Package 01 (CP) is ₹2,700/night for 2 persons including lavish hot breakfast. Package 02 (MAP) is ₹3,700/night for 2 persons and includes both Breakfast and Multi-course Dinner prepared by our in-house Rezzala multicuisine restaurant partner.',
  },
  {
    q: 'What is the extra person and child policy?',
    a: 'Children below the age of 6 years stay completely free! For children aged 6+ or extra adults, the extra person charge is ₹800/night with breakfast (Package 01) and ₹1,300/night with breakfast & dinner (Package 02), including extra mattress and linens.',
  },
  {
    q: 'Is there 24-hour running hot water and Wi-Fi available?',
    a: 'Yes, all 18 Super Deluxe Rooms are equipped with dedicated 24x7 hot and cold running water systems and high-speed complimentary Wi-Fi across the property.',
  },
  {
    q: 'How can I confirm my reservation and pay?',
    a: 'You can select your dates and book directly via our online booking engine or click "Book via WhatsApp" to instantly share your travel dates with our reservation desk (+91 8829944911 / +91 8469892020). We accept UPI, GPay, PhonePe, Cards, and Netbanking.',
  },
  {
    q: 'Can you assist with taxi pick-up from Dehradun Railway Station or Jolly Grant Airport?',
    a: 'Yes! Our front desk can arrange reliable trusted local cab pick-up from Dehradun station (30 km) or Jolly Grant airport (37 km) as well as full-day sightseeing cabs for George Everest, Landour, and Kempty Falls.',
  },
];
