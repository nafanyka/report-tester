import * as bootstrap from 'bootstrap';
import FormHelper from "./form-helper.js";
import currentstate from "./currentstate.js";
import swal from 'sweetalert'
export class EnvironmentDialogs {

    static events() {
        document.getElementById('inputAuthToken').addEventListener('change', (event) => {
            currentstate.set('authToken', event.target.value.trim());
        });
        document.getElementById('widgetEnvBtnAdd').addEventListener('click', (e) => {
            document.getElementById('dialogAddNewEnv_name').value = '';
            document.getElementById('dialogAddNewEnv_name').removeAttribute('readonly');
            document.getElementById('dialogAddNewEnv_desc').value = '';
            document.getElementById('dialogAddNewEnv_domain').value = '';
            document.getElementById('dialogAddNewEnv_env').value = 'staging';
            document.getElementById('formAddNewEnv_old_name').value = '';
            bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogAddNewEnv')).show();
        });
        document.getElementById('widgetEnvBtnEdit').addEventListener('click', (e) => {
            let current = window.environment.items[window.environment.current];
            document.getElementById('dialogAddNewEnv_name').value = current['name'];
            document.getElementById('formAddNewEnv_old_name').value = current['name'];
            document.getElementById('dialogAddNewEnv_name').setAttribute('readonly', 'readonly');
            document.getElementById('dialogAddNewEnv_desc').value = current['description'];
            document.getElementById('dialogAddNewEnv_domain').value = current['domain'];
            document.getElementById('dialogAddNewEnv_env').value = current['env'];
            bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogAddNewEnv')).show();
        });
        document.getElementById('widgetEnvBtnDelete').addEventListener('click', (e) => {
            swal({
                title: 'Are you sure?',
                text: 'Delete environment',
                type: 'warning',
                icon: 'warning',
                buttons: true
            }).then((value) => {
                if (value && window.environment.items[window.environment.current].is_blocked === 0) {
                    window.environment.destroyItem(window.environment.current)
                        .then(result => {
                            if (result.success) {
                                delete window.environment.items[window.environment.current];
                                window.environment.current = Object.keys(window.environment.items)[0];
                                window.environment.fetchItems();
                            }
                        });
                }
            });
        });


        document.getElementById('dialogAddNewEnv_btnSave').addEventListener('click', (e) => {
            let form = new FormHelper('formAddNewEnv');
            let data = form.getData();
            if (!data.old_name) {
                window.environment.storeItem(data)
                    .then(result => {
                        if (result.success) {
                            form.resetValidation();
                            currentstate.get('currentEnv', Object.keys(window.environment.items)[0])
                                .then(response => {window.environment.current = response; window.environment.fetchItems();});
                            bootstrap.Modal.getInstance(document.getElementById('dialogAddNewEnv')).hide();
                        } else {
                            form.renderValidation(result.errors);
                        }
                    });
            } else {
                window.environment.updateItem(data)
                    .then(result => {
                        if (result.success) {
                            form.resetValidation();
                            currentstate.get('currentEnv', Object.keys(window.environment.items)[0])
                                .then(response => {window.environment.current = response; window.environment.fetchItems();});
                            bootstrap.Modal.getInstance(document.getElementById('dialogAddNewEnv')).hide();
                        } else {
                            form.renderValidation(result.errors);
                        }
                    });
            }


        });

        document.addEventListener('click', (e) => {})

        document.getElementById('widgetEnvList').addEventListener('click', (e) => {
            if (e.target && e.target.getAttribute('data-env-element')) {
                window.environment.setCurrent( e.target.getAttribute('data-env-name'));
            }
        });
    }
}

export default EnvironmentDialogs;
