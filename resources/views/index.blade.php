@extends('layouts.applayout')
@section('title', 'Report Tester')

@section('content')
    @include('layouts.parts._variables')
    <div class="container-fluid p-0">

{{-- slices--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0 mt-0">
                <div class="card p-1 m-0 border-secondary border-1">
                    <div class="card-header p-2 h-4">
                        <a data-bs-toggle="collapse" href="#slicesWrapperBody" aria-expanded="true" aria-controls="slicesWrapperBody" id="slicesWrapperHeader">
                            <i data-feather="chevron-down" class="float-end fa"></i>
                            Slices
                        </a>
                        <div class="btn-group input-group-sm ms-3" role="group">
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
                <div class="card p-1 m-0 border-secondary border-1">
                    <div class="card-header p-2 h-4">
                        <a data-bs-toggle="collapse" class="collapsed" href="#filtersWrapperBody" aria-expanded="true" aria-controls="filtersWrapperBody" id="filtersWrapperHeader">
                            <i data-feather="chevron-down" class="float-end fa"></i>
                            Filters
                        </a>
                        <button class="btn btn-sm btn-primary ms-3" type="button" id="addCustomFilter" title="Add custom filter"><i data-feather="plus"></i></button>
                    </div>
                    <div id="filtersWrapperBody" class="collapse" aria-labelledby="filtersWrapperHeader">
                        <div class="card-body p-2 d-flex flex-wrap" id="filtersWrapper"></div>
                        <hr class="mt-2 mb-2">
                        <div class="card-body p-2 d-flex flex-wrap" id="customFiltersWrapper"></div>
                    </div>
                </div>
            </div>
        </div>
{{-- end filters--}}
{{-- metrics--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0 mt-2">
                <div class="card p-1 m-0 border-secondary border-1">
                    <div class="card-header p-2 h-4">
                        <a data-bs-toggle="collapse" href="#metricsWrapperBody" aria-expanded="true" aria-controls="metricsWrapperBody" id="metricsWrapperHeader">
                            <i data-feather="chevron-down" class="float-end fa"></i>
                            Metrics
                        </a>
                        <div class="btn-group input-group-sm ms-3" role="group">
                            <button id="btnGetMetrics" type="button" class="btn btn-primary">Get Metrics</button>
                            <button id="btnViewMetrics" type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                        </div>
                        <div class="btn-group input-group-sm ms-3" role="group">
                            <button type="button" class="btn btn-primary">Get Report ID</button>
                            <button type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                        </div>
                        <div class="btn-group input-group-sm ms-3" role="group">
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
{{-- report--}}
        <div class="row">
            <div class="col col-12 m-0 pe-0 mt-2">
                <div class="card p-1 m-0 border-secondary border-1">
                    <div class="card-header p-2 h-4">
                        Results
                        <div class="btn-group input-group-sm ms-3" role="group">
                            <button id="btnRunReport" type="button" class="btn btn-primary">Run report</button>
                            <button id="btnViewRunReport" type="button" class="btn btn-secondary"><i data-feather="eye"></i></button>
                        </div>
                        <div class="btn-group input-group-sm ms-3" role="group">
                            <span class="input-group-text ms-3">Sort</span>
                            <select class="form-select" id="selSortField">
                                <option value="default">Default</option>
                            </select>
                            <select class="form-select" id="selSortDir">
                                <option value="desc">DESC</option>
                                <option value="asc">ASC</option>
                            </select>
                        </div>
                        <div class="btn-group input-group-sm ms-3" role="group">
                            <span class="input-group-text ms-3">Per Page</span>
                            <select class="form-select" id="selPerpage">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="300">300</option>
                            </select>
                        </div>
                        <div class="btn-group input-group-sm ms-3 float-end" role="group">
                            <span class="input-group-text">Total rows</span>
                            <span class="input-group-text me-3" id="totalRows">0</span>

                            <span class="input-group-text">Page</span>
                            <input class="form-control form-control-sm" id="inpPage" value="1" style="width: 40px;">
                            <span class="input-group-text">from</span>
                            <input class="form-control form-control-sm" id="inpPageTotal" value="1" readonly style="width: 40px;">
                        </div>
                    </div>
                    <div id="reportWrapperBody" aria-labelledby="resultWrapper">
                        <div id="reportGridTable" class="w-100"></div>
                    </div>
                </div>
            </div>
        </div>
{{-- end report--}}
    </div>
@endsection
