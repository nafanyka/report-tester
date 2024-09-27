import toastr from "toastr";
import slicesRender from "./slicesRender.js";
import slicesRenderFilters from "./slicesRenderFilters.js";
import slicesEvents from "./slicesEvents.js";

export default class Slices {
    slices = null;
    sliceResponse = null;
    checked = null;
    timeout = null;
    filterResponses = {};

    constructor() {}

    init() {
        if (this.slices) {
            this.renderSlices();
        }
        this.events();
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
            if ((slicesResponse.data.success ?? false) && (slicesResponse.data.data.success ?? false)) {
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

    static getSelectedSlices() {
         return [...document.querySelectorAll('#slicesWrapper input[cb-slice]:checked')].map((e) => e.value);
    }

    static getFilterValues() {
        let checked = [...document.querySelectorAll('#slicesWrapper input[cb-slice]:checked')].map((e) => e.value);
        const result = {};
        checked.forEach((e) => {
            if (e === 'date') {
                result.date_from = document.getElementById('filter_date_from').value;
                result.date_to = document.getElementById('filter_date_to').value;
            } else {
                result[e] = document.getElementById('sliceFilter_' + e).value;
            }
        });
        return result;
    }
}

Slices.prototype.events = slicesEvents.events;
Slices.prototype.renderSlices = slicesRender.renderSlices;
Slices.prototype.clearSlices = slicesRender.clearSlices;
Slices.prototype.renderFilter = slicesRenderFilters.renderFilter;
