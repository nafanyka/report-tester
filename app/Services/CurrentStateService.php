<?php

namespace App\Services;

use App\Models\CurrentState;

class CurrentStateService
{
    public static function getCurrentState($name)
    {
        if(!is_null($obj = CurrentState::find($name))) {
            return $obj->value;
        }
        return null;
    }

    public static function setCurrentState($name, $value): bool
    {
        if (is_null($obj = CurrentState::find($name))) {
            $obj = new CurrentState();
            $obj->key = $name;
        }
        $obj->value = $value;
        return $obj->save();
    }

}
