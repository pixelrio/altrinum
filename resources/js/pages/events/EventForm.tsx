import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

// 1. Define Zod schema
const eventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
  cost: z.coerce.number().nonnegative(),
  early_bird_cost: z.coerce.number().nonnegative(),
  format: z.enum(['online', 'in-person', 'hybrid']),
  series_id: z.coerce.number().int(),
  tenant_id: z.coerce.number().int(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: Partial<EventFormData>;
  mode: 'create' | 'edit';
  id?: string;
}

export default function EventForm({ event, mode, id }: EventFormProps) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      start_time: '',
      end_time: '',
      cost: 0,
      early_bird_cost: 0,
      format: 'in-person',
      series_id: 1,
      tenant_id: 1,
    }
  });

  // 2. If we are editing, preload the form with existing event
  useEffect(() => {
    if (event) {
      reset(event);
    }
  }, [event, reset]);

  const onSubmit = async (data: EventFormData) => {
    try {
      if (mode === 'create') {
        await api.post('/events', data);
        toast.success('Event created successfully!');
      } else {
        await api.put(`/events/${id}`, data);
        toast.success('Event updated successfully!');
      }
      navigate('/events');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{mode === 'create' ? 'Create' : 'Edit'} Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Event Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        {/* Start and End Times */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Start Time</label>
            <input
              type="datetime-local"
              {...register('start_time')}
              className="w-full border p-2 rounded"
            />
            {errors.start_time && <p className="text-red-600 text-sm">{errors.start_time.message}</p>}
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">End Time</label>
            <input
              type="datetime-local"
              {...register('end_time')}
              className="w-full border p-2 rounded"
            />
            {errors.end_time && <p className="text-red-600 text-sm">{errors.end_time.message}</p>}
          </div>
        </div>

        {/* Costs */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Cost</label>
            <input
              type="number"
              {...register('cost', { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.cost && <p className="text-red-600 text-sm">{errors.cost.message}</p>}
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">Early Bird Cost</label>
            <input
              type="number"
              {...register('early_bird_cost', { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.early_bird_cost && <p className="text-red-600 text-sm">{errors.early_bird_cost.message}</p>}
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block font-semibold mb-1">Format</label>
          <select
            {...register('format')}
            className="w-full border p-2 rounded"
          >
            <option value="in-person">In-Person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {errors.format && <p className="text-red-600 text-sm">{errors.format.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:bg-green-300"
        >
          {isSubmitting ? (mode === 'create' ? 'Saving...' : 'Updating...') : (mode === 'create' ? 'Save' : 'Update')}
        </button>
      </form>
    </section>
  );
}
