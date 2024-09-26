import toastr from "toastr";
import * as bootstrap from 'bootstrap';
import jsonPretty from "./jsonpretty.js";
import moment from "moment";
import TomSelect from "tom-select";
import apiUrls from "@/app/apiUrls.js";
import ReportConfig from "@/app/reportconfig.js";
// window.bootstrap = bootstrap;

export class Slices {
    slices = null;
    sliceResponse = null;

    checked = null;


    timeout = null;

    constructor() {}

    init() {
        if (this.slices) {
            this.renderSlices(true);
        }
        this.events();
    }

    events() {
        document.getElementById('btnGetSlices').addEventListener('click', (event) => {
            this.getSlices();
        });

        document.getElementById('btnViewSlices').addEventListener('click', (event) => {
            if (this.sliceResponse !== null) {
                document.getElementById('dialogViewResponseTitle').innerHTML = 'View Slices Response';
                let body = document.getElementById('dialogViewResponseBody');
                let code = document.getElementById('dialogViewResponseCode');
                let header = document.getElementById('dialogViewResponseHeader');

                code.innerHTML = jsonPretty.prettyPrint(this.sliceResponse.status || 0);
                body.innerHTML = jsonPretty.prettyPrint(this.sliceResponse.body || {});
                header.innerHTML = jsonPretty.prettyPrint(this.sliceResponse.headers || {});

                document.getElementById('dialogViewResponseBodyCollapse').classList.add('show');
                document.getElementById('dialogViewResponseHeaderCollapse').classList.remove('show');
                bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogViewResponse')).show();
            }
        });

        document.getElementById('slicesWrapper').addEventListener('change', (event) => {
            let target = event.target;
            this.renderFilter(event.target.getAttribute('cb-slice'), event.target.checked);
            if (target.hasAttribute('cb-slice')) {
                let checked = [...document.querySelectorAll('#slicesWrapper input:checked')].map(e => e.getAttribute('cb-slice'));
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.checked = checked;
                this.timeout = setTimeout(() => {
                    ReportConfig.set(document.getElementById('selReport').value, 'selected_slices', 'default', checked);
                }, 1500);
            }
        });
    }

    async getSlices() {
        let slicesViewBtn = document.getElementById('btnViewSlices');
        let slicesResponse = await window.statistic.getSlices().catch((error) => {
            let allErrors = error.response.data.errors;
            let errors = [];
            for (let key in allErrors) {
                errors = [...errors, ...allErrors[key]];
            }
            if (errors.length > 0) {
                toastr.error("Slices request error", errors.join('<br>'));
                this.slices = {};
                this.sliceResponse = {};
                slicesViewBtn.classList.remove('btn-secondary');
                slicesViewBtn.classList.remove('btn-success');
                slicesViewBtn.classList.add('btn-danger');
                this.clearSlices();
            }
        });
        if (slicesResponse !== undefined) {
            this.slices = {};
            this.sliceResponse = slicesResponse.data.data;
            if ((slicesResponse.data.success || false) && (slicesResponse.data.data.success || false)) {
                slicesViewBtn.classList.remove('btn-secondary');
                slicesViewBtn.classList.remove('btn-danger');
                slicesViewBtn.classList.add('btn-success');
                this.slices = slicesResponse.data.data.body.data;
                this.clearSlices();
                this.renderSlices();
            } else {
                slicesViewBtn.classList.remove('btn-secondary');
                slicesViewBtn.classList.remove('btn-success');
                slicesViewBtn.classList.add('btn-danger');
                this.clearSlices();
            }
        }
    }

    clearSlices() {
        let wrapper = document.getElementById('slicesWrapper');
        wrapper.innerText = '';

        let filterWrapper = document.getElementById('filtersWrapper');
        filterWrapper.innerText = '';
    }

