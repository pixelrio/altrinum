import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

// Event Type
interface Event {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get<{ data: Event[] }>('/events');
      setEvents(response.data.data);
    } catch (error) {
      toast.error('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      toast.error('Error deleting event.');
    }
  };

  return (
    <section className="p-6">
      <header className="flex justify-between items-cent
