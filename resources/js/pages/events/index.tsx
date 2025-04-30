import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Index() {
  const { events } = usePage().props as { events: any[] };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <Link href="/events/create" className="bg-blue-500 text-white px-4 py-2 rounded">Create Event</Link>
      <ul className="mt-6 space-y-2">
        {events.map((event) => (
          <li key={event.id} className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p className="text-sm">{event.start_time} → {event.end_time}</p>
            <p className="text-sm text-gray-600">Cost: ${event.cost}</p>
            <Link href={`/events/${event.id}/edit`} className="text-blue-600 text-sm mr-4">Edit</Link>
            <Link href={`/events/${event.id}`} className="text-green-600 text-sm">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
