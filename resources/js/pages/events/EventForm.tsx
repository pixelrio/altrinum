
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { router } from '@inertiajs/react';

const schema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  start_time: yup.string().required('Start time is required'),
  end_time: yup.string().required('End time is required'),
  cost: yup.number().typeError('Cost must be a number').min(0).required(),
  early_bird_cost: yup.number().typeError('Early bird cost must be a number').min(0).required(),
  format: yup.string().oneOf(['online', 'in-person', 'hybrid']).required(),
  series_id: yup.number().typeError('Series ID must be a number').required(),
  tenant_id: yup.number().typeError('Tenant ID must be a number').required(),
});

type EventFormData = yup.InferType<typeof schema>;

interface EventFormProps {
  event?: Partial<EventFormData & { id: number }>;
  mode: 'create' | 'edit';
}

export default function EventForm({ event, mode }: EventFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      start_time: '',
      end_time: '',
      cost: 0,
      early_bird_cost: 0,
      format: 'in-person',
      series_id: 1,
      tenant_id: 1,
    },
  });

  useEffect(() => {
    if (event) {
      reset({
        name: event.name ?? '',
        start_time: event.start_time ?? '',
        end_time: event.end_time ?? '',
        cost: event.cost ?? 0,
        early_bird_cost: event.early_bird_cost ?? 0,
        format: event.format ?? 'in-person',
        series_id: event.series_id ?? 1,
        tenant_id: event.tenant_id ?? 1,
      });
    }
  }, [event, reset]);

  const onSubmit = (data: EventFormData) => {
    if (mode === 'create') {
      router.post('/events', data);
    } else if (mode === 'edit' && event?.id) {
      router.put(`/events/${event.id}`, data);
    }
  };

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{mode === 'create' ? 'Create' : 'Edit'} Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Event Name</label>
          <input {...register('name')} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        {/* Time */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Start Time</label>
            <input type="datetime-local" {...register('start_time')} className="w-full border p-2 rounded" />
            {errors.start_time && <p className="text-red-600 text-sm">{errors.start_time.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">End Time</label>
            <input type="datetime-local" {...register('end_time')} className="w-full border p-2 rounded" />
            {errors.end_time && <p className="text-red-600 text-sm">{errors.end_time.message}</p>}
          </div>
        </div>

        {/* Costs */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Cost</label>
            <input type="number" {...register('cost')} className="w-full border p-2 rounded" />
            {errors.cost && <p className="text-red-600 text-sm">{errors.cost.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Early Bird Cost</label>
            <input type="number" {...register('early_bird_cost')} className="w-full border p-2 rounded" />
            {errors.early_bird_cost && <p className="text-red-600 text-sm">{errors.early_bird_cost.message}</p>}
          </div>
        </div>

        {/* Format */}
        <div>
          <label className="block font-semibold mb-1">Format</label>
          <select {...register('format')} className="w-full border p-2 rounded">
            <option value="in-person">In-Person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {errors.format && <p className="text-red-600 text-sm">{errors.format.message}</p>}
        </div>

        {/* Hidden fields */}
        <input type="hidden" {...register('series_id')} />
        <input type="hidden" {...register('tenant_id')} />

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
