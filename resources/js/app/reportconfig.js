import axios from "axios";
import apiUrls from "./apiUrls.js"

export default class ReportConfig {
    static async get(report, type, instance, defaultValue = null) {
        let result = defaultValue;
        return await axios.get(apiUrls.reportConfig + '/' + report + '/' + instance + '/' + type)
            .then(response => {if (response.data.success) {result = response.data.data; } return result; })
            .catch(() => { return defaultValue;});
    }

    static async set(report, type, instance, value) {
        return await axios.post(apiUrls.reportConfig + '/' + report + '/' + instance + '/' + type, {value: value})
            .then(() => {})
            .catch(() => {});
    }
}
