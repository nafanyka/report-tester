import axios from "axios";
import apiUrls from "./apiUrls.js"

export default class CurrentState {
    static async get(key, defaultValue = null) {
        let result = defaultValue;
        return await axios.get(apiUrls.currentstate.get + '?key=' + key)
            .then(response => {if (response.data.success) {result = response.data.data; } return result; })
            .catch(() => { return defaultValue;});
    }

    static async set(key, value) {
        return await axios.post(apiUrls.currentstate.set, {data: [{key: key, value: value}]})
            .then(() => {})
            .catch(() => {});
    }
}
