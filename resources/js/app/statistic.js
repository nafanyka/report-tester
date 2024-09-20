import axios from "axios";
import apiUrls from "./apiUrls.js"
export class Statistic {

    constructor() {

    }

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

    async getMetrics() {
        return axios.post(apiUrls.statistic.metrics, this.getMetricsFormsData());
    }
}

export default Statistic;
