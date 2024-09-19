<nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle js-sidebar-toggle">
        <i class="hamburger align-self-center"></i>
    </a>

    <div class="navbar-collapse collapse">
        <ul class="navbar-nav navbar-align">

            <div class="btn-group">
                <button type="button" class="btn btn-primary" id="widgetEnvCurrent"></button>
                <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" id="widgetEnvList"></ul>
            </div>


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
        </ul>
    </div>
</nav>
