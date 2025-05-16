import axios from '../axios';

export interface Booking {
  id: number;
  event: number;
  event_availability: number;
  number_of_tickets: number;
  unit_price: number;
  total_amount: number;
  booking_status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  event_id: number;
  event_availability_id: number;
  number_of_tickets: number;
}

export const BookingsService = {
  getBookings: async () => {
    const response = await axios.get('/bookings/');
    return response.data;
  },

  getBooking: async (id: number) => {
    const response = await axios.get(`/bookings/${id}/`);
    return response.data;
  },

  createBooking: async (data: CreateBookingData) => {
    const response = await axios.post('/bookings/', data);
    return response.data;
  },

  updateBookingStatus: async (id: number, booking_status: Booking['booking_status']) => {
    const response = await axios.put(`/bookings/${id}/`, { booking_status });
    return response.data;
  },

  cancelBooking: async (id: number) => {
    const response = await axios.delete(`/bookings/${id}/`);
    return response.data;
  },
}; 