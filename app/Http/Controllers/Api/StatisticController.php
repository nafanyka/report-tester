<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Statistic\FilterRequest;
use App\Http\Requests\Api\Statistic\MetricsRequest;
use App\Http\Requests\Api\Statistic\ReportRequest;
use App\Http\Requests\Api\Statistic\SlicesRequest;
use App\Services\StatisticRequestService;

class StatisticController extends Controller
{
    public function metrics(MetricsRequest $request, StatisticRequestService $service)
    {
        return response()->json($service->requestMetrics());
    }

    public function slices(SlicesRequest $request, StatisticRequestService $service)
    {
        return response()->json($service->requestSlices());
    }

    public function filter(FilterRequest $request, StatisticRequestService $service)
    {
        return response()->json($service->requestFilter());
    }

    public function report(ReportRequest $request, StatisticRequestService $service)
    {
        return response()->json($service->requestReport());
    }
}