    renderSlices(init = false) {
        let wrapper = document.getElementById('slicesWrapper');

        this.slices.forEach((slice) => {
            let div = document.createElement('div');
            div.classList.add('d-inline-flex');
            div.classList.add('pt-1');
            div.classList.add('pb-1');
            div.classList.add('ps-0');
            div.classList.add('me-2');
            div.classList.add('form-check');
            div.classList.add('form-check-inline');
            let cb = document.createElement('input');
            cb.classList.add('btn-check');
            cb.setAttribute('type', 'checkbox');
            cb.setAttribute('value', slice.id);
            cb.setAttribute('id', 'cbSlice_'+slice.id);
            cb.setAttribute('cb-slice', slice.id);
            let lbl = document.createElement('label');
            lbl.classList.add('btn');
            //
            if (this.checked.includes(slice.id)) {
                cb.setAttribute('checked', 'checked');
                this.renderFilter(slice.id, true);
            } else {
                this.renderFilter(slice.id, false);
            }
            //
            if (slice.is_visible || false) {
                lbl.classList.add('btn-outline-primary');
            } else {
                lbl.classList.add('btn-outline-secondary');
            }
            lbl.setAttribute('for', 'cbSlice_'+slice.id);
            lbl.innerHTML = slice.name;
            div.append(cb);
            div.append(lbl);
            wrapper.append(div);
        });
    }

    renderFilter(slice, enable = false) {
        if (enable) {
            const sliceConfig = this.slices.find((element) => element.id === slice);
            if (sliceConfig == undefined) return;
            let wrapper = document.getElementById('filtersWrapper');
            let div = document.createElement('div');
            div.className = 'd-inline-flex pt-1 pb-1 ps-0 me-4';
            div.setAttribute('id', 'sliceFilterWrapper_'+slice);
            let lbl = document.createElement('label');
            lbl.className = 'form-check-label me-1 mt-1 text-nowrap';
            lbl.setAttribute('for', 'sliceFilter_'+slice);
            lbl.innerHTML = sliceConfig.name;
            div.append(lbl);
            //
            if (slice == 'date') {
                div.innerHTML = div.innerHTML + '<input type="hidden" value="" data-filter="date_from" id="filter_date_from"><input type="hidden" value="" data-filter="date_to" id="filter_date_to">';
                div.innerHTML = div.innerHTML + '<input type="text" class="flatpickr flatpickr-input input-control-sm" id="sliceFilter_'+slice+'">';
                wrapper.appendChild(div);

                flatpickr('#sliceFilter_'+slice, {
                    mode: "range",
                    ariaDateFormat: "Y-m-d",
                    dateFormat: "Y-m-d",
                    defaultDate: [
                        moment().format('YYYY-MM-DD'),
                        moment().format('YYYY-MM-DD'),
                    ],
                    onChange: function (dates) {
                        if (dates.length == 2) {
                            document.getElementById('filter_date_from').value = moment(dates[0]).format('YYYY-MM-DD')
                            document.getElementById('filter_date_to').value = moment(dates[1]).format('YYYY-MM-DD');
                        }
                    },
                    onReady: function (dates) {
                        document.getElementById('filter_date_from').value = moment(dates[0]).format('YYYY-MM-DD')
                        document.getElementById('filter_date_to').value = moment(dates[1]).format('YYYY-MM-DD');
                    },
                });
            } else {
                let inp = '<div class="input-group input-group-sm">'
                    +'<input type="text" id="sliceFilter_'+slice+'" multiple>'
                    +'<button type="button" class="btn btn-secondary">'+feather.icons.eye.toSvg()+'</button>'
                    +'</div>';
                div.innerHTML = div.innerHTML + inp;
                wrapper.append(div);

                const r = new TomSelect('#sliceFilter_'+slice,{
                    create: false,
                    valueField: 'id',
                    labelField: 'name',
                    searchField: ['name', 'id'],
                    preload: 'focus',
                    plugins: ['input_autogrow', 'remove_button'],
                    onChange: function(option) {
                        this.blur();
                    //     currentstate.set('currentReport', option);
                    //     window.initSelectedMetrics = null;
                    //     window.initSelectedSlices = null;
                    //     window.initMetrics = null;
                    //     window.initSlices = null;
                    },
                    load: function (query, callback) {
                        fetch(apiUrls.reports.search + '?q=' + encodeURIComponent(query))
                            .then(response => response.json())
                            .then(json => { callback(json.data)})
                            .catch(error => {callback();});
                    }
                });
            }
        } else {
            let e = document.getElementById('sliceFilterWrapper_'+slice);
            if (e) {
                e.parentNode.removeChild(e);
            }
        }
    }
}

export default Slices;
