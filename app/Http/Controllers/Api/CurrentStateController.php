<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CurrentState\StoreRequest;
use App\Models\CurrentState;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CurrentStateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (is_null($obj = CurrentState::find($request->get('key')))) {
            throw new NotFoundHttpException("Key not found");
        }
        return response()->json(unserialize($obj->value));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $result = 0;
        foreach ($request->data as $row) {
            if (is_null($obj = CurrentState::find($row['key']))) {
                $obj = new CurrentState();
                $obj->key = $row['key'];
            }
            $obj->value = serialize($row['value']);
            $result += (int)$obj->save();
        }
        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
