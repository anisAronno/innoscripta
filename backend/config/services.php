<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'newsapi' => [
        'key' => env('NEWSAPI_KEY'),
        'url' => env('NEWSAPI_URL', 'https://newsapi.org'),
    ],

    'guardian' => [
        'key' => env('GUARDIAN_KEY'),
        'url' => env('GUARDIAN_URL', 'https://content.guardianapis.com'),
    ],

    'reuters' => [
        'key' => env('REUTERS_KEY'),
        'url' => env('REUTERS_URL', 'https://api.reuters.com'),
    ],

    'bbc' => [
        'key' => env('BBC_KEY'),
        'url' => env('BBC_URL', 'https://api.bbc.co.uk/news'),
    ],

];
