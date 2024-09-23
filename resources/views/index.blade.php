@extends('layouts.applayout')
@section('title', 'Report Tester')

@section('content')
    @include('layouts.parts._variables')
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col col-5">
                <div class="card mb-3">
                    <div class="card-body p-2">
                        <div class="row">
                            <div class="col-6">
                                <label for="selReport" class="form-label">Report</label>
                                <select id="selReport" placeholder="Select a report..." autocomplete="off">
                                    @foreach($reports as $report)
                                        <option value="{{ $report }}" @if($report == $currentReport) selected @endif>{{ $report }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-6">
                                <label for="selReportFormat" class="form-label">Report Format</label>
                                <select id="selReportFormat" placeholder="Select a report format..." autocomplete="off">
                                    @foreach(\App\Enums\ReportFormat::cases() as $reportFormat)
                                        <option value="{!! $reportFormat->value !!}" @if($reportFormat->value == $currentReportFormat) selected @endif>{!! $reportFormat->value !!}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-7">
                <div class="row p-0">
                    <div class="col col-12 p-0">
                        <div class="card p-1 m-0">
                            <div class="card-body text-center">
                                <div class="btn-group" role="group">
                                    <button id="btnGetMetrics" type="button" class="btn btn-primary">Get Metrics</button>
                                    <button id="btnViewMetrics" type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                                </div>
                                <div class="btn-group" role="group">
                                    <button id="btnGetSlices" type="button" class="btn btn-primary">Get Slices</button>
                                    <button id="btnViewSlices" type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-primary">Get Report ID</button>
                                    <button type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-primary">Get ort Config</button>
                                    <button type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
{{-- metrics--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0">
                <div class="card p-1 m-0">
                    <div class="card-header p-2 h-4">Metrics</div>
                    <div class="card-body p-2 d-flex flex-wrap" id="metricsWrapper"></div>
                </div>
            </div>
        </div>
{{-- end metrics--}}
{{-- slices--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0">
                <div class="card p-1 m-0">
                    <div class="card-header p-2 h-4">Slices</div>
                    <div class="card-body p-2 d-flex flex-wrap" id="slicesWrapper"></div>
                </div>
            </div>
        </div>
{{-- end slices--}}

    </div>
@endsection
