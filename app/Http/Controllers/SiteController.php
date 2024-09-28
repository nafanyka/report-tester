<?php

namespace App\Http\Controllers;

use App\Enums\ReportConfigType;
use \AppModels\CurrentState;
use App\Models\Environment;
use App\Services\CurrentStateService;
use App\Services\ReportConfigService;

class SiteController extends Controller
{
    public function index()
    {
        $currentEnv = CurrentStateService::getCurrentState('currentEnv');
        $authToken = CurrentStateService::getCurrentState('authToken');
        $currentReportFormat = CurrentStateService::getCurrentState('currentReportFormat');
        $currentReport = CurrentStateService::getCurrentState('currentReport');
        $reports = CurrentStateService::getCurrentState('reports');
        $envs = Environment::all()->keyBy('name')->toArray();
        //
        $metrics = ReportConfigService::getReportConfig($currentReport, ReportConfigType::METRICS->value,'default');
        $slices = ReportConfigService::getReportConfig($currentReport, ReportConfigType::SLICES->value,'default');
        //
        $selectedMetrics = ReportConfigService::getReportConfig($currentReport, ReportConfigType::SELECTED_METRICS->value,'default');
        $selectedSlices = ReportConfigService::getReportConfig($currentReport, ReportConfigType::SELECTED_SLICES->value,'default');
        //
        $filterValues = ReportConfigService::getReportConfig($currentReport, ReportConfigType::FILTER_VALUES->value,'default');

        return view('index', compact('currentEnv', 'authToken', 'currentReportFormat', 'currentReport', 'reports', 'envs', 'metrics', 'slices', 'selectedMetrics', 'selectedSlices', 'filterValues'));
    }
}
