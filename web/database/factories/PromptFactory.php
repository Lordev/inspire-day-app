<?php

namespace Database\Factories;

use App\Models\Prompt;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prompt>
 */
class PromptFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Prompt::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'prompt' => $this->faker->sentence(),
            'response' => $this->faker->optional(0.7)->paragraph(),
            'date' => $this->faker->date(),
            'analysis' => $this->faker->optional(0.5)->paragraph(),
            'status' => $this->faker->randomElement(['unanswered', 'completed', 'skipped']),
        ];
    }

    /**
     * Indicate that the prompt has a response.
     */
    public function answered(): static
    {
        return $this->state(fn (array $attributes) => [
            'response' => $this->faker->paragraph(),
        ]);
    }

    /**
     * Indicate that the prompt has no response.
     */
    public function unanswered(): static
    {
        return $this->state(fn (array $attributes) => [
            'response' => null,
        ]);
    }

    /**
     * Indicate that the prompt has analysis.
     */
    public function withAnalysis(): static
    {
        return $this->state(fn (array $attributes) => [
            'analysis' => $this->faker->paragraph(),
        ]);
    }

    /**
     * Indicate that the prompt is for today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'date' => now()->toDateString(),
        ]);
    }
}
