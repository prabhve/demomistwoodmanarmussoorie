import { useState } from 'react';
import {
  Compass,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Footprints,
  Car,
  Utensils,
  Camera,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Heart,
  Users,
  Coffee,
  Mountain,
} from 'lucide-react';

type TravelStyle = 'couple' | 'family' | 'leisure' | 'adventure';

interface ItineraryItem {
  time: string;
  place: string;
  distanceFromHotel: string;
  details: string;
  type: 'walk' | 'drive' | 'food';
  highlightTag?: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  theme: string;
  schedule: ItineraryItem[];
}

export const TripPlannerAssistant = ({ onBookNow }: { onBookNow: () => void }) => {
  const [selectedDuration, setSelectedDuration] = useState<1 | 2 | 3>(2);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('couple');

  // Rich multi-style itinerary database tailored for Happy Valley, Mussoorie
  const itineraries: Record<number, Record<TravelStyle, ItineraryDay[]>> = {
    1: {
      couple: [
        {
          day: 1,
          title: 'Romantic Sunset & Mountain Serenity',
          theme: 'Intimate Pine Walks, Golden Monastery & Sunset Peak',
          schedule: [
            {
              time: '08:30 AM',
              place: 'Mistwood Manor Rezzala Dining',
              distanceFromHotel: 'In-House',
              details: 'Steaming hot stuffed parathas with fresh mountain curd, herbal tea, and peaceful hillside morning views.',
              type: 'food',
              highlightTag: 'Cozy Breakfast',
            },
            {
              time: '10:00 AM',
              place: 'Buddha Temple & Dalai Hills',
              distanceFromHotel: '100m (1-2 Min Walk)',
              details: 'Walk hand-in-hand through thousands of colorful Tibetan prayer flags fluttering against misty Himalayan peaks.',
              type: 'walk',
              highlightTag: 'Couple Photo Spot',
            },
            {
              time: '01:30 PM',
              place: 'Company Garden & Botanical Nursery',
              distanceFromHotel: '300m (4 Min Walk)',
              details: 'Quiet romantic garden stroll beneath English pines and pedal boating on the historic mountain lake.',
              type: 'walk',
              highlightTag: 'Scenic Nature Walk',
            },
            {
              time: '04:30 PM',
              place: 'Sir George Everest Observatory Peak',
              distanceFromHotel: '1.5 Kms (5 Min Drive)',
              details: 'Watch the dramatic golden hour sunset over Doon Valley and Garhwal snow crests together.',
              type: 'drive',
              highlightTag: 'Top Sunset Vistas',
            },
            {
              time: '08:30 PM',
              place: 'Candlelight Dinner at Rezzala Restaurant',
              distanceFromHotel: 'In-House',
              details: 'Gourmet North Indian & Chinese dinner by in-house chefs in a warm, ambient Himalayan dining room.',
              type: 'food',
              highlightTag: 'Chef Special Dining',
            },
          ],
        },
      ],
      family: [
        {
          day: 1,
          title: 'Family Fun & Heritage Discovery',
          theme: 'Monasteries, Gardens & Easy Valley Exploration',
          schedule: [
            {
              time: '08:30 AM',
              place: 'Mistwood Manor Family Breakfast',
              distanceFromHotel: 'In-House',
              details: 'Wholesome buffet spread with eggs, puris, poha, toasts, milk, and freshly brewed hill coffee.',
              type: 'food',
              highlightTag: 'Kid-Friendly Menu',
            },
            {
              time: '10:00 AM',
              place: 'Buddha Temple (Tibetan Monastery)',
              distanceFromHotel: '100m (1 Min Walk)',
              details: 'Spin the large golden prayer wheels, learn Tibetan heritage, and explore authentic handicraft stalls.',
              type: 'walk',
              highlightTag: 'Cultural Learning',
            },
            {
              time: '12:30 PM',
              place: 'Company Garden & Amusement Park',
              distanceFromHotel: '300m (4 Min Walk)',
              details: 'Pedal boat ride on the lake, 3D wax museum, lush flower gardens, and fun safe activities for children.',
              type: 'walk',
              highlightTag: 'Kids Boating & Garden',
            },
            {
              time: '04:00 PM',
              place: 'George Everest House Heritage Museum',
              distanceFromHotel: '1.5 Kms Drive',
              details: 'Cartography museum, open grasslands for kids to play, and gentle valley viewing deck.',
              type: 'drive',
              highlightTag: 'Family Picnic Lawn',
            },
            {
              time: '08:00 PM',
              place: 'Comfort Dinner at Mistwood Manor',
              distanceFromHotel: 'In-House',
              details: 'Mild-spiced Paneer Butter Masala, Dal Makhani, hot tandoori rotis, and warm desserts.',
              type: 'food',
              highlightTag: 'Fresh & Hygienic',
            },
          ],
        },
      ],
      leisure: [
        {
          day: 1,
          title: 'Slow Hill Station Rejuvenation',
          theme: 'Peaceful Nature Strolls, Reading & Fresh Mountain Air',
          schedule: [
            {
              time: '09:00 AM',
              place: 'Lazy Morning at Mistwood Manor',
              distanceFromHotel: 'In-House',
              details: 'Wake up to bird songs, crisp mountain air, and a relaxed hot breakfast served to your table.',
              type: 'food',
              highlightTag: 'Relaxed Pace',
            },
            {
              time: '10:30 AM',
              place: 'Dalai Hills Meditation Ridge',
              distanceFromHotel: '150m (2 Min Walk)',
              details: 'Sit on quiet stone benches under Tibetan prayer flags overlooking the majestic Aglar valley.',
              type: 'walk',
              highlightTag: 'Mindfulness & Peace',
            },
            {
              time: '02:00 PM',
              place: 'Company Garden Tea & Greenhouse',
              distanceFromHotel: '300m (4 Min Walk)',
              details: 'Explore colonial greenhouse flora, sip hot mountain chai, and read amidst deodar shade.',
              type: 'walk',
              highlightTag: 'Gentle Walk',
            },
            {
              time: '05:00 PM',
              place: 'George Everest Sunset Point',
              distanceFromHotel: '1.5 Kms Drive',
              details: 'Catch the famous Mussoorie Winterline / golden dusk glow with zero rush or steep climbs.',
              type: 'drive',
              highlightTag: 'Golden Sunset',
            },
          ],
        },
      ],
      adventure: [
        {
          day: 1,
          title: 'High Ridge Trek & Forest Trail Exploration',
          theme: 'George Everest Ridge, Dalai Hill Peak & Happy Valley Trails',
          schedule: [
            {
              time: '07:30 AM',
              place: 'Energetic Breakfast at Mistwood',
              distanceFromHotel: 'In-House',
              details: 'High-protein eggs, peanut butter toasts, warm oats, and fresh masala tea for the trek ahead.',
              type: 'food',
              highlightTag: 'Energy Boost',
            },
            {
              time: '08:30 AM',
              place: 'Dalai Hills & Hathipaon Forest Trek',
              distanceFromHotel: 'Starts from Hotel',
              details: 'Hike through dense oak & rhododendron forests across the scenic Happy Valley ridge line.',
              type: 'walk',
              highlightTag: 'Ridge Trail Hike',
            },
            {
              time: '11:30 AM',
              place: 'George Everest Peak Summit Hike',
              distanceFromHotel: '1.5 Kms Drive + 1.2 Km Hike',
              details: 'Summit hike to the iconic George Everest peak overlooking Hathipaon and snow-capped Bandarpoonch.',
              type: 'walk',
              highlightTag: 'Summit Trek',
            },
            {
              time: '03:30 PM',
              place: 'Benog Wildlife Sanctuary Edge',
              distanceFromHotel: '3.5 Kms Drive',
              details: 'Trek along sanctuary pathways known for Himalayan birdwatching (Mountain Quail habitat) and deodar canopy.',
              type: 'drive',
              highlightTag: 'Wildlife Trail',
            },
            {
              time: '08:00 PM',
              place: 'Hot Feast & Warm Bed at Mistwood Manor',
              distanceFromHotel: 'In-House',
              details: 'Recharge with piping hot Tibetan Thukpa, Momos, and rich North Indian curries.',
              type: 'food',
              highlightTag: 'Hearty Feast',
            },
          ],
        },
      ],
    },
    2: {
      couple: [
        {
          day: 1,
          title: 'Day 1: Happy Valley Romance & Sunset Ridge',
          theme: 'Monastery Blessings, Pine Walks & George Everest Peak',
          schedule: [
            {
              time: '09:00 AM',
              place: 'Buddha Temple & Dalai Hills (100m Walk)',
              distanceFromHotel: '100m - 150m Walk',
              details: 'Morning peace with Tibetan prayer bells, fluttering colorful flags, and sweeping mountain photography.',
              type: 'walk',
              highlightTag: 'Scenic Couple Spot',
            },
            {
              time: '01:30 PM',
              place: 'Rezzala Multicuisine Lunch',
              distanceFromHotel: 'In-House',
              details: 'Steamed Tibetan dumplings and signature chef curries prepared fresh.',
              type: 'food',
              highlightTag: 'In-House Comfort',
            },
            {
              time: '04:30 PM',
              place: 'George Everest Sunset Point',
              distanceFromHotel: '1.5 Kms Drive',
              details: 'Romantic 360° panoramic sunset over the Doon Valley and Himalayan skyline.',
              type: 'drive',
              highlightTag: 'Golden Hour',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Colonial Landour Cafes & Mall Road',
          theme: 'Heritage Bakeries, Chaar Dukan & Evening Shopping',
          schedule: [
            {
              time: '09:30 AM',
              place: 'Landour Chaar Dukan & St. Paul’s Church',
              distanceFromHotel: '5 Kms Drive',
              details: 'Colonial British hill charm, deodar trails, and famous Landour Bakehouse apple pies.',
              type: 'drive',
              highlightTag: 'Heritage Romance',
            },
            {
              time: '02:00 PM',
              place: 'Camel’s Back Road Walk',
              distanceFromHotel: '1.8 Kms Drive',
              details: 'Peaceful 3km scenic cliff-walk with panoramic mountain viewpoints and cool pine breeze.',
              type: 'walk',
              highlightTag: 'Cliffside Walk',
            },
            {
              time: '05:00 PM',
              place: 'The Mall Road Handicraft Stroll',
              distanceFromHotel: '1.4 Kms Drive',
              details: 'Warm Tibetan shawls, carved wooden souvenirs, and hot mountain corn.',
              type: 'drive',
              highlightTag: 'Evening Shopping',
            },
          ],
        },
      ],
      family: [
        {
          day: 1,
          title: 'Day 1: Happy Valley Cultural Gems & Boating',
          theme: 'Company Garden, Monasteries & Sunset Heritage',
          schedule: [
            {
              time: '09:00 AM',
              place: 'Tibetan Monastery & Dalai Hills',
              distanceFromHotel: '100m Walk',
              details: 'Explore historic Buddhist architecture and easy panoramic walking paths suitable for all ages.',
              type: 'walk',
              highlightTag: 'Easy Walking',
            },
            {
              time: '11:30 AM',
              place: 'Company Garden Boating & Flower Nursery',
              distanceFromHotel: '300m Walk',
              details: 'Paddle boating, artificial waterfall, flower carpets, and fun swings for children.',
              type: 'walk',
              highlightTag: 'Family Boating',
            },
            {
              time: '04:00 PM',
              place: 'George Everest Cartography Center',
              distanceFromHotel: '1.5 Kms Drive',
              details: 'Interactive science & map museum with safe grassy slopes for family photos.',
              type: 'drive',
              highlightTag: 'Interactive Museum',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Kempty Falls & Mall Road Family Evening',
          theme: 'Waterfall Splash & Mountain Souvenirs',
          schedule: [
            {
              time: '09:00 AM',
              place: 'Kempty Falls Morning Excursion',
              distanceFromHotel: '11 Kms Drive',
              details: 'Early morning visit before rush hour to enjoy fresh mountain waterfalls and cable car rides.',
              type: 'drive',
              highlightTag: 'Water Cascades',
            },
            {
              time: '02:30 PM',
              place: 'Rezzala Hot Family Lunch',
              distanceFromHotel: 'In-House',
              details: 'Warm soothing dal, crispy naans, noodles, and fresh vegetarian delights.',
              type: 'food',
              highlightTag: 'Comfort Food',
            },
            {
              time: '05:00 PM',
              place: 'The Mall Road Family Walk & Ropeway',
              distanceFromHotel: '1.4 Kms Drive',
              details: 'Gun Hill cable car ride and street shopping for woolens and local sweets.',
              type: 'drive',
              highlightTag: 'Cable Car Ride',
            },
          ],
        },
      ],
      leisure: [
        {
          day: 1,
          title: 'Day 1: Peaceful Happy Valley Retreat',
          theme: 'Slow Living, Pine Air & Scenic Viewpoints',
          schedule: [
            {
              time: '09:30 AM',
              place: 'Dalai Hills Morning Stroll',
              distanceFromHotel: '150m Walk',
              details: 'Gentle flat walk with benches overlooking green valleys and prayer flags.',
              type: 'walk',
              highlightTag: 'Serene & Quiet',
            },
            {
              time: '01:00 PM',
              place: 'Rezzala Dining & Afternoon Tea',
              distanceFromHotel: 'In-House',
              details: 'Fresh Himalayan tea and hot comfort meals without any rush.',
              type: 'food',
              highlightTag: 'Relaxed Meal',
            },
            {
              time: '04:30 PM',
              place: 'George Everest Sunset View',
              distanceFromHotel: '1.5 Kms Drive',
              details: 'Comfortable taxi drive to the panoramic viewing zone for sunset photography.',
              type: 'drive',
              highlightTag: 'Sunset Magic',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Landour Heritage & British Ambience',
          theme: 'Historic Churches, Bakeries & Deodar Canopy',
          schedule: [
            {
              time: '10:00 AM',
              place: 'Landour Bakehouse & Chaar Dukan',
              distanceFromHotel: '5 Kms Drive',
              details: 'Sip ginger lemon honey tea, savor freshly baked cinnamon rolls, and soak in colonial tranquility.',
              type: 'drive',
              highlightTag: 'Artisanal Bakery',
            },
            {
              time: '03:00 PM',
              place: 'Company Garden Greenhouses',
              distanceFromHotel: '300m Walk',
              details: 'Lush rare orchids, giant deodars, and serene park benches.',
              type: 'walk',
              highlightTag: 'Botanical Beauty',
            },
          ],
        },
      ],
      adventure: [
        {
          day: 1,
          title: 'Day 1: George Everest Summit & Happy Valley Ridge',
          theme: 'Steep Trails, High Ridges & Sunset Heights',
          schedule: [
            {
              time: '08:00 AM',
              place: 'Dalai Hills to Hathipaon Forest Trek',
              distanceFromHotel: 'Starts at Hotel Gate',
              details: 'Offbeat dirt trails through dense deodar forests with steep ascents and pristine air.',
              type: 'walk',
              highlightTag: 'Forest Trek',
            },
            {
              time: '02:00 PM',
              place: 'Sir George Everest Summit Hike',
              distanceFromHotel: '1.5 Kms Drive + 1.5 Km Trek',
              details: 'Climb the rocky ridge to the historic triangulation pillar with sheer valley drops on both sides.',
              type: 'walk',
              highlightTag: 'Peak Summit',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Benog Wildlife Trek & Kempty Splash',
          theme: 'Sanctuary Trails, Off-road Drives & Natural Pools',
          schedule: [
            {
              time: '07:30 AM',
              place: 'Benog Wildlife Sanctuary Deep Hike',
              distanceFromHotel: '3.5 Kms Drive',
              details: 'Trek inside the protected bird sanctuary towards old Benog hill top and Aglar River valley.',
              type: 'walk',
              highlightTag: 'Sanctuary Trek',
            },
            {
              time: '01:00 PM',
              place: 'Kempty Falls Natural Cascades',
              distanceFromHotel: '11 Kms Drive',
              details: 'Dip in natural cold mountain water springs surrounded by rocky gorge cliffs.',
              type: 'drive',
              highlightTag: 'Cold Spring Dip',
            },
          ],
        },
      ],
    },
    3: {
      couple: [
        {
          day: 1,
          title: 'Day 1: Happy Valley Heritage & Sunset',
          theme: 'Tibetan Monastery, Dalai Hills & Everest Point',
          schedule: [
            {
              time: 'Morning',
              place: 'Buddha Temple & Dalai Hills (100m Walk)',
              distanceFromHotel: '100m Walk',
              details: 'Tibetan cultural immersion and morning prayer flags romantic photography.',
              type: 'walk',
              highlightTag: 'Romantic Morning',
            },
            {
              time: 'Evening',
              place: 'George Everest Sunset Point',
              distanceFromHotel: '1.5 Kms Drive',
              details: '360° panoramic sunset over the Doon Valley and Garhwal peaks.',
              type: 'drive',
              highlightTag: 'Golden Hour',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Kempty Falls & Landour Chaar Dukan',
          theme: 'Cascading Waters & British Colonial Heritage',
          schedule: [
            {
              time: 'Morning',
              place: 'Kempty Falls Splash (11 Kms)',
              distanceFromHotel: '11 Kms Drive',
              details: 'Scenic waterfall drive through mountain mist and pine valleys.',
              type: 'drive',
              highlightTag: 'Waterfalls',
            },
            {
              time: 'Afternoon',
              place: 'Landour Bakehouse & Sister’s Bazaar',
              distanceFromHotel: '5 Kms Drive',
              details: 'Old world colonial British hill town ambiance with pancakes and hot coffee.',
              type: 'drive',
              highlightTag: 'Colonial Cafe',
            },
          ],
        },
        {
          day: 3,
          title: 'Day 3: Company Garden & Mall Road Souvenirs',
          theme: 'Botanical Gardens, Mall Road & Departure',
          schedule: [
            {
              time: 'Morning',
              place: 'Company Garden & Pine Walks',
              distanceFromHotel: '300m Walk',
              details: 'Floral nursery, pedal boating, and tranquil nature trails.',
              type: 'walk',
              highlightTag: 'Botanical Walk',
            },
            {
              time: 'Evening',
              place: 'The Mall Road Mussoorie Stroll',
              distanceFromHotel: '1.4 Kms Drive',
              details: 'Handicrafts, Tibetan shawls, wooden souvenirs, and scenic drive back.',
              type: 'drive',
              highlightTag: 'Shopping & Gifts',
            },
          ],
        },
      ],
      family: [
        {
          day: 1,
          title: 'Day 1: Happy Valley Cultural Discovery & Boating',
          theme: 'Monastery, Dalai Hills & Company Garden Lake',
          schedule: [
            {
              time: 'Morning',
              place: 'Tibetan Buddha Temple & Dalai Hills',
              distanceFromHotel: '100m Walk',
              details: 'Golden temple architecture, prayer wheels, and easy family walking paths.',
              type: 'walk',
              highlightTag: 'Culture & Flags',
            },
            {
              time: 'Afternoon',
              place: 'Company Garden Boating & Wax Museum',
              distanceFromHotel: '300m Walk',
              details: 'Pedal boat rides and interactive flower exhibits for children.',
              type: 'walk',
              highlightTag: 'Boating & Fun',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Kempty Falls Adventure & Cable Car',
          theme: 'Waterfall Waterfun & Gun Hill Ropeway',
          schedule: [
            {
              time: 'Morning',
              place: 'Kempty Falls Fun Zone',
              distanceFromHotel: '11 Kms Drive',
              details: 'Splash in natural pools and ride the cable car over the gorge.',
              type: 'drive',
              highlightTag: 'Splash Pool',
            },
            {
              time: 'Evening',
              place: 'Gun Hill Ropeway & Mall Road',
              distanceFromHotel: '1.4 Kms Drive',
              details: 'Ropeway car ride to Mussoorie’s second highest point with telescope views.',
              type: 'drive',
              highlightTag: 'Ropeway Experience',
            },
          ],
        },
        {
          day: 3,
          title: 'Day 3: George Everest Heritage & Pine Treks',
          theme: 'Museum Exploration & Nature Memories',
          schedule: [
            {
              time: 'Morning',
              place: 'George Everest Cartography Museum',
              distanceFromHotel: '1.5 Kms Drive',
              details: 'Learn how Mt. Everest was measured and enjoy wide grassy hill lawns.',
              type: 'drive',
              highlightTag: 'Historic Museum',
            },
            {
              time: 'Afternoon',
              place: 'Special Rezzala Lunch & Check-out',
              distanceFromHotel: 'In-House',
              details: 'Delicious multicuisine buffet with fresh mountain dishes before departure.',
              type: 'food',
              highlightTag: 'Farewell Meal',
            },
          ],
        },
      ],
      leisure: [
        {
          day: 1,
          title: 'Day 1: Serene Happy Valley Unwinding',
          theme: 'Dalai Hills, Prayer Wheels & Pine Therapy',
          schedule: [
            {
              time: 'Morning',
              place: 'Dalai Hills Scenic Meditation Ridge',
              distanceFromHotel: '150m Walk',
              details: 'Gentle flat walk with panoramic valley vistas and zero rush.',
              type: 'walk',
              highlightTag: 'Quiet Ridge',
            },
            {
              time: 'Evening',
              place: 'George Everest Sunset Point',
              distanceFromHotel: '1.5 Kms Drive',
              details: 'Breathtaking 360° golden sunset views over Doon Valley.',
              type: 'drive',
              highlightTag: 'Sunset Views',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Landour British Colonial Heritage',
          theme: 'Chaar Dukan, Deodar Walks & Old Bakeries',
          schedule: [
            {
              time: 'Morning',
              place: 'Chaar Dukan & Landour Bakehouse',
              distanceFromHotel: '5 Kms Drive',
              details: 'Quiet colonial lanes under towering deodars and gourmet bakery coffee.',
              type: 'drive',
              highlightTag: 'Historic Landour',
            },
            {
              time: 'Evening',
              place: 'Camel’s Back Road Quiet Walk',
              distanceFromHotel: '1.8 Kms Drive',
              details: 'Peaceful sunset walk away from traffic with natural rock formations.',
              type: 'walk',
              highlightTag: 'Sunset Stroll',
            },
          ],
        },
        {
          day: 3,
          title: 'Day 3: Botanical Nurseries & Relaxed Departure',
          theme: 'Company Garden & Souvenir Collection',
          schedule: [
            {
              time: 'Morning',
              place: 'Company Garden Greenhouse & Tea',
              distanceFromHotel: '300m Walk',
              details: 'Explore heritage British flora and enjoy warm masala chai.',
              type: 'walk',
              highlightTag: 'Nature Garden',
            },
            {
              time: 'Afternoon',
              place: 'Mistwood Rezzala Lunch & Farewell',
              distanceFromHotel: 'In-House',
              details: 'Freshly prepared feast with attentive mountain hospitality.',
              type: 'food',
              highlightTag: 'Rezzala Feast',
            },
          ],
        },
      ],
      adventure: [
        {
          day: 1,
          title: 'Day 1: Happy Valley Ridge to Everest Peak',
          theme: 'Forest Treks, Flag Trails & High Ridge Climbing',
          schedule: [
            {
              time: 'Morning',
              place: 'Dalai Hills High Flag Trail Hike',
              distanceFromHotel: '150m Walk',
              details: 'Trek up to the high Tibetan stupa with 360° mountain winds.',
              type: 'walk',
              highlightTag: 'Ridge Trail',
            },
            {
              time: 'Evening',
              place: 'Sir George Everest Summit Climb',
              distanceFromHotel: '1.5 Kms Drive + Peak Hike',
              details: 'Summit climb to the highest point overlooking Hathipaon gorge.',
              type: 'walk',
              highlightTag: 'Summit Trek',
            },
          ],
        },
        {
          day: 2,
          title: 'Day 2: Benog Wildlife Trek & Kempty Ravine',
          theme: 'Sanctuary Hiking & Waterfall Scrambling',
          schedule: [
            {
              time: 'Morning',
              place: 'Benog Wildlife Sanctuary Deep Forest Hike',
              distanceFromHotel: '3.5 Kms Drive',
              details: 'Hike through oak & pine wilderness exploring Himalayan bird habitats.',
              type: 'walk',
              highlightTag: 'Deep Wilderness',
            },
            {
              time: 'Afternoon',
              place: 'Kempty Falls Natural Gorge Trek',
              distanceFromHotel: '11 Kms Drive',
              details: 'Explore offbeat natural cascades beyond main commercial pools.',
              type: 'drive',
              highlightTag: 'Gorge Exploration',
            },
          ],
        },
        {
          day: 3,
          title: 'Day 3: Cloud’s End Wilderness Trail & Departure',
          theme: 'Deodar Canopy Hike & Mussoorie Border Trails',
          schedule: [
            {
              time: 'Morning',
              place: 'Cloud’s End & Hathipaon Trek',
              distanceFromHotel: '4.5 Kms Drive',
              details: 'Trek along the geographical end of Mussoorie hill ridge through 2,000-acre virgin forests.',
              type: 'walk',
              highlightTag: 'Virgin Deodar Trek',
            },
            {
              time: 'Afternoon',
              place: 'High-Protein Lunch & Homeward Journey',
              distanceFromHotel: 'In-House',
              details: 'Hearty warm meal at Mistwood Manor before downhill drive.',
              type: 'food',
              highlightTag: 'Recharge Meal',
            },
          ],
        },
      ],
    },
  };

  const currentPlan = itineraries[selectedDuration]?.[travelStyle] || itineraries[2]['couple'];

  const styleIcons: Record<TravelStyle, React.ReactNode> = {
    couple: <Heart className="w-3.5 h-3.5 text-rose-400" />,
    family: <Users className="w-3.5 h-3.5 text-sky-400" />,
    leisure: <Coffee className="w-3.5 h-3.5 text-amber-400" />,
    adventure: <Mountain className="w-3.5 h-3.5 text-emerald-400" />,
  };

  return (
    <section id="itinerary" className="py-16 sm:py-20 bg-slate-950/90 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sightseeing Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Curated Mussoorie Itineraries <br />
            <span className="text-amber-400">Starting from Mistwood Manor</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Crafted specifically from our prime Happy Valley location. Select your stay duration and travel style to see customized step-by-step sightseeing plans.
          </p>
        </div>

        {/* Filter Controls Card */}
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 mb-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-5">
            {/* Stay Duration Selector (Fixed duplication issue) */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block">
                1. Select Stay Duration:
              </span>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setSelectedDuration(dur as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedDuration === dur
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{dur === 1 ? '1 Day Quick Trip' : `${dur} Days Getaway`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style Selector (Working dynamic filter) */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block">
                2. Select Travel Style:
              </span>
              <div className="flex flex-wrap gap-2">
                {(['couple', 'family', 'leisure', 'adventure'] as const).map((style) => {
                  const isActive = travelStyle === style;
                  return (
                    <button
                      key={style}
                      onClick={() => setTravelStyle(style)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-2 border-amber-400 text-amber-300 shadow-md font-bold'
                          : 'bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {styleIcons[style]}
                      <span>{style}</span>
                      {isActive && <CheckCircle2 className="w-3 h-3 text-amber-400 ml-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Filter Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-mono">Viewing Plan:</span>
              <span className="text-amber-300 font-semibold uppercase font-mono bg-amber-950/40 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                {selectedDuration} {selectedDuration === 1 ? 'Day' : 'Days'} • {travelStyle} Edition
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">
              All destinations timed and routed directly from Mistwood Manor, Happy Valley
            </span>
          </div>

          {/* Itinerary Schedule Output */}
          <div className="space-y-8 pt-2">
            {currentPlan.map((dayItem) => (
              <div key={dayItem.day} className="space-y-4">
                {/* Day Header Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-md">
                    Day {dayItem.day}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                      {dayItem.title}
                    </h3>
                    <span className="text-xs text-amber-400/90 font-medium">{dayItem.theme}</span>
                  </div>
                </div>

                {/* Day Schedule Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {dayItem.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {item.time}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                            {item.distanceFromHotel}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                            {item.place}
                          </h4>
                          {item.highlightTag && (
                            <span className="inline-block text-[10px] text-emerald-400 font-semibold mt-0.5">
                              ★ {item.highlightTag}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                          {item.details}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {item.type === 'walk' ? (
                            <>
                              <Footprints className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="text-emerald-300 font-medium">Walking Distance</span>
                            </>
                          ) : item.type === 'drive' ? (
                            <>
                              <Car className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span className="text-indigo-300 font-medium">Short Cab Drive</span>
                            </>
                          ) : (
                            <>
                              <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span className="text-amber-300 font-medium">Rezzala In-House</span>
                            </>
                          )}
                        </div>
                        <span className="text-slate-500 text-[10px] uppercase font-mono">Happy Valley</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Book this experience CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ready to experience Mussoorie from Happy Valley?</span>
              </div>
              <div className="text-xs text-slate-300">
                Book your Super Deluxe stay at Mistwood Manor starting from only <strong>₹2,700/night</strong> with free breakfast.
              </div>
            </div>
            <button
              onClick={onBookNow}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 shrink-0 cursor-pointer transition-all transform active:scale-95"
            >
              <span>Book Your Stay Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
