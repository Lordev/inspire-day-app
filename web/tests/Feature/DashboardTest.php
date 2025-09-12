<?php

namespace Tests\Feature;

use App\Models\User;
use App\Enums\Niche;
use App\Enums\Tone;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        \Illuminate\Support\Facades\Http::fake();
    }

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_access_dashboard_if_onboarded()
    {
        $this->actingAs(
            $user = User::factory()->create([
                'niche' => Niche::BUSINESS->value, // User has completed onboarding
                'tone' => Tone::PROFESSIONAL->value,
            ])
        );

        $this->get('/dashboard')->assertOk();
    }
}
