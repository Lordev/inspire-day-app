<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\User;
use App\Models\Prompt;
use App\Enums\Niche;
use App\Enums\Tone;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'niche' => Niche::BUSINESS->value,
            'tone' => Tone::PROFESSIONAL->value
        ]);
    }

    public function test_user_has_fillable_attributes()
    {
        $this->assertEquals('John Doe', $this->user->name);
        $this->assertEquals('john@example.com', $this->user->email);
        $this->assertEquals(Niche::BUSINESS->value, $this->user->niche);
        $this->assertEquals(Tone::PROFESSIONAL->value, $this->user->tone);
    }

    public function test_user_hides_sensitive_attributes()
    {
        $userArray = $this->user->toArray();
        
        $this->assertArrayNotHasKey('password', $userArray);
        $this->assertArrayNotHasKey('remember_token', $userArray);
    }

    public function test_user_casts_attributes_correctly()
    {
        $this->assertInstanceOf(\Carbon\Carbon::class, $this->user->email_verified_at);
        $this->assertInstanceOf(\Carbon\Carbon::class, $this->user->created_at);
        $this->assertInstanceOf(\Carbon\Carbon::class, $this->user->updated_at);
    }

    public function test_user_has_many_prompts_relationship()
    {
        Prompt::factory()->count(3)->create(['user_id' => $this->user->id]);
        
        $this->user->load('prompts');
        $prompts = $this->user->prompts;
        
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $prompts);
        $this->assertEquals(3, $prompts->count());
    }

    public function test_user_can_have_null_niche_and_tone()
    {
        $userWithoutNiche = User::factory()->create([
            'niche' => null,
            'tone' => null
        ]);
        
        $this->assertNull($userWithoutNiche->niche);
        $this->assertNull($userWithoutNiche->tone);
    }

    public function test_user_email_is_unique()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);
        
        User::create([
            'name' => 'Jane Doe',
            'email' => 'john@example.com', // Same email as existing user
            'password' => 'password123'
        ]);
    }
}
