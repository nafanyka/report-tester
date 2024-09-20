import axios from "axios";
import apiUrls from "./apiUrls.js"
import {Exception} from "sass";
import currentstate from "./currentstate.js";

export class Environment {
    items = {};
    current;

    constructor() {
        this.init();
    }

    init() {
        currentstate.get('currentEnv', Object.keys(this.items)[0])
            .then(response => {this.current = response; this.fetchItems();});
        currentstate.get('authToken')
            .then(value => { document.getElementById('inputAuthToken').value = value; });
    }

    render() {
        let envList = document.getElementById('widgetEnvList');
        envList.innerHTML = '';
        Object.keys(this.items).forEach((name) => {
            let li = document.createElement('li');
            let link = document.createElement('a');
            link.innerText = this.items[name]['description'];
            link.className = 'dropdown-item';
            link.setAttribute('href', '#');
            link.setAttribute('data-env-name', name);
            link.setAttribute('data-env-element', true);
            li.appendChild(link);
            envList.appendChild(li);
        });
        this.setCurrent(this.current);
    }

    setCurrent(current) {
        if (this.items[current] === undefined) {
            this.current = Object.keys(this.items)[0];
        } else {
            this.current = current;
        }
        currentstate.set('currentEnv', this.current);
        let envButton = document.getElementById('widgetEnvCurrent');
        envButton.innerText = this.items[this.current]['description'];
        if (this.items[this.current]['is_blocked']) {
            document.getElementById('widgetEnvBtnEdit').classList.add('disabled');
            document.getElementById('widgetEnvBtnDelete').classList.add('disabled');
        } else {
            document.getElementById('widgetEnvBtnEdit').classList.remove('disabled');
            document.getElementById('widgetEnvBtnDelete').classList.remove('disabled');
        }
    }

    fetchItems() {
        axios.get(apiUrls.env)
            .then(response => {
                this.items = response.data.data;
                this.render();
                return true
            })
            .catch(error => {
                console.log("err");
                console.log(error);
                return false
            });
    }
    async storeItem(data) {
        return await axios.post(apiUrls.env, data)
            .then(response => {
                return {success: true, message: ''};
            })
            .catch(error => {
                return {success: false, errors: error.response.data.errors || []};
            });
    }
    async updateItem(data) {
        return await axios.put(apiUrls.env + data.old_name, data)
            .then(response => {
                return {success: true, message: ''};
            })
            .catch(error => {
                return {success: false, errors: error.response.data.errors || []};
            });
    }
    async destroyItem(name) {
        return await axios.delete(apiUrls.env + name)
            .then(response => {
                return {success: true, message: ''};
            })
            .catch(error => {
                return {success: false, errors: error.response.data.errors || []};
            });
    }


}


export default Environment;
