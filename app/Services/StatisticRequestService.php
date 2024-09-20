<?php

namespace App\Services;

use App\Models\Environment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StatisticRequestService
{
    protected $env;

    protected $response = [
        'success' => false,
        'status' => 0,
        'headers' => [],
        'body' => [],
        'file' => null,
    ];

    public function __construct(protected Request $request)
    {
        $this->env = Environment::find($this->request->get('env'));
    }

    protected function generateHeaders()
    {
        return [
            'Accept'                        => 'application/json',
            'Cookie'                        => 'debug=1; X-Authentication-Session-Id=' . $this->request->authToken,
            'referer'                       => $this->env->domain,
            'sec-fetch-dest'                => 'empty',
            'sec-fetch-mode'                => 'cors',
            'sec-fetch-site'                => 'same-origin',
            'x-authentication-emulate-mode' => 'true',
            'x-authentication-session-id'   => $this->request->authToken,
            'x-environment'                 => $this->env->env->value,
        ];
    }

    public function requestMetrics()
    {
        $url = $this->env->domain . 'api/statistics/' . $this->request->report . '/metrics';

        try {
            $response = Http::withHeaders($this->generateHeaders())->get($url);
            $this->response['success'] = $response->getStatusCode() == 200;
            $this->response['headers'] = $response->headers();
            $this->response['status'] = $response->getStatusCode();
            $this->response['body'] = $response->json();
            return $this->response;
        } catch (\Exception $e) {
            $this->response['body'] = json_encode($e->getMessage());
            return $this->response;
        }
    }

}
