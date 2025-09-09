<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Services\PromptService;
use Illuminate\Support\Facades\Http;

class PromptServiceTest extends TestCase
{
    public function test_generate_prompt_for_user()
    {
        Http::fake([
            env('AI_SERVICE_URL') . '/generate' => Http::response(['output' => 'Mocked prompt!'], 200),
        ]);

        $user = User::factory()->make(['niche' => 'productivity', 'tone' => 'strict']);
        $service = app(PromptService::class);

        $prompt = $service->generatePromptForUser($user);

        $this->assertEquals('Mocked prompt!', $prompt);
    }
}