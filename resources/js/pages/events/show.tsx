import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Show() {
  const { event } = usePage().props as { event: any };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-sm mt-2">{event.start_time} → {event.end_time}</p>
      <p className="text-sm text-gray-600">Cost: ${event.cost}</p>
      <Link href="/events" className="text-blue-600 mt-4 inline-block">Back to events</Link>
    </div>
  );
}
