<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Models\User;
use App\Models\Prompt;
use App\Repositories\PromptRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Carbon\Carbon;

class PromptRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private PromptRepository $promptRepository;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->promptRepository = new PromptRepository();
        $this->user = User::factory()->create();
    }

    public function test_get_todays_prompt_returns_correct_prompt()
    {
        // Create today's prompt
        $todayPrompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'date' => Carbon::today()->toDateString()
        ]);

        // Create yesterday's prompt
        Prompt::factory()->create([
            'user_id' => $this->user->id,
            'date' => Carbon::yesterday()->toDateString()
        ]);

        $result = $this->promptRepository->getTodaysPrompt($this->user);

        $this->assertInstanceOf(Prompt::class, $result);
        $this->assertEquals($todayPrompt->id, $result->id);
        $this->assertEquals(Carbon::today()->toDateString(), $result->date);
    }

    public function test_get_todays_prompt_returns_null_when_no_prompt_today()
    {
        // Create yesterday's prompt only
        Prompt::factory()->create([
            'user_id' => $this->user->id,
            'date' => Carbon::yesterday()->toDateString()
        ]);

        $result = $this->promptRepository->getTodaysPrompt($this->user);

        $this->assertNull($result);
    }

    public function test_get_todays_prompt_returns_null_for_user_with_no_prompts()
    {
        $result = $this->promptRepository->getTodaysPrompt($this->user);

        $this->assertNull($result);
    }

    public function test_save_prompt_creates_new_prompt_with_correct_attributes()
    {
        $promptText = 'What challenges did you overcome today?';

        $prompt = $this->promptRepository->savePrompt($this->user, $promptText);

        $this->assertInstanceOf(Prompt::class, $prompt);
        $this->assertEquals($this->user->id, $prompt->user_id);
        $this->assertEquals($promptText, $prompt->prompt);
        $this->assertEquals(Carbon::today()->toDateString(), $prompt->date);
        $this->assertEquals('unanswered', $prompt->status);
        $this->assertNull($prompt->response);
    }

    public function test_save_prompt_persists_to_database()
    {
        $promptText = 'What are you grateful for today?';

        $savedPrompt = $this->promptRepository->savePrompt($this->user, $promptText);

        $this->assertDatabaseHas('prompts', [
            'id' => $savedPrompt->id,
            'user_id' => $this->user->id,
            'prompt' => $promptText,
            'date' => Carbon::today()->toDateString(),
            'status' => 'unanswered'
        ]);
    }

    public function test_get_history_returns_correct_number_of_prompts()
    {
        // Create 5 prompts for the user
        Prompt::factory()->count(5)->create(['user_id' => $this->user->id]);

        // Create prompts for another user (should not be included)
        $otherUser = User::factory()->create();
        Prompt::factory()->count(3)->create(['user_id' => $otherUser->id]);

        $history = $this->promptRepository->getHistory($this->user, 10);

        $this->assertCount(5, $history);
        $this->assertEquals($this->user->id, $history->first()->user_id);
    }

    public function test_get_history_respects_limit_parameter()
    {
        // Create 8 prompts
        Prompt::factory()->count(8)->create(['user_id' => $this->user->id]);

        $history = $this->promptRepository->getHistory($this->user, 3);

        $this->assertCount(3, $history);
    }

    public function test_get_history_returns_empty_collection_for_user_with_no_prompts()
    {
        $history = $this->promptRepository->getHistory($this->user, 10);

        $this->assertEmpty($history);
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $history);
    }

    public function test_get_history_orders_by_date_descending()
    {
        $oldPrompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'date' => '2024-01-01'
        ]);

        $newPrompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'date' => '2024-01-15'
        ]);

        $history = $this->promptRepository->getHistory($this->user, 10);

        $this->assertCount(2, $history);
        $this->assertEquals($newPrompt->id, $history->first()->id); // Newest first
        $this->assertEquals($oldPrompt->id, $history->last()->id);  // Oldest last
    }

    public function test_save_response_updates_prompt_correctly()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'unanswered',
            'response' => null
        ]);

        $responseText = 'Today I learned about unit testing and it was very helpful.';

        $updatedPrompt = $this->promptRepository->saveResponse($prompt, $responseText);

        $this->assertEquals($responseText, $updatedPrompt->response);
        $this->assertEquals('answered', $updatedPrompt->status);
        $this->assertEquals($prompt->id, $updatedPrompt->id);
    }

    public function test_save_response_persists_changes_to_database()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'unanswered',
            'response' => null
        ]);

        $responseText = 'I practiced mindfulness and felt more present.';

        $this->promptRepository->saveResponse($prompt, $responseText);

        $this->assertDatabaseHas('prompts', [
            'id' => $prompt->id,
            'response' => $responseText,
            'status' => 'answered'
        ]);
    }

    public function test_save_response_returns_updated_prompt_instance()
    {
        $prompt = Prompt::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'unanswered'
        ]);

        $responseText = 'I completed a challenging project successfully.';

        $result = $this->promptRepository->saveResponse($prompt, $responseText);

        $this->assertInstanceOf(Prompt::class, $result);
        $this->assertEquals($prompt->id, $result->id);
        $this->assertEquals($responseText, $result->response);
        $this->assertEquals('answered', $result->status);
    }
}
