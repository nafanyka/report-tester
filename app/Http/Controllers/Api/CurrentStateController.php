<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CurrentState\ReportAddRequest;
use App\Http\Requests\Api\CurrentState\StoreRequest;
use App\Services\CurrentStateService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CurrentStateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (is_null($value = CurrentStateService::getCurrentState($request->get('key')))) {
            throw new NotFoundHttpException("Key not found");
        }
        return response()->json($value);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $result = 0;
        foreach ($request->data as $row) {
            $result += (int)CurrentStateService::setCurrentState($row['key'], $row['value']);
        }
        return response()->json($result);
    }

    public function reports(Request $request)
    {
        $reports = CurrentStateService::getCurrentState('reports') ?? [];
        if (!empty($request->q)) {
            $reports = array_filter($reports, function ($item) use ($request) {return preg_match("/" . preg_quote($request->q) . "/i", $item);});
        }
        return response()->json(array_map(function ($item) {return ["id" => $item, "name" => $item];}, $reports));
    }

    public function reportAdd(ReportAddRequest $request)
    {
        $reports = CurrentStateService::getCurrentState('reports') ?? [];
        $reports[$request->get('option')] = $request->get('option');
        CurrentStateService::setCurrentState('reports', $reports);
        return response()->json(true);
    }
}
