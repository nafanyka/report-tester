<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceJsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
//        $request->headers->set('Accept', 'application/json');
        $response = $next($request);


        if ($response->isSuccessful()) {
            $data['success'] = true;
            $data['code'] = $response->getStatusCode();
            $body = json_decode($response->getContent(), true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $data['data'] = $body;
            }
            $response->setContent(json_encode($data));
        }

        return $response;
    }
}
