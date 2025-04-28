import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

// Event Type
interface Event {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  cost: number;
  early_bird_cost: number;
  format: string;
}

export default function ShowEvent() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const response = await api.get<Event>(`/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      toast.error('Failed to load event.');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async () => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Event deleted successfully!');
      navigate('/events');
    } catch (error) {
      toast.error('Error deleting event.');
    }
  };

  if (loading) return <div className="p-6">Loading event...</div>;
  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event.name}</h1>
        <div className="flex gap-4">
          <Link to={`/events/${event.id}/edit`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Edit
          </Link>
          <button onClick={deleteEvent} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </header>

      <div className="space-y-4">
        <p><strong>Start:</strong> {new Date(event.start_time).toLocaleString()}</p>
        <p><strong>End:</strong> {new Date(event.end_time).toLocaleString()}</p>
        <p><strong>Format:</strong> {event.format}</p>
        <p><strong>Cost:</strong> ${event.cost.toFixed(2)}</p>
        <p><strong>Early Bird Cost:</strong> ${event.early_bird_cost.toFixed(2)}</p>
      </div>
    </section>
  );
}
