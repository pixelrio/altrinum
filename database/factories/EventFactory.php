<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Series;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('+1 days', '+1 month');
        $end = (clone $start)->modify('+2 hours');

        return [

            'tenant_id' => 1, // If you don't have Tenant yet, use 1
            'name' => $this->faker->sentence(3),
            'short_description' => $this->faker->paragraph(2),
            'long_description' => $this->faker->paragraph(6),
            'image' => $this->faker->imageUrl(800, 600, 'business', true, 'Event'),
            'streetaddress1' => $this->faker->streetAddress(),
            'streetaddress2' => $this->faker->secondaryAddress(),
            'city' => $this->faker->city(),
            'province' => $this->faker->state(),
            'country' => $this->faker->country(),
            'postal' => $this->faker->postcode(),
            'format' => $this->faker->randomElement(['online', 'in-person', 'hybrid']),
            'start_time' => $start,
            'end_time' => $end,
            'capacity' => $this->faker->numberBetween(50, 500),
            'has_guests' => $this->faker->boolean(),
            'guest_limit' => $this->faker->numberBetween(0, 5),
            'is_sold_out' => false,
            'is_active' => true,
            'is_private' => $this->faker->boolean(20), // 20% private
            //'category_id' => null, // optional, or add Category::factory() if you want
            'waitlist_type' => $this->faker->randomElement(['none', 'manual', 'automatic']),
            'cost' => $this->faker->numberBetween(10, 200),
            'early_bird_cost' => $this->faker->numberBetween(5, 100),
            'early_bird_end' => $this->faker->dateTimeBetween('now', '+2 weeks'),
            'custom_link' => $this->faker->url(),
            'cost_centre' => $this->faker->randomElement(['A123', 'B456', 'C789']),
            'accounting_code' => $this->faker->randomElement(['X01', 'Y02', 'Z03']),
            'promo_page_enabled' => true,
            'is_archived' => false,
            'event_code' => strtoupper($this->faker->lexify('EVENT????')),
        ];
    }
}
