{{--add new env--}}
<div class="modal fade" id="dialogAddNewEnv" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add new env</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formAddNewEnv">
                    <input  id="formAddNewEnv_old_name" type="hidden" name="old_name" value="">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="dialogAddNewEnv_name" placeholder="name" name="name">
                        <label for="dialogAddNewEnv_name" class="form-label">Key</label>
                        <div id="formAddNewEnv_name_error" class="invalid-feedback" hidden></div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="dialogAddNewEnv_desc" placeholder="Description" name="description">
                        <label for="dialogAddNewEnv_desc" class="form-label">Description</label>
                        <div id="formAddNewEnv_description_error" class="invalid-feedback" hidden></div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="url" class="form-control" id="dialogAddNewEnv_domain" placeholder="Base domain" name="domain">
                        <label for="dialogAddNewEnv_domain" class="form-label">Base domain</label>
                        <div id="formAddNewEnv_domain_error" class="invalid-feedback" hidden></div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" id="dialogAddNewEnv_env" name="env">
                        @foreach(\App\Enums\Environment::cases() as $env)
                            <option value="{!! $env->value !!}">{!! $env->value !!}</option>
                        @endforeach
                        </select>
                        <label for="dialogAddNewEnv_env" class="form-label">Env</label>
                        <div id="formAddNewEnv_env_error" class="invalid-feedback" hidden></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="dialogAddNewEnv_btnSave">Save changes</button>
            </div>
        </div>
    </div>
</div>
{{-- end add new env--}}


{{-- response view--}}
<div class="modal fade" id="dialogViewResponse">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h5 class="modal-title text-white" id="dialogViewResponseTitle">View</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div><span class="h5">Code:</span> <code id="dialogViewResponseCode"></code></div>
                <div><span class="h5">URL:</span> <code id="dialogViewResponseURL"></code></div>
                <div>
                    <a data-bs-toggle="collapse" href="#dialogViewResponseBodyCollapse" aria-expanded="true" aria-controls="dialogViewResponseBodyCollapse">
                        <span class="h5">Body:</span>
                    </a>
                </div>
                <div class="collapse" id="dialogViewResponseBodyCollapse">
                    <div class="card card-body p-0 m-0">
                        <pre class="border border-secondary border-1 p-2"><code id="dialogViewResponseBody"></code></pre>
                    </div>
                </div>
                <div>
                    <a data-bs-toggle="collapse" href="#dialogViewResponseHeaderCollapse" aria-expanded="false" aria-controls="dialogViewResponseHeaderCollapse">
                        <span class="h5">Headers:</span>
                    </a>
                </div>
                <div class="collapse" id="dialogViewResponseHeaderCollapse">
                    <div class="card card-body p-0 m-0">
                        <pre class="border border-secondary border-1 p-2"><code id="dialogViewResponseHeader"></code></pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- end response view--}}

{{-- custom filter--}}
<div class="modal fade" id="dialogCustomFilter" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Custom filter</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formCustomFilter">
                    <input  id="formCustomFilter_old_name" type="hidden" name="old_name" value="">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="dialogCustomFilter_name" placeholder="Name" name="name" required>
                        <label for="dialogCustomFilter_name" class="form-label">Name</label>
                        <div id="formCustomFilter_name_error" class="invalid-feedback" hidden></div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="dialogCustomFilter_title" placeholder="Title" name="description" required>
                        <label for="dialogCustomFilter_title" class="form-label">Title</label>
                        <div id="formCustomFilter_title_error" class="invalid-feedback" hidden></div>
                    </div>
                    <div class="form-check form-switch">
                        <label class="form-check-label" for="dialogCustomFilter_allowEmpty">Allow empty?</label>
                        <input class="form-check-input" type="checkbox" name="allowEmpty" id="dialogCustomFilter_allowEmpty">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="dialogCustomFilter_btnSave">Save changes</button>
                <button type="button" class="btn btn-danger" id="dialogCustomFilter_btnDelete">Delete</button>
            </div>
        </div>
    </div>
</div>
{{-- end custom filter--}}
