<?php

namespace App\Services;

use App\Enums\ReportConfigType;
use App\Models\Environment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StatisticRequestService
{
    protected $env;

    protected array $response = [
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
            $this->response['url'] = $url;
            $this->response['headers'] = $response->headers();
            $this->response['status'] = $response->getStatusCode();
            $this->response['body'] = $response->json();
            if (($this->response['body']['success'] ?? false) && !empty($this->response['body']['data'])) {
                ReportConfigService::setReportConfig($this->request->report, ReportConfigType::METRICS->value, $this->request->instance ?? 'default', $this->response['body']['data']);
            } else {
                ReportConfigService::setReportConfig($this->request->report, ReportConfigType::METRICS->value, $this->request->instance ?? 'default', []);
            }
            return $this->response;
        } catch (\Exception $e) {
            $this->response['body'] = json_encode($e->getMessage());
            return $this->response;
        }
    }

    public function requestSlices()
    {
        $url = $this->env->domain . 'api/statistics/ssp2/dictionary/slice?limit=25&page=1&type=' . $this->request->report;

        try {
            $response = Http::withHeaders($this->generateHeaders())->get($url);
            $this->response['success'] = $response->getStatusCode() == 200;
            $this->response['url'] = $url;
            $this->response['headers'] = $response->headers();
            $this->response['status'] = $response->getStatusCode();
            $this->response['body'] = $response->json();
            if (($this->response['body']['success'] ?? false) && !empty($this->response['body']['data'])) {
                ReportConfigService::setReportConfig($this->request->report, ReportConfigType::SLICES->value, $this->request->instance ?? 'default', $this->response['body']['data']);
            } else {
                ReportConfigService::setReportConfig($this->request->report, ReportConfigType::SLICES->value, $this->request->instance ?? 'default', []);
            }
            return $this->response;
        } catch (\Exception $e) {
            $this->response['body'] = json_encode($e->getMessage());
            return $this->response;
        }
    }

    public function requestFilter()
    {
        $url = $this->env->domain . 'api/statistics/ssp2/dictionary/' . $this->request->slice;
        $query = [
            'report'    => join(',', $this->request->slices),
            'limit'     => 25,
            'page'      => 1,
            'type'      => $this->request->report,
        ];
        foreach (($this->request->filters ?? []) as $filterKey => $filterValue) {
            if (!empty($filterValue) && $filterKey != $this->request->slice) {
                if (is_array($filterValue)) {
                    $query[$filterKey] = array_keys($filterValue);
                } else {
                    $query[$filterKey] = $filterValue;
                }
            }
        }
        if (!is_null($this->request->q)) {
            $query['search'] = $this->request->q;
        }
        $url .= '?' . http_build_query($query);
        //
        try {
            $response = Http::withHeaders($this->generateHeaders())->get($url);
            $this->response['success'] = $response->getStatusCode() == 200;
            $this->response['url'] = $url;
            $this->response['headers'] = $response->headers();
            $this->response['status'] = $response->getStatusCode();
            $this->response['body'] = $response->json();
            return $this->response;
        } catch (\Exception $e) {
            $this->response['body'] = json_encode($e->getMessage());
//            dd($this->response);
            return $this->response;
        }
    }


    public function requestReport()
    {
        //TODO FORMAT
        //TODO PAGE
        //TODO PERPAGE
        //TODO SORT
        $url = $this->env->domain . 'api/statistics/ssp2';
        $query = [
            'fields'      => implode(',', array_merge($this->request->slices, $this->request->metrics)),
            'report'    => join(',', $this->request->slices),
            'limit'     => 25,
            'page'      => 1,
            'type'      => $this->request->report,
            'only_commercial_client' => 0, //TODO REMOVE
        ];
        foreach (($this->request->filters ?? []) as $filterKey => $filterValue) {
            if (!empty($filterValue)) {
                $query[$filterKey] = (is_array($filterValue) ? implode(',', array_keys($filterValue)) : $filterValue);
            }
        }
        $url .= '?' . http_build_query($query);
        try {
            $response = Http::withHeaders($this->generateHeaders())->get($url);
            $this->response['success'] = $response->getStatusCode() == 200;
            $this->response['url'] = $url;
            $this->response['headers'] = $response->headers();
            $this->response['status'] = $response->getStatusCode();
            $this->response['body'] = $response->json();
            return $this->response;
        } catch (\Exception $e) {
            $this->response['body'] = json_encode($e->getMessage());
            dd($this->response);
            return $this->response;
        }
    }



}
