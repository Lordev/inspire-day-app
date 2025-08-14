<?php

namespace App\Services;

use App\Models\Prompt;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use App\Repositories\PromptRepository;

class PromptService
{
    private $promptRepository;

    public function __construct(PromptRepository $promptRepository)
    {
        $this->promptRepository = $promptRepository;
    }
    
    public function generatePromptForUser(User $user): string
    {
        // Dummy prompt for now; replace with OpenAI call later
        $niche = $user->niche ?: 'personal growth';
        $tone = $user->tone ?: 'reflective';
        
        $prompt = Http::post(env('AI_SERVICE_URL') . '/generate', [
            'niche' => $niche,
            'tone' => $tone,
        ])->throw()->json('prompt');

        return $prompt;
    }

    public function getTodaysPrompt(User $user): ?Prompt
    {
        return $this->promptRepository->getTodaysPrompt($user);
    }

    public function savePrompt(User $user, string $promptText): Prompt
    {
        return $this->promptRepository->savePrompt($user, $promptText);
    }
    
    public function getPromptHistory(User $user, int $limit = 10)
    {
        return $this->promptRepository->getHistory($user, $limit);
    }
    
    public function saveResponse(Prompt $prompt, string $response): Prompt
    {
        return $this->promptRepository->saveResponse($prompt, $response);
    }
}
