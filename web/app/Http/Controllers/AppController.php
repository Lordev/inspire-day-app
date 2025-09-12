<?php

namespace App\Http\Controllers;

use App\Enums\Niche;
use App\Enums\Tone;
use Illuminate\Http\Request;
use App\Services\PromptService;
use App\Models\Prompt;
use App\Models\User;
use App\Services\StatisticsService;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;



class AppController extends Controller
{
    private $promptService;

    public function __construct(PromptService $promptService)
    {
        $this->promptService = $promptService;
    }

    public function dashboard()
    {
        $user = Auth::user();
        $prompt = $this->promptService->getTodaysPrompt($user);

        if (!$prompt) {
            $promptText = $this->promptService->generatePromptForUser($user);
            $prompt = $this->promptService->savePrompt($user, $promptText);
        }

        $history = $this->promptService->getPromptHistory($user);

        return Inertia::render('dashboard', [
            'prompt' => $prompt,
            'history' => $history,
        ]);
    }

    public function onboarding()
    {
        return Inertia::render('onboarding', [
            'options' => [
                'niches' => Niche::options(),
                'tones' => Tone::options(),
            ],
        ]);
    }
    
    public function storePreferences(Request $request)
    {

        $validated = $request->validate([
            'niche' => 'required|in:'.implode(',', array_keys(Niche::options())),
            'tone' => 'required|in:'.implode(',', array_keys(Tone::options())),
        ]);

        $user = Auth::user();
        
        $user->update([
            'niche' => $validated['niche'],
            'tone' => $validated['tone'],
        ]);

        Auth::setUser($user->fresh());
        
        // Check if this is coming from settings page
        if (request()->is('settings/*')) {
            return redirect()->back()->with('status', 'Preferences updated!');
        }
        
        return redirect()->route('dashboard')->with('status', 'Preferences updated!');
    }
    
    public function saveResponse(Request $request, Prompt $prompt)
    {
        $validated = $request->validate([
            'response' => 'required|string',
        ]);
        
        $this->promptService->saveResponse($prompt, $validated['response']);

        if ($prompt->analysis) {
            $prompt->update(['analysis' => null]);
        }
        
        return redirect()->route('dashboard')->with('status', 'Response saved!');
    }
    
    public function analyze(Request $request, Prompt $prompt)
    {
        $validated = $request->validate([
            'response' => 'required|string',
        ]);

        try {
            $analysis = $this->promptService->analyzeResponse(
                $prompt->prompt,
                $validated['response']
            );

            $prompt->update(['analysis' => $analysis]);
            
            // Return the updated prompt data
            return response()->json([
                'success' => true,
                'analysis' => $analysis,
                'prompt' => $prompt->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to analyze response. Please try again.'
            ], 500);
        }
    }

    public function getStatistics(Request $request, StatisticsService $statisticsService)
    {
        $user = $request->user();
        
        $stats = $statisticsService->getUserStatistics($user);
        $trends = $statisticsService->getReflectionTrends($user);
        $insights = $statisticsService->getAnalysisInsights($user->id);

        return Inertia::render('statistics', [
            'statistics' => $stats,
            'trends' => $trends,
            'insights' => $insights,
        ]);
    }
}
