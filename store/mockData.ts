export const MOCK_USERS = {
  customer: { id: 'c1', name: 'Moksh', role: 'CUSTOMER', phone: '9876543210', email: 'customer@demo.com', hostel: 'Hostel A, North Campus' },
  provider: { id: 'p1', name: 'Seema Aunty', role: 'PROVIDER', phone: '9876543211', email: 'provider@demo.com', storeName: "Seema Aunty's Kitchen" },
  admin: { id: 'a1', name: 'Admin', role: 'ADMIN', phone: '9876543212', email: 'admin@demo.com' }
};

export const MOCK_PROVIDERS = [
  {
    id: 'p1',
    name: "Seema Aunty",
    speciality: "Gujarati Home Food",
    rating: 4.8,
    reviews: 124,
    distance: "2.1 km",
    address: "Sector 14, North Campus",
    image: require('@/assets/images/food_gujarati_thali.jpg'),
    isVerified: true,
    mealsServed: 847,
    reorderRate: "97%",
  },
  {
    id: 'p2',
    name: "Neha's Kitchen",
    speciality: "Punjabi Comfort Food",
    rating: 4.9,
    reviews: 89,
    distance: "1.5 km",
    address: "Hostel Road, Near Gate 2",
    image: require('@/assets/images/food_paneer_bhurji.jpg'),
    isVerified: true,
    mealsServed: 532,
    reorderRate: "94%",
  },
  {
    id: 'p3',
    name: "Rajma Station",
    speciality: "North Indian Regulars",
    rating: 4.6,
    reviews: 201,
    distance: "3.0 km",
    address: "Market Square",
    image: require('@/assets/images/food_rajma_rice.jpg'),
    isVerified: false,
    mealsServed: 1200,
    reorderRate: "91%",
  }
];

// Keep original MOCK_MEALS for backward compatibility if needed during refactor
export const MOCK_MEALS = [
  {
    id: 'm1',
    providerId: 'p1',
    name: "Gujarati Thali (Full)",
    description: "Authentic Gujarati thali with 3 rotis, dal, kadhi, 2 sabzis, rice, and pickle.",
    price: 120,
    rating: 4.8,
    isVeg: true,
    availableQuantity: 20,
    image: require('@/assets/images/food_gujarati_thali.jpg'),
    category: "Lunch"
  },
  {
    id: 'm2',
    providerId: 'p2',
    name: "Rajma Chawal Bowl",
    description: "Homestyle rajma cooked overnight, served with premium basmati rice and onion salad.",
    price: 90,
    rating: 4.9,
    isVeg: true,
    availableQuantity: 15,
    image: require('@/assets/images/food_rajma_rice.jpg'),
    category: "Lunch"
  },
  {
    id: 'm3',
    providerId: 'p1',
    name: "Methi Thepla & Chundo",
    description: "Soft methi theplas served with sweet mango chundo (pickle). Perfect for breakfast.",
    price: 60,
    rating: 4.7,
    isVeg: true,
    availableQuantity: 30,
    image: require('@/assets/images/food_thepla.jpg'),
    category: "Breakfast"
  },
  {
    id: 'm4',
    providerId: 'p2',
    name: "Paneer Bhurji & Paratha",
    description: "Spicy and tangy paneer bhurji served with 2 flaky parathas.",
    price: 110,
    rating: 4.8,
    isVeg: true,
    availableQuantity: 10,
    image: require('@/assets/images/food_paneer_bhurji.jpg'),
    category: "Dinner"
  }
];

export const MOCK_LOCATIONS = [
  { id: 'l1', name: 'Hostel A Reception', address: 'North Campus, Delhi' },
  { id: 'l2', name: 'PG Block B Gate', address: 'South Campus, Delhi' },
  { id: 'l3', name: 'Tech Park Entry 1', address: 'Sector 62' },
];

export const MOCK_PLANNED_MEALS = [
  {
    id: 'pm1',
    providerId: 'p1',
    name: "Gujarati Thali",
    description: "Authentic Gujarati thali with 3 rotis, dal, kadhi, 2 sabzis, rice, and pickle.",
    image: require('@/assets/images/food_gujarati_thali.jpg'),
    date: "Tomorrow",
    mealType: "Lunch",
    startTime: "12:30 PM",
    endTime: "2:00 PM",
    price: 120,
    bookingAmount: 30,
    maxServings: 25,
    bookedServings: 8,
    cutoffTime: "Tonight 10:00 PM",
    pickupLocations: ['l1', 'l2'],
    fulfillmentOptions: ['BULK_DELIVERY', 'SELF_PICKUP'],
    status: 'ACTIVE', // ACTIVE, COMPLETED, DRAFT
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'pm2',
    providerId: 'p2',
    name: "Paneer Rice Bowl",
    description: "Homestyle paneer cooked with fresh spices, served with premium basmati rice.",
    image: require('@/assets/images/food_paneer_bhurji.jpg'),
    date: "Tomorrow",
    mealType: "Dinner",
    startTime: "7:30 PM",
    endTime: "9:00 PM",
    price: 100,
    bookingAmount: 25,
    maxServings: 15,
    bookedServings: 4,
    cutoffTime: "Tomorrow 4:00 PM",
    pickupLocations: ['l1'],
    fulfillmentOptions: ['BULK_DELIVERY'],
    status: 'ACTIVE',
    rating: 4.9,
    reviews: 89
  }
];
