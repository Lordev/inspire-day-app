<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        \Illuminate\Support\Facades\Http::fake([
            env('AI_SERVICE_URL') . '/generate*' => \Illuminate\Support\Facades\Http::response(['output' => 'Mocked prompt!'], 200),
    ]);
    }

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_access_dashboard_if_onboarded()
    {
        $this->actingAs(
            $user = User::factory()->create([
                'niche' => 'technology', // User has completed onboarding
                'tone' => 'professional',
            ])
        );

        $this->get('/dashboard')->assertOk();
}
}
