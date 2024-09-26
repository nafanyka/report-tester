@extends('layouts.applayout')
@section('title', 'Report Tester')

@section('content')
    @include('layouts.parts._variables')
    <div class="container-fluid p-0">
{{-- metrics--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0">
                <div class="card p-1 m-0">
                    <div class="card-header p-2 h-4">
                        <a data-bs-toggle="collapse" href="#metricsWrapperBody" aria-expanded="true" aria-controls="metricsWrapperBody" id="metricsWrapperHeader">
                            <i data-feather="chevron-down" class="float-end fa"></i>
                            Metrics
                        </a>
                        <div class="btn-group ms-3" role="group">
                            <button id="btnGetMetrics" type="button" class="btn btn-primary">Get Metrics</button>
                            <button id="btnViewMetrics" type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                        </div>
                        <div class="btn-group ms-3" role="group">
                            <button type="button" class="btn btn-primary">Get Report ID</button>
                            <button type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                        </div>
                        <div class="btn-group ms-3" role="group">
                            <button type="button" class="btn btn-primary">Get ort Config</button>
                            <button type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                        </div>
                    </div>
                    <div id="metricsWrapperBody" class="collapse show" aria-labelledby="metricsWrapperHeader">
                        <div class="card-body p-2 d-flex flex-wrap" id="metricsWrapper"></div>
                    </div>
                </div>
            </div>
        </div>
{{-- end metrics--}}
{{-- slices--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0 mt-2">
                <div class="card p-1 m-0">
                    <div class="card-header p-2 h-4">
                        <a data-bs-toggle="collapse" href="#slicesWrapperBody" aria-expanded="true" aria-controls="slicesWrapperBody" id="slicesWrapperHeader">
                            <i data-feather="chevron-down" class="float-end fa"></i>
                            Slices
                        </a>
                        <div class="btn-group ms-3" role="group">
                            <button id="btnGetSlices" type="button" class="btn btn-primary">Get Slices</button>
                            <button id="btnViewSlices" type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                        </div>
                    </div>
                    <div id="slicesWrapperBody" class="collapse show" aria-labelledby="slicesWrapperHeader">
                        <div class="card-body p-2 d-flex flex-wrap" id="slicesWrapper"></div>
                    </div>
                </div>
            </div>
        </div>
{{-- end slices--}}
{{-- filters--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0 mt-2">
                <div class="card p-1 m-0">
                    <div class="card-header p-2 h-4">
                        <a data-bs-toggle="collapse" class="collapsed" href="#filtersWrapperBody" aria-expanded="true" aria-controls="filtersWrapperBody" id="filtersWrapperHeader">
                            <i data-feather="chevron-down" class="float-end fa"></i>
                            Filters
                        </a>
                    </div>
                    <div id="filtersWrapperBody" class="collapse" aria-labelledby="filtersWrapperHeader">
                        <div class="card-body p-2 d-flex flex-wrap" id="filtersWrapper"></div>
                    </div>
                </div>
            </div>
        </div>
{{-- end filters--}}

    </div>
@endsection
