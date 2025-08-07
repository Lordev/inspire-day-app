<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PromptService;
use App\Models\Prompt;
use App\Models\User;
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
    
    public function storePreferences(Request $request)
    {
        $validated = $request->validate([
            'niche' => 'required|string|max:255',
            'tone' => 'required|string|max:255',
        ]);
        
        $user = Auth::user();
        User::where('id', $user->id)->update([
            'niche' => $validated['niche'],
            'tone' => $validated['tone'],
        ]);
        
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
        ]);
    }
}
