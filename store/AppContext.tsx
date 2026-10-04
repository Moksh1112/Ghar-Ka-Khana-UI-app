import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_USERS, MOCK_PROVIDERS, MOCK_MEALS, MOCK_LOCATIONS, MOCK_PLANNED_MEALS } from './mockData';
import { useRouter } from 'expo-router';

export type PlannedMeal = typeof MOCK_PLANNED_MEALS[0];

export type Reservation = {
  id: string;
  customerId: string;
  plannedMealId: string;
  providerId: string;
  quantity: number;
  totalAmount: number;
  bookingAmountPaid: number;
  remainingAmount: number;
  fulfillmentMethod: 'BULK_DELIVERY' | 'SELF_PICKUP';
  pickupLocation?: string;
  status: 'RESERVED' | 'BOOKING CONFIRMED' | 'BOOKING CLOSED' | 'PREPARING' | 'READY' | 'BULK BATCH READY' | 'AT PICKUP LOCATION' | 'READY FOR COLLECTION' | 'READY FOR PICKUP' | 'COLLECTED';
  createdAt: string;
  otp: string;
};

interface AppContextType {
  user: any;
  login: (role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN') => void;
  logout: () => void;
  
  // Backward compatibility for old UI elements while refactoring
  cart: any[];
  addToCart: (meal: any) => void;
  removeFromCart: (mealId: string) => void;
  clearCart: () => void;
  
  plannedMeals: PlannedMeal[];
  addPlannedMeal: (meal: Omit<PlannedMeal, 'id' | 'status' | 'bookedServings' | 'rating' | 'reviews'>) => void;

  reservations: Reservation[];
  placeReservation: (mealId: string, quantity: number, fulfillmentMethod: 'BULK_DELIVERY' | 'SELF_PICKUP', pickupLocation?: string) => string;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  
  // Legacy orders support
  orders: any[];
  placeOrder: (fulfillmentMethod: 'BULK_DELIVERY' | 'SELF_PICKUP', pickupLocationId?: string) => string;
  updateOrderStatus: (orderId: string, status: any) => void;
  
  favorites: string[];
  toggleFavorite: (providerId: string) => void;

  providers: typeof MOCK_PROVIDERS;
  approveProvider: (id: string) => void;
  
  meals: typeof MOCK_MEALS;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [meals, setMeals] = useState(MOCK_MEALS);
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>(MOCK_PLANNED_MEALS);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const login = (role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN') => {
    setUser(MOCK_USERS[role.toLowerCase() as keyof typeof MOCK_USERS]);
  };

  const logout = () => {
    setUser(null);
    router.replace('/(auth)/login');
  };

  const addToCart = (meal: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.meal.id === meal.id);
      if (existing) {
        return prev.map(item => item.meal.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { meal, quantity: 1 }];
    });
  };
  const removeFromCart = (mealId: string) => setCart(prev => prev.filter(item => item.meal.id !== mealId));
  const clearCart = () => setCart([]);

  const placeOrder = (fulfillmentMethod: 'BULK_DELIVERY' | 'SELF_PICKUP', pickupLocationId?: string) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.meal.price * item.quantity), 0);
    const deliveryFee = fulfillmentMethod === 'BULK_DELIVERY' ? 30 : 0;
    const newOrder = {
      id: `GK${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      fulfillmentMethod,
      pickupLocationId,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      status: 'PLACED',
      date: new Date().toISOString(),
      otp: Math.floor(1000 + Math.random() * 9000).toString()
    };
    setOrders([newOrder, ...orders]);
    clearCart();
    return newOrder.id;
  };
  const updateOrderStatus = (orderId: string, status: any) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addPlannedMeal = (mealData: Omit<PlannedMeal, 'id' | 'status' | 'bookedServings' | 'rating' | 'reviews'>) => {
    const newMeal: PlannedMeal = {
      ...mealData,
      id: `pm${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'ACTIVE',
      bookedServings: 0,
      rating: 0,
      reviews: 0
    };
    setPlannedMeals(prev => [newMeal, ...prev]);
  };

  const placeReservation = (mealId: string, quantity: number, fulfillmentMethod: 'BULK_DELIVERY' | 'SELF_PICKUP', pickupLocation?: string) => {
    const meal = plannedMeals.find(m => m.id === mealId);
    if (!meal) throw new Error("Meal not found");
    
    const newRes: Reservation = {
      id: `GK-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: user?.id || MOCK_USERS.customer.id,
      plannedMealId: meal.id,
      providerId: meal.providerId,
      quantity,
      totalAmount: meal.price * quantity,
      bookingAmountPaid: meal.bookingAmount * quantity,
      remainingAmount: (meal.price - meal.bookingAmount) * quantity,
      fulfillmentMethod,
      pickupLocation,
      status: 'RESERVED',
      createdAt: new Date().toISOString(),
      otp: Math.floor(1000 + Math.random() * 9000).toString()
    };
    
    // Update booked servings
    setPlannedMeals(prev => prev.map(m => m.id === mealId ? { ...m, bookedServings: m.bookedServings + quantity } : m));
    setReservations(prev => [newRes, ...prev]);
    return newRes.id;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => prev.includes(providerId) ? prev.filter(id => id !== providerId) : [...prev, providerId]);
  };
  const approveProvider = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, isVerified: true } : p));
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      cart, addToCart, removeFromCart, clearCart,
      orders, placeOrder, updateOrderStatus,
      plannedMeals, addPlannedMeal,
      reservations, placeReservation, updateReservationStatus,
      favorites, toggleFavorite,
      providers, approveProvider,
      meals
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
