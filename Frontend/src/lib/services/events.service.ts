import axios from '../axios';

export interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: number;
  price: number;
  images: string[];
  category: number;
  status: 'draft' | 'published' | 'cancelled';
  total_tickets: number;
  available_tickets: number;
  is_featured: boolean;
}

export interface EventFilters {
  category?: number;
  search?: string;
  date?: string;
  price_min?: number;
  price_max?: number;
  page?: number;
  page_size?: number;
}

export const EventsService = {
  getEvents: async (filters?: EventFilters) => {
    const response = await axios.get('/events/', { params: filters });
    return response.data;
  },

  getEvent: async (id: number) => {
    const response = await axios.get(`/events/${id}/`);
    return response.data;
  },

  createEvent: async (data: Partial<Event>) => {
    const response = await axios.post('/events/', data);
    return response.data;
  },

  updateEvent: async (id: number, data: Partial<Event>) => {
    const response = await axios.put(`/events/${id}/`, data);
    return response.data;
  },

  deleteEvent: async (id: number) => {
    const response = await axios.delete(`/events/${id}/`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get('/categories/');
    return response.data;
  },

  createCategory: async (data: { name: string; description?: string }) => {
    const response = await axios.post('/categories/', data);
    return response.data;
  },
}; 