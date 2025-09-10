<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Prompt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PromptTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
    }

    public function test_prompt_has_fillable_attributes()
    {
        $prompt = Prompt::create([
            'user_id' => $this->user->id,
            'prompt' => 'What did you learn today?',
            'response' => 'I learned about testing',
            'date' => '2024-01-01',
            'status' => 'answered',
            'analysis' => 'Good reflection on learning'
        ]);

        $this->assertEquals($this->user->id, $prompt->user_id);
        $this->assertEquals('What did you learn today?', $prompt->prompt);
        $this->assertEquals('I learned about testing', $prompt->response);
        $this->assertEquals('2024-01-01', $prompt->date);
        $this->assertEquals('answered', $prompt->status);
        $this->assertEquals('Good reflection on learning', $prompt->analysis);
    }

    public function test_prompt_belongs_to_user_relationship()
    {
        $prompt = Prompt::factory()->create(['user_id' => $this->user->id]);
        
        $this->assertInstanceOf(User::class, $prompt->user);
        $this->assertEquals($this->user->id, $prompt->user->id);
    }

    public function test_is_answered_returns_true_when_response_exists()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'response' => 'This is my reflection response'
        ]);
        
        $this->assertTrue($prompt->isAnswered());
    }

    public function test_is_answered_returns_false_when_response_is_null()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'response' => null
        ]);
        
        $this->assertFalse($prompt->isAnswered());
    }

    public function test_is_answered_returns_false_when_response_is_empty_string()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'response' => ''
        ]);
        
        $this->assertFalse($prompt->isAnswered());
    }

    public function test_is_answered_returns_false_when_response_is_whitespace_only()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'response' => '   '
        ]);
        
        $this->assertFalse($prompt->isAnswered());
    }

    public function test_prompt_can_have_null_analysis()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'analysis' => null
        ]);
        
        $this->assertNull($prompt->analysis);
    }

    public function test_prompt_status_defaults_and_can_be_updated()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'status' => null
        ]);
        
        $this->assertEquals('unanswered', $prompt->status);
        
        $prompt->update(['status' => 'completed']);
        $this->assertEquals('completed', $prompt->status);
    }

    public function test_prompt_date_format()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'date' => '2024-01-15'
        ]);
        
        $this->assertEquals('2024-01-15', $prompt->date);
    }
}
