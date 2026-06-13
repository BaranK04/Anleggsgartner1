import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, appStore } from '../store';
import { useAuth } from './AuthContext';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'userId' | 'userName' | 'userEmail'>) => void;
  updateStatus: (id: string, status: Booking['status']) => void;
  refreshBookings: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const refreshBookings = () => {
    const all = appStore.getBookings();
    if (user?.role === 'admin') {
      setBookings(all);
    } else if (user) {
      setBookings(all.filter(b => b.userId === user.id));
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    refreshBookings();
  }, [user]);

  const addBooking = (data: Omit<Booking, 'id' | 'createdAt' | 'status' | 'userId' | 'userName' | 'userEmail'>) => {
    if (!user) return;
    const newBooking: Booking = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    appStore.saveBooking(newBooking);
    refreshBookings();
  };

  const updateStatus = (id: string, status: Booking['status']) => {
    if (user?.role !== 'admin') return;
    appStore.updateBookingStatus(id, status);
    refreshBookings();
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateStatus, refreshBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBookings must be used within BookingProvider");
  return context;
};
