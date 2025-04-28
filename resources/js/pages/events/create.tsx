import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

// Event Form Fields
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

// Validation Errors Type
interface ValidationErrors {
  [key: string]: string[];
}

export default function CreateEvent() {
  const [form, setForm] = useState<EventFormData>({
    name: '',
    start_time: '',
    end_time: '',
    cost: 0,
    early_bird_cost: 0,
    format: 'in-person',
    series_id: 1,
    tenant_id: 1,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await api.post('/events', form);
      toast.success('Event created successfully!');
      navigate('/events');
    } catch (error) {
      const axiosError = error as AxiosError<{ errors: ValidationErrors }>;
      if (axiosError.response?.status === 422) {
        setErrors(axiosError.response.data.errors);
        toast.error('Validation errors occurred.');
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Event</h1>

      {loading && <div className="text-center text-blue-600 mb-4">Loading...</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Event Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
        </div>

        {/* Start and End Time */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            {errors.start_time && <p className="text-red-600 text-sm">{errors.start_time[0]}</p>}
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            {errors.end_time && <p className="text-red-600 text-sm">{errors.end_time[0]}</p>}
          </div>
        </div>

        {/* Cost Fields */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Cost</label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Early Bird Cost</label>
            <input
              type="number"
              name="early_bird_cost"
              value={form.early_bird_cost}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg disabled:bg-green-300"
        >
          Save
        </button>
      </form>
    </section>
  );
}
