<?php

namespace App\Services;

use App\Models\User;
use App\Models\Prompt;
use Carbon\Carbon;

class StatisticsService
{
    public function getUserStatistics(User $user)
    {
        $avgLength = $user->prompts()
            ->whereNotNull('response')
            ->where('response', '!=', '')
            ->selectRaw('AVG(LENGTH(response)) as avg_length')
            ->first();

        $mostActiveDay = $user->prompts()
            ->get()
            ->groupBy(function ($prompt) {
                return Carbon::parse($prompt->date)->format('l'); // Group by day of the week
            })
            ->map(function ($group) {
                return $group->count();
            })
            ->sortDesc()
            ->keys()
            ->first();

        return [
            'totalReflections' => $user->prompts()->count(),
            'averageReflectionLength' => $avgLength ? (int) round($avgLength->avg_length) : 0,
            'mostActiveDay' => $mostActiveDay,
        ];
    }

    public function getReflectionTrends(User $user)
    {
        $prompts = $user->prompts()
            ->whereNotNull('response')
            ->get();

        $trends = [
            'total_reflections' => $prompts->count(),
            'recent_reflections' => $prompts->where('created_at', '>=', Carbon::now()->subDays(30))->count(),
        ];

        return $trends;
    }

    public function getAnalysisInsights($userId)
    {
        $prompts = Prompt::where('user_id', $userId)
            ->whereNotNull('analysis')
            ->get();

        $insights = $prompts->map(function ($prompt) {
            return [
                'prompt_id' => $prompt->id,
                'analysis' => $prompt->analysis,
            ];
        });

        return $insights->toArray();
    }
}