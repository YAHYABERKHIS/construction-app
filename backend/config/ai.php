<?php

return [
    'api_key' => env('OPENAI_API_KEY'),
    'model' => env('OPENAI_MODEL', 'gpt-4o-mini'),
    'max_tokens' => (int) env('OPENAI_MAX_TOKENS', 350),
    'temperature' => (float) env('OPENAI_TEMPERATURE', 0.7),
    'timeout' => (int) env('OPENAI_TIMEOUT', 25),

    'company' => [
        'name' => env('AI_COMPANY_NAME', 'GHANI SAKAN'),
        'phone' => env('AI_COMPANY_PHONE', '0665757519'),
        'email' => env('AI_COMPANY_EMAIL', 'contact@ghanisakan.ma'),
        'country' => 'Maroc',
    ],
];
