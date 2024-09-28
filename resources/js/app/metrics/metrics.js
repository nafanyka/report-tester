import toastr from "toastr";
import metricsEvents from "./metricsEvents.js";
import metricsRender from "./metricsRender.js";

export default class Metrics {
    timeout = null;

    metrics = null;
    checked = null;

    constructor() {}

    init() {
        if (this.metrics) {
            this.renderMetrics();
        }
        this.events();
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
                metricsViewBtn.removeAttribute('data-history-log-id');
                this.clearMetrics();
            }
        });
        if (metricsResponse !== undefined) {
            this.metrics = {};
            let logId = window.requestLogHistory.add('Metrics', metricsResponse.data.data);
            metricsViewBtn.setAttribute('data-history-log-id', logId);
            if ((metricsResponse.data.success ?? false) && (metricsResponse.data.data.success ?? false)) {
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
                metricsViewBtn.removeAttribute('data-history-log-id');
                this.clearMetrics();
            }
        }
    }
}

Metrics.prototype.events = metricsEvents.events;
Metrics.prototype.clearMetrics = metricsRender.clearMetrics;
Metrics.prototype.renderMetrics = metricsRender.renderMetrics;
