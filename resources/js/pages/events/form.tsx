import React from 'react';
import { useForm } from '@inertiajs/react';

interface EventData {
  name?: string;
  start_time?: string;
  end_time?: string;
  cost?: number;
}

export default function EventForm({ event = {} }: { event?: EventData }) {
  const { data, setData, post, put, processing, errors } = useForm<EventData>({
    name: event.name || '',
    start_time: event.start_time || '',
    end_time: event.end_time || '',
    cost: event.cost || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    event && event.name ? put(`/events/${event.id}`) : post('/events');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block font-medium">Name</label>
        <input
          className="w-full border p-2 rounded"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">Start Time</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={data.start_time}
            onChange={(e) => setData('start_time', e.target.value)}
          />
          {errors.start_time && <div className="text-red-600 text-sm">{errors.start_time}</div>}
        </div>
        <div className="flex-1">
          <label className="block font-medium">End Time</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={data.end_time}
            onChange={(e) => setData('end_time', e.target.value)}
          />
          {errors.end_time && <div className="text-red-600 text-sm">{errors.end_time}</div>}
        </div>
      </div>

      <div>
        <label className="block font-medium">Cost</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={data.cost}
          onChange={(e) => setData('cost', Number(e.target.value))}
        />
        {errors.cost && <div className="text-red-600 text-sm">{errors.cost}</div>}
      </div>

      <button
        type="submit"
        disabled={processing}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {event && event.name ? 'Update' : 'Create'} Event
      </button>
    </form>
  );
}
