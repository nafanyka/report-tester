<?php

namespace App\Http\Controllers;

use App\Models\CurrentState;
use App\Models\Environment;
use App\Services\CurrentStateService;

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
        $metrics = CurrentStateService::getCurrentState('metrics');
        $slices = CurrentStateService::getCurrentState('slices');

        return view('index', compact('currentEnv', 'authToken', 'currentReportFormat', 'currentReport', 'reports', 'envs', 'metrics', 'slices'));
    }
}
