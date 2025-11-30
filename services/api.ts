import { Service, Booking, TimeSlot, UserDetails } from '../types';

// Use relative URL for same-origin requests (works for both Docker and Vercel)
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

// Helper to simulate network latency (can be removed in production)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getServices: async (): Promise<Service[]> => {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  },

  getAvailability: async (date: Date, serviceId: string): Promise<TimeSlot[]> => {
    const dateStr = date.toISOString().split('T')[0];
    const response = await fetch(`${API_BASE_URL}/availability?date=${dateStr}&serviceId=${serviceId}`);
    if (!response.ok) throw new Error('Failed to fetch availability');
    return response.json();
  },

  sendOtp: async (phone: string): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    if (!response.ok) throw new Error('Failed to send OTP');
    const data = await response.json();
    return data.success;
  },

  verifyOtp: async (phone: string, code: string): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code })
    });
    if (!response.ok) throw new Error('Failed to verify OTP');
    const data = await response.json();
    return data.verified;
  },

  createBooking: async (payload: any): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },

  rescheduleBooking: async (bookingId: string, newDate: string, newTime: string): Promise<Booking | null> => {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/reschedule`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate, time: newTime })
    });
    if (!response.ok) return null;
    return response.json();
  },

  getBookingsByEmail: async (email: string): Promise<Booking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  getAllBookings: async (): Promise<Booking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  cancelBooking: async (bookingId: string): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) return false;
    const data = await response.json();
    return data.success;
  }
};

