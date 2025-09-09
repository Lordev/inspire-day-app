<?php

namespace App\Services;

use App\Models\Prompt;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Repositories\PromptRepository;
use App\Enums\Niche;
use App\Enums\Tone;

class PromptService
{
    private $promptRepository;

    public function __construct(PromptRepository $promptRepository)
    {
        $this->promptRepository = $promptRepository;
    }
    
    public function generatePromptForUser(User $user): string
    {
        $niche = $user->niche ?: Niche::PERSONAL_GROWTH->value;
        $tone = $user->tone ?: Tone::REFLECTIVE->value;
        
        try {
            $response = Http::timeout(30)->post(env('AI_SERVICE_URL') . '/generate', [
                'niche' => $niche,
                'tone' => $tone,
            ]);

            // Log the response for debugging
            Log::info('AI Service Response', [
                'status' => $response->status(),
                'body' => $response->body(),
                'url' => env('AI_SERVICE_URL') . '/generate'
            ]);

            if (!$response->successful()) {
                Log::error('AI Service failed', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return $this->getFallbackPrompt($niche);
            }

            $prompt = $response->json('output');
            
            if (empty($prompt)) {
                Log::warning('AI Service returned empty prompt', [
                    'response' => $response->json()
                ]);
                return $this->getFallbackPrompt($niche);
            }

            return $prompt;

        } catch (\Exception $e) {
            Log::error('AI Service connection failed', [
                'error' => $e->getMessage(),
                'url' => env('AI_SERVICE_URL') . '/generate'
            ]);
            
            return $this->getFallbackPrompt($niche);
        }
    }

    private function getFallbackPrompt(string $niche): string
    {
        $templates = [
            Niche::PERSONAL_GROWTH->value => [
                'What small step toward growth did you take today?',
                'How did you challenge yourself today?',
                'What did you learn about yourself today?',
            ],
            Niche::BUSINESS->value => [
                'What value did you create in your work today?',
                'How did you advance your career goals today?',
                'What business insight did you gain today?',
            ],
            Niche::CREATIVITY->value => [
                'What inspired your creativity today?',
                'How did you express yourself creatively today?',
                'What new idea sparked your interest today?',
            ],
            Niche::WELLNESS->value => [
                'What did you do today to nurture your well-being?',
                'How did you practice self-care today?',
                'What healthy choice did you make today?',
            ],
        ];
        
        $prompts = $templates[$niche] ?? $templates[Niche::PERSONAL_GROWTH->value];
        return $prompts[array_rand($prompts)];
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

    public function analyzeResponse(string $prompt, string $response): string
    {
        try {
            $aiResponse = Http::timeout(30)->post(env('AI_SERVICE_URL') . '/analyze', [
                'prompt' => $prompt,
                'response' => $response,
            ]);

            Log::info('AI Analysis Response', [
                'status' => $aiResponse->status(),
                'body' => $aiResponse->body(),
                'url' => env('AI_SERVICE_URL') . '/analyze'
            ]);

            if (!$aiResponse->successful()) {
                Log::error('AI Analysis failed', [
                    'status' => $aiResponse->status(),
                    'body' => $aiResponse->body()
                ]);
                throw new \Exception('Failed to analyze response');
            }

            $analysis = $aiResponse->json('output');
            
            if (empty($analysis)) {
                Log::warning('AI Service returned empty analysis', [
                    'response' => $aiResponse->json()
                ]);
                throw new \Exception('No analysis received from AI service');
            }

            return $analysis;

        } catch (\Exception $e) {
            Log::error('AI Analysis connection failed', [
                'error' => $e->getMessage(),
                'url' => env('AI_SERVICE_URL') . '/analyze'
            ]);
            
            throw $e;
        }
    }
}
