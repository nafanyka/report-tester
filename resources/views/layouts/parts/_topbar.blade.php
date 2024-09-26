<nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle js-sidebar-toggle">
        <i class="hamburger align-self-center"></i>
    </a>

    <div class="navbar-collapse collapse">
        <ul class="navbar-nav navbar-align">
            <li class="nav-item">
                <div class="input-group">
                    <label for="selReport" class="input-group-text">Report</label>
                    <select class="form-control" id="selReport" placeholder="Report..." autocomplete="off" style="width: 250px;">
                        @foreach($reports as $report)
                            <option value="{{ $report }}" @if($report == $currentReport) selected @endif>{{ $report }}</option>
                        @endforeach
                    </select>
                    <label for="selReportFormat" class="input-group-text ms-2">Format</label>
                    <select class="form-control me-2" id="selReportFormat" placeholder="Format..." autocomplete="off" style="width: 100px;">
                        @foreach(\App\Enums\ReportFormat::cases() as $reportFormat)
                            <option value="{!! $reportFormat->value !!}" @if($reportFormat->value == $currentReportFormat) selected @endif>{!! $reportFormat->value !!}</option>
                        @endforeach
                    </select>
                </div>
            </li>
            <li class="nav-item">
                <div class="d-flex" style="width: 400px;">
                    <input class="form-control" type="text" placeholder="Auth Token" aria-label="Auth Token" id="inputAuthToken" autocomplete="off">
                </div>
            </li>
            <li class="nav-item">
                <div class="d-flex btn-group">
                    <button type="button" class="btn btn-primary" id="widgetEnvCurrent"></button>
                    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" id="widgetEnvList"></ul>
                </div>
            </li>
            <li class="nav-item">
                <ul class="nav nav-pills">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i data-feather="list"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item disabled" href="#" id="widgetEnvBtnEdit">Edit</a></li>
                            <li><a class="dropdown-item disabled" href="#" id="widgetEnvBtnDelete">Delete</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="widgetEnvBtnAdd">Add new</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="nav-item">
                <div id="globalLoader" class="spinner-border spinner-border-sm" role="status" hidden="hidden">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </li>
        </ul>
    </div>
</nav>
