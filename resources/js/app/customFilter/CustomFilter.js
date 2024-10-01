import * as bootstrap from "bootstrap";
import ReportConfig from "../reportconfig.js";
import TomSelect from "tom-select";

export default class CustomFilter {

    configs = {};

    currentValues = {};

    init() {
        this.events();
        this.render();
    }

    events() {
        document.getElementById('addCustomFilter').addEventListener('click', (e) => {
            const button = e.target.closest('#addCustomFilter');
            if (button) {
                document.getElementById('dialogCustomFilter_btnDelete').setAttribute('hidden', 'hidden');
                document.getElementById('dialogCustomFilter_name').value = '';
                document.getElementById('dialogCustomFilter_title').value = '';
                document.getElementById('dialogCustomFilter_allowEmpty').checked = true;
                bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogCustomFilter')).show();
            }
        }, { capture: true, passive: true });

        document.getElementById('dialogCustomFilter_btnSave').addEventListener('click', () => {
            let name = document.getElementById('dialogCustomFilter_name');
            let title = document.getElementById('dialogCustomFilter_title');
            let oldName = document.getElementById('formCustomFilter_old_name');
            let allowEmpty = document.getElementById('dialogCustomFilter_allowEmpty');
            let hasErrors = false;
            let nameValue = name.value.trim().toLowerCase();
            let titleValue = title.value.trim();
            let oldNameValue = oldName.value.trim().toLowerCase();

            if (!nameValue || (!oldNameValue && window.customFilter.configs[nameValue]) || (oldNameValue && nameValue && oldNameValue !== nameValue && window.customFilter.configs[nameValue])) {
                hasErrors = true;
                if ((!oldNameValue && window.customFilter.configs[nameValue]) || (oldNameValue && nameValue && oldNameValue !== nameValue && window.customFilter.configs[nameValue])) {
                    let elementError = document.getElementById('formCustomFilter_name_error');
                    if (elementError) {
                        elementError.removeAttribute('hidden');
                        elementError.innerHTML = 'Exists';
                    }
                }
                name.classList.add('is-invalid');
            } else {
                name.classList.remove('is-invalid');
                let elementError = document.getElementById('formCustomFilter_name_error');
                if (elementError) {
                    elementError.setAttribute('hidden', 'hidden');
                    elementError.innerHTML = '';
                }
            }
            if (!titleValue) {
                hasErrors = true;
                title.classList.add('is-invalid');
            } else {
                title.classList.remove('is-invalid');
            }
            if (!hasErrors) {
                if (oldNameValue && nameValue && oldNameValue !== nameValue && window.customFilter.configs[oldNameValue]) {
                    //
                    if (window.customFilter.currentValues[oldNameValue]) {
                        window.customFilter.currentValues[nameValue] = window.customFilter.currentValues[oldNameValue];
                        delete window.customFilter.currentValues[oldNameValue];
                        ReportConfig.set(document.getElementById('selReport').value, 'custom_filter_values', 'default', window.customFilter.currentValues);
                    }
                    if (window.customFilter.configs[oldNameValue]) {
                        window.customFilter.configs[nameValue] = window.customFilter.configs[oldNameValue];
                        delete window.customFilter.configs[oldNameValue];
                    }
                }
                if (window.customFilter.configs[nameValue] === undefined) {
                    window.customFilter.configs[nameValue] = {};
                }
                window.customFilter.configs[nameValue].name = nameValue;
                window.customFilter.configs[nameValue].title = titleValue;
                window.customFilter.configs[nameValue].allowEmpty = allowEmpty.checked;
                //
                if (!(window.customFilter.configs[nameValue].values ?? false)) {
                    window.customFilter.configs[nameValue].values = [];
                }
                //
                ReportConfig.set(document.getElementById('selReport').value, 'custom_filter_configs', 'default', window.customFilter.configs);
                bootstrap.Modal.getInstance(document.getElementById('dialogCustomFilter')).hide();
                this.clear();
                this.render();
            }
        });

        document.getElementById('customFiltersWrapper').addEventListener('click', (e) => {
            const button = e.target.closest('[data-custom-filter-edit]');
            if (button) {
                let customFilterId = button.getAttribute('data-custom-filter-edit');
                let currentConfig = window.customFilter.configs[customFilterId];
                if (currentConfig) {
                    document.getElementById('dialogCustomFilter_btnDelete').removeAttribute('hidden');
                    document.getElementById('dialogCustomFilter_name').value = currentConfig.name;
                    document.getElementById('formCustomFilter_old_name').value = currentConfig.name;
                    document.getElementById('dialogCustomFilter_title').value = currentConfig.title;
                    document.getElementById('dialogCustomFilter_allowEmpty').checked = currentConfig.allowEmpty;
                    bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogCustomFilter')).show();
                }
            }
        }, { capture: true, passive: true });

        document.getElementById('dialogCustomFilter_btnDelete').addEventListener('click', () => {
            let customId = document.getElementById('formCustomFilter_old_name').value;
            if (customId) {
                delete window.customFilter.configs[customId];
                delete window.customFilter.currentValues[customId];
                ReportConfig.set(document.getElementById('selReport').value, 'custom_filter_configs', 'default', window.customFilter.configs);
                ReportConfig.set(document.getElementById('selReport').value, 'custom_filter_values', 'default', window.customFilter.currentValues);
                bootstrap.Modal.getInstance(document.getElementById('dialogCustomFilter')).hide();
                this.clear();
                this.render();
            }
        });
    }

