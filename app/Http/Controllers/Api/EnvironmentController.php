<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Environment\StoreEnviromentRequest;
use App\Http\Requests\Api\Environment\UpdateEnviromentRequest;
use App\Models\CurrentState;
use App\Models\Environment;

class EnvironmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Environment::all()->keyBy('name');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnviromentRequest $request)
    {
        $env = new Environment();
        $env->fill($request->all());
        if ($env->save()) {
            try {
                if (is_null($obj = CurrentState::find('currentEnv'))) {
                    $obj = new CurrentState();
                    $obj->key = 'currentEnv';
                }
                $obj->value = serialize($request->get('name'));
                $obj->save();
            } catch (\Throwable) {}
            return response()->json(['saved' => true]);
        } else {
            return response()->json(['saved' => false]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnviromentRequest $request, Environment $env)
    {
        $env->fill($request->all());
        if ($env->save()) {
            return response()->json(['saved' => true]);
        } else {
            return response()->json(['saved' => false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Environment $env)
    {
        if ($env->is_blocked) {
            return response()->json(['saved' => false]);
        } else if ($env->delete()) {
            return response()->json(['saved' => true]);
        } else {
            return response()->json(['saved' => false]);
        }
    }
}
