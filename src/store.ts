// Local storage backed state management for users and bookings
export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  service: string;
  date: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

class Store {
  private getStorage(key: string, defaultValue: any) {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    try {
      return JSON.parse(item);
    } catch {
      return defaultValue;
    }
  }

  private setStorage(key: string, value: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getUsers(): User[] {
    return this.getStorage('ug_users', [{ id: 'admin1', name: 'Admin Eier', email: 'admin@anleggsgartner1.no', role: 'admin' }]);
  }

  saveUser(user: User) {
    const users = this.getUsers();
    if (!users.find(u => u.id === user.id)) {
      this.setStorage('ug_users', [...users, user]);
    }
  }

  getBookings(): Booking[] {
    return this.getStorage('ug_bookings', []);
  }

  saveBooking(booking: Booking) {
    const bookings = this.getBookings();
    this.setStorage('ug_bookings', [booking, ...bookings]);
  }

  updateBookingStatus(id: string, status: Booking['status']) {
    const bookings = this.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    this.setStorage('ug_bookings', updated);
  }
}

export const appStore = new Store();
