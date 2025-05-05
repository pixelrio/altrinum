import React from 'react';
import { usePage } from '@inertiajs/react';
import EventForm from './form';

export default function Edit() {
  const { event } = usePage().props as { event: any };
  return <EventForm mode="edit" event={event} />;
}
