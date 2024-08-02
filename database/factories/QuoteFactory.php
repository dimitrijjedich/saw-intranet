<?php

namespace Database\Factories;

use App\Models\quote;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<quote>
 */
class QuoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quote' => $this->faker->text,
        ];
    }
}
