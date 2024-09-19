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
