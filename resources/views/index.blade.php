@extends('layouts.applayout')
@section('title', 'Report Tester')

@section('content')
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col col-3">
                <div class="card">
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="selReport" class="form-label">Report</label>
                            <select id="selReport" placeholder="Select a report..." autocomplete="off"></select>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
@endsection
