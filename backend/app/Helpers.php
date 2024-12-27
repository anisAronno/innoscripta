<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

if (! function_exists('authUser')) {
    function authUser(): ?User
    {
        return Auth::user();
    }
}

if (! function_exists('authCheck')) {
    function authCheck(): bool
    {
        return Auth::check();
    }
}
