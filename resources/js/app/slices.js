import toastr from "toastr";
import * as bootstrap from 'bootstrap';
import jsonPretty from "./jsonpretty.js";
import currentstate from "@/app/currentstate.js";
// window.bootstrap = bootstrap;

export class Slices {

    slices = null;
    sliceResponse = null;

    timeout = null;

    constructor() {
        if (window.initSlices && window.initSlices.report === window.initCurrentReport) {
            this.slices = window.initSlices.data;
            window.initSlices = null;
            this.renderSlices();
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
            if (target.hasAttribute('cb-slice')) {
                let checked = [...document.querySelectorAll('#slicesWrapper input:checked')].map(e => e.getAttribute('cb-slice'));
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.timeout = setTimeout(() => {
                    currentstate.set('slicesChecked', {report: document.getElementById('selReport').value, slices: checked });
                }, 2000);
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
    }

    renderSlices() {
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
            if (slice.is_visible) {
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
}

export default Slices;
