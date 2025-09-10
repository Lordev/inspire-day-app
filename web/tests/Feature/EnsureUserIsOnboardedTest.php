<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Enums\Niche;
use App\Enums\Tone;

class EnsureUserIsOnboardedTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        \Illuminate\Support\Facades\Http::fake();
    }

    /** @test */
    public function it_allows_access_for_onboarded_users()
    {
        $user = User::factory()->create([
            'niche' => Niche::PERSONAL_GROWTH,
            'tone' => Tone::PROFESSIONAL,
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
    }

    /** @test */
    public function it_redirects_non_onboarded_users_to_onboarding()
    {
        $user = User::factory()->create([
            'niche' => null,
            'tone' => null,
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertRedirect(route('onboarding'));
        $response->assertSessionHas('status', 'Please complete your onboarding to continue.');
    }

    /** @test */
    public function it_redirects_unauthenticated_users_to_login()
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect(route('login'));
    }
}