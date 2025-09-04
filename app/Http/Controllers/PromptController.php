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


class PromptController extends Controller
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
        
        return redirect()->route('dashboard')->with('status', 'Preferences updated!');
    }
    
    public function saveResponse(Request $request, Prompt $prompt)
    {
        $validated = $request->validate([
            'response' => 'required|string',
        ]);
        
        $this->promptService->saveResponse($prompt, $validated['response']);
        
        return redirect()->route('dashboard')->with('status', 'Response saved!');
    }
    
    public function preferences()
    {
        return Inertia::render('preferences', [
            'user' => Auth::user(),
            'options' => [
                'niches' => Niche::cases(),
                'tones' => Tone::cases(),
            ],
        ]);
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

        } catch (\Exception $e) {
            return back()->withErrors(['analysis' => 'Failed to analyze response. Please try again.']);
        }
    }

}
