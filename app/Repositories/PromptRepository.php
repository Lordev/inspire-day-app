<?php

namespace App\Repositories;

use App\Models\Prompt;
use App\Models\User;
use Illuminate\Support\Carbon;

class PromptRepository
{
    public function getTodaysPrompt(User $user): ?Prompt
    {
        return $user->prompts()
            ->whereDate('date', Carbon::today())
            ->first();
    }

    public function savePrompt(User $user, string $promptText): Prompt
    {
        return Prompt::create([
            'user_id' => $user->id,
            'prompt' => $promptText,
            'date' => Carbon::today()->toDateString(),
            'status' => 'unanswered',
        ]);
    }
    
    public function getHistory(User $user, int $limit = 10)
    {
        return $user->prompts()
            ->orderBy('date', 'desc')
            ->limit($limit)
            ->get();
    }
    
    public function saveResponse(Prompt $prompt, string $response): Prompt
    {
        $prompt->update([
            'response' => $response,
            'status' => 'answered'
        ]);
        
        return $prompt;
    }
}
