import axios from "axios";
import apiUrls from "./apiUrls.js"
import Slices from "./slices/slices.js";
export default class Statistic {

    getConfigFormsData() {
        return {
            'env':              window.environment.current,
            'authToken':        document.getElementById('inputAuthToken').value,
            'report':           document.getElementById('selReport').value,
            'selReportFormat':  document.getElementById('selReportFormat').value,
        }
    }
    getMetricsFormsData() {
        let dataConfig = this.getConfigFormsData();
        return {...dataConfig};
    }

    getSlicesFormsData() {
        let dataConfig = this.getConfigFormsData();
        return {...dataConfig};
    }

    getFilterFormsData(slice, query) {
        let dataConfig = this.getConfigFormsData();
        dataConfig.slice = slice;
        dataConfig.q = query;
        dataConfig.slices = Slices.getSelectedSlices();
        dataConfig.filters = window.slices.filterValues;
        return {...dataConfig};
    }

    getCheckedMetricsFormsData() {
        return {metrics: [...document.querySelectorAll('#metricsWrapper input:checked')].map(e => e.getAttribute('cb-metric')) };
    }

    getCheckedSlicesFormsData() {
        return {slices: [...document.querySelectorAll('#slicesWrapper input:checked')].map(e => e.getAttribute('cb-slice')) };
    }

    getFiltersFormsData() {
        return {filters: window.slices.filterValues};
    }

    getReportFormData() {
        let dataConfig = this.getConfigFormsData();
        let dataMetrics = this.getCheckedMetricsFormsData();
        let dataSlices = this.getCheckedSlicesFormsData();
        let dataFilters = this.getFiltersFormsData();
        return {...dataConfig, ...dataMetrics, ...dataSlices, ...dataFilters};
    }

    async getMetrics() {
        return axios.post(apiUrls.statistic.metrics, this.getMetricsFormsData());
    }

    async getSlices() {
        return axios.post(apiUrls.statistic.slices, this.getSlicesFormsData());
    }

    async getFilterData(slice, query) {
        return await axios.post(apiUrls.statistic.filter, this.getFilterFormsData(slice, query));
    }

    async getReport() {
        return await axios.post(apiUrls.statistic.report, this.getReportFormData());
    }
}
