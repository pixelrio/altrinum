import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventForm from './EventForm';
import api from '../../api';
import toast from 'react-hot-toast';

// Event type shape (matching your schema)
interface EventFormData {
  name: string;
  start_time: string;
  end_time: string;
  cost: number;
  early_bird_cost: number;
  format: 'online' | 'in-person' | 'hybrid';
  series_id: number;
  tenant_id: number;
}

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Partial<EventFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/events/${id}`)
        .then(response => {
          setEvent(response.data);
        })
        .catch(() => {
          toast.error('Failed to load event.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-6">Loading event...</div>;
  if (!event) return <div className="p-6">Event not found.</div>;

  return <EventForm mode="edit" id={id} event={event} />;
}
