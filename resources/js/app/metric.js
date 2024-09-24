import toastr from "toastr";
import * as bootstrap from 'bootstrap';
import jsonPretty from "./jsonpretty.js";
import currentstate from "./currentstate.js";
// window.bootstrap = bootstrap;

export class Metric {
    timeout = null;

    metrics = null;
    metricResponse = null;

    constructor() {
        if (window.initMetrics && window.initMetrics.report == window.initCurrentReport) {
            this.metrics = window.initMetrics.data;
            window.initMetrics = null;
            this.renderMetrics(true);
        }
        this.events();
    }

    events() {
        document.getElementById('btnGetMetrics').addEventListener('click', (event) => {
            this.getMetrics();
        });

        document.getElementById('btnViewMetrics').addEventListener('click', (event) => {
            if (this.metricResponse !== null) {
                document.getElementById('dialogViewResponseTitle').innerHTML = 'View Metrics Response';
                let body = document.getElementById('dialogViewResponseBody');
                let code = document.getElementById('dialogViewResponseCode');
                let header = document.getElementById('dialogViewResponseHeader');

                code.innerHTML = jsonPretty.prettyPrint(this.metricResponse.status || 0);
                body.innerHTML = jsonPretty.prettyPrint(this.metricResponse.body || {});
                header.innerHTML = jsonPretty.prettyPrint(this.metricResponse.headers || {});

                document.getElementById('dialogViewResponseBodyCollapse').classList.add('show');
                document.getElementById('dialogViewResponseHeaderCollapse').classList.remove('show');
                bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogViewResponse')).show();
            }
        });

        document.getElementById('metricsWrapper').addEventListener('change', (event) => {
            let target = event.target;
            if (target.hasAttribute('cb-metric')) {
                let checked = [...document.querySelectorAll('#metricsWrapper input:checked')].map(e => e.getAttribute('cb-metric'));
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.timeout = setTimeout(() => {
                    currentstate.set('metricsChecked', {report: document.getElementById('selReport').value, metrics: checked })
                        .then(() => {
                            currentstate.get('metricsChecked').then(response => {
                                window.initSelectedMetrics = response;
                            });
                        });
                }, 1500);
            }
        });
    }

    async getMetrics() {
        let metricsViewBtn = document.getElementById('btnViewMetrics');
        let metricsResponse = await window.statistic.getMetrics().catch((error) => {
            let allErrors = error.response.data.errors;
            let errors = [];
            for (let key in allErrors) {
                errors = [...errors, ...allErrors[key]];
            }
            if (errors.length > 0) {
                toastr.error("Metric request error", errors.join('<br>'));
                this.metrics = {};
                metricsViewBtn.classList.remove('btn-secondary');
                metricsViewBtn.classList.remove('btn-success');
                metricsViewBtn.classList.add('btn-danger');
                this.clearMetrics();
            }
        });
        if (metricsResponse !== undefined) {
            this.metrics = {};
            this.metricResponse = metricsResponse.data.data;
            if ((metricsResponse.data.success || false) && (metricsResponse.data.data.success || false)) {
                metricsViewBtn.classList.remove('btn-secondary');
                metricsViewBtn.classList.remove('btn-danger');
                metricsViewBtn.classList.add('btn-success');
                this.metrics = metricsResponse.data.data.body.data;
                this.clearMetrics();
                this.renderMetrics();
            } else {
                metricsViewBtn.classList.remove('btn-secondary');
                metricsViewBtn.classList.remove('btn-success');
                metricsViewBtn.classList.add('btn-danger');
                this.clearMetrics();
            }
        }
    }

    clearMetrics() {
        let wrapper = document.getElementById('metricsWrapper');
        wrapper.innerText = '';
    }

    renderMetrics(init = false) {
        let wrapper = document.getElementById('metricsWrapper');
        let currentSection = null;
        for (let section in this.metrics.sections) {
            if (currentSection !== section) {
                if (currentSection) {
                    let br = document.createElement('div');
                    br.style = 'width: 100%;';
                    wrapper.append(br);
                }
                let div = document.createElement('div');
                div.classList.add('h5');
                div.classList.add('d-flex');
                div.innerHTML = this.metrics.sections[section].name;
                wrapper.append(div)
                let br = document.createElement('div');
                br.style = 'width: 100%;';
                wrapper.append(br);
                currentSection = section;
            }
            this.metrics.sections[section].metrics.forEach((metric) => {
                let div = document.createElement('div');
                div.classList.add('d-inline-flex');
                div.classList.add('pt-1');
                div.classList.add('pb-1');
                div.classList.add('form-check');
                div.classList.add('form-check-inline');
                let cb = document.createElement('input');
                cb.classList.add('form-check-input');
                // cb.classList.add('mt-2');
                cb.classList.add('me-1');
                cb.setAttribute('type', 'checkbox');
                cb.setAttribute('id', 'cbMetrics_'+metric);
                cb.setAttribute('value', metric);
                cb.setAttribute('cb-metric', metric);
                if (
                    window.initSelectedMetrics &&
                    (window.initSelectedMetrics.report == window.initCurrentReport || window.initSelectedMetrics.report == document.getElementById('selReport').value) &&
                    window.initSelectedMetrics.metrics.includes(metric)
                ) {
                    cb.setAttribute('checked', 'checked');
                }
                div.append(cb);
                let lbl = document.createElement('label');
                lbl.classList.add('form-check-label');
                // lbl.classList.add('p-1');
                lbl.setAttribute('for', 'cbMetrics_'+metric);
                lbl.innerHTML = this.metrics.metrics[metric].name;
                div.append(lbl);
                wrapper.append(div);
            });
        }
    }
}

export default Metric;