    clear() {
        document.getElementById('customFiltersWrapper').innerHTML = '';
    }

    render() {
        let customFilters = Object.getOwnPropertyNames(this.configs);
        let wrapper = document.getElementById('customFiltersWrapper');
        customFilters.forEach((customFilterId) => {
            let customFilterConfig = window.customFilter.configs[customFilterId];
            let div = document.createElement('div');
            div.className = 'd-inline-flex pt-1 pb-1 ps-0 me-4';
            div.setAttribute('id', 'customFilterFilterWrapper_'+customFilterId);
            let lbl = document.createElement('label');
            lbl.className = 'form-check-label me-1 mt-1 text-nowrap';
            lbl.setAttribute('for', 'customFilter_'+customFilterId);
            lbl.innerHTML = customFilterConfig.title;
            div.append(lbl);
            //
            let inp = '<div class="input-group input-group-sm">' +
                '<select class="form-select form-select-sm" style="width: 200px;" id="customFilter_'+customFilterId+'"></select>' +
                '<button type="button" data-custom-filter-edit="'+customFilterId+'" class="btn btn-success">' +
                feather.icons.edit.toSvg() +
                '</button>' +
                '</div>';
            div.innerHTML = div.innerHTML + inp;
            wrapper.append(div);
            const options = [];
            if (customFilterConfig.allowEmpty) {
                options.push({id: '', name: "-"});
            }
            customFilterConfig.values.forEach((value) => {
                options.push({id: value, name: value});
            });

            new TomSelect('#customFilter_'+customFilterId,{
                create: true,
                options: options,
                valueField: 'id',
                labelField: 'name',
                searchField: ['name', 'id'],
                onInitialize: function () {
                    let customId = customFilterId;
                    let allowEmpty = customFilterConfig.allowEmpty;
                    let currentValue = window.customFilter.currentValues[customId] ?? '';
                    if (!currentValue) {
                        if (allowEmpty) {
                            this.setValue('', true);
                        } else {
                            this.setValue(window.customFilter.configs[customId].values[0] ?? '', true);
                        }
                    } else {
                        this.setValue(currentValue, true);
                    }
                },
                onOptionAdd: function (option) {
                    let customId = customFilterId;
                    if (!window.customFilter.configs[customId].values.includes(option)) {
                        window.customFilter.configs[customId].values.push(option);
                        ReportConfig.set(document.getElementById('selReport').value, 'custom_filter_configs', 'default', window.customFilter.configs);
                    }
                },
                onChange: function() {
                    let customId = customFilterId;
                    if (this.getValue() !== '') {
                        window.customFilter.currentValues[customId] = this.getValue();
                    } else {
                        delete window.customFilter.currentValues[customId];
                    }
                    ReportConfig.set(document.getElementById('selReport').value, 'custom_filter_values', 'default', window.customFilter.currentValues);
                },
            });
        });
    }
}
