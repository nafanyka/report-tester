<?php

namespace App\Enums;
enum Environment: string
{
    case PRODUCTION = 'production';
    case STAGING = 'staging';
    case RELEASE = 'release';
}
