<?php

namespace App\Enums;

enum ReportConfigType: string
{
    case METRICS = 'metrics';
    case SLICES = 'slices';
    case SELECTED_METRICS = 'selected_metrics';
    case SELECTED_SLICES = 'selected_slices';
    case FILTER_VALUES = 'filter_values';
    case CUSTOM_FILTER_CONFIGS = 'custom_filter_configs';
    case CUSTOM_FILTER_VALUES = 'custom_filter_values';

}
