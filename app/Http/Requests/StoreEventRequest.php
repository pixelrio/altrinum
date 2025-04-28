<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'series_id' => 'required|exists:series,id',
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'long_description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'streetaddress1' => 'nullable|string|max:255',
            'streetaddress2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal' => 'nullable|string|max:20',
            'format' => 'required|in:online,in-person,hybrid',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
            'capacity' => 'nullable|integer|min:0',
            'has_guests' => 'boolean',
            'guest_limit' => 'integer|min:0',
            'is_sold_out' => 'boolean',
            'is_active' => 'boolean',
            'is_private' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'waitlist_type' => 'required|in:none,manual,automatic',
            'waitlist_enabled' => 'boolean',
            'registration_cutoff' => 'nullable|date|after_or_equal:today',
            'discount_code_enabled' => 'boolean',
            'cost' => 'required|numeric|min:0',
            'early_bird_cost' => 'required|numeric|min:0',
            'early_bird_end' => 'nullable|date|after_or_equal:today',
            'custom_link' => 'nullable|url',
            'cost_centre' => 'nullable|string|max:255',
            'accounting_code' => 'nullable|string|max:255',
            'promo_page_enabled' => 'boolean',
            'is_archived' => 'boolean',
            'event_code' => 'nullable|string|unique:events,event_code',
        ];
    }
}
