<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ReportConfig\StoreReportConfigRequest;
use App\Models\ReportConfig;
use App\Services\ReportConfigService;
use Illuminate\Http\Request;

class ReportConfigController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $report, string $instance, string $type)
    {
        return response()->json(ReportConfigService::getReportConfig($report, $type, $instance));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportConfigRequest $request, string $report, string $instance, string $type)
    {
        ReportConfigService::setReportConfig($report, $type, $instance, $request->value);
        return response()->json(true);
    }
}
