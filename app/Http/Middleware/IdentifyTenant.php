<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IdentifyTenant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost(); // e.g. arts.uoft.test
        $subdomain = explode('.', $host)[0];

        $tenant = Tenant::where('subdomain', $subdomain)->first();

        if ($tenant) {
            $tenant->makeCurrent();
        }

        return $next($request);
    }
}
