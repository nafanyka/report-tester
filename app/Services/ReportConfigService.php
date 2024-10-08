<?php

namespace App\Services;

use App\Models\ReportConfig;

class ReportConfigService
{
    public static function getReportConfig($report, $type, $instance = 'default')
    {
        return ReportConfig::where(['report' =>$report, 'type' => $type, 'instance_name' => $instance])->first()->value ?? null;
    }

    public static function setReportConfig($report, $type, $instance, $value):void
    {
        if (is_null($config = ReportConfig::where(['report' =>$report, 'type' => $type, 'instance_name' => $instance])->first())) {
            $config = new ReportConfig();
            $config->report = $report;
            $config->type = $type;
            $config->instance_name = $instance;
        }
        $config->value = array_filter($value, function ($item) {
            return !($item === null || $item === '' || (is_array($item) && count($item) === 0));
        });
        $config->save();
    }
}
