<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Services\PromptService;
use Illuminate\Support\Facades\Http;
use App\Enums\Niche;
use App\Enums\Tone;

class PromptServiceTest extends TestCase
{
    public function test_generate_prompt_for_user()
    {
        Http::fake([
            'http://test-ai-service/generate' => Http::response(null, 200),
        ]);

        $user = User::factory()->make([
            'niche' => Niche::BUSINESS->value, 
            'tone' => Tone::CASUAL->value
        ]);
        
        $service = app(PromptService::class);

        $prompt = $service->generatePromptForUser($user);

        $businessPrompts = [
            'What value did you create in your work today?',
            'How did you advance your career goals today?',
            'What business insight did you gain today?',
        ];
        $this->assertContains($prompt, $businessPrompts);
    }

}