<?php

namespace App\Enums;

enum ReportFormat: string
{
    case GRID = 'grid';
    case CSV = 'csv';
    case XLS = 'xls';
    case XLSX = 'xlsx';

}
