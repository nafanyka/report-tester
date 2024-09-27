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
        dataConfig.filters = Slices.getFilterValues();
        return {...dataConfig};
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
}
