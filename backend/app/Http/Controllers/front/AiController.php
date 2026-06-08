<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Services\AiAssistantService;
use Illuminate\Http\Request;

class AiController extends Controller
{
    public function __construct(private AiAssistantService $ai) {}

    public function chat(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'history' => 'nullable|array|max:10',
            'history.*.role' => 'required_with:history|in:user,assistant',
            'history.*.content' => 'required_with:history|string|max:2000',
            'locale' => 'nullable|string|in:fr,en,ar',
        ]);

        $locale = $validated['locale'] ?? 'fr';
        $history = $validated['history'] ?? [];

        $result = $this->ai->chat($validated['message'], $history, $locale);

        return response()->json([
            'reply' => $result['reply'],
            'mode' => $result['mode'] ?? 'ai',
        ]);
    }

    public function generateQuote(Request $request)
    {
        $validated = $request->validate([
            'surface' => 'required|numeric|min:10|max:100000',
            'type' => 'required|string|max:100',
            'materials' => 'required|string|max:100',
            'location' => 'nullable|string|max:100',
            'locale' => 'nullable|string|in:fr,en,ar',
        ]);

        $locale = $validated['locale'] ?? 'fr';
        $result = $this->ai->generateQuote($validated, $locale);

        return response()->json([
            'quote' => $result['quote'],
            'mode' => $result['mode'] ?? 'ai',
        ]);
    }
}
