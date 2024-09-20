<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Statistic\MetricsRequest;
use App\Services\StatisticRequestService;

class StatisticController extends Controller
{
    public function metrics(MetricsRequest $request, StatisticRequestService $service)
    {
        return response()->json($service->requestMetrics());
//
//        dump($request->all());
    }
}
