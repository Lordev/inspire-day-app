<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsOnboarded
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Check if the user is authenticated and has completed onboarding
        if (!$user || !$user->niche || !$user->tone) {
            return redirect()->route('onboarding')->with('status', 'Please complete your onboarding to continue.');
        }


        return $next($request);
    }
}
