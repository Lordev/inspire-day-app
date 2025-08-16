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

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $this->actingAs($user = User::factory()->create());
        $this->get('/dashboard')->assertOk();
    }
}
