import axios from "axios";
import apiUrls from "./apiUrls.js"

export class CurrentState {
    static async get(key, defaultValue = null) {
        let result = defaultValue;
        return await axios.get(apiUrls.currentstate.get + '?key=' + key)
            .then(response => {if (response.data.success) {result = response.data.data; }; return result; })
            .catch(error => { return defaultValue;});
    }

    static set(key, value) {
        axios.post(apiUrls.currentstate.set, {data: [{key: key, value: value}]})
            .then(response => {})
            .catch(error => {});
    }
}

export default CurrentState;
