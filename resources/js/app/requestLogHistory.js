import moment from "moment";
import jsonPretty from "./helpers/jsonpretty.js";
import * as bootstrap from "bootstrap";

export default class RequestLogHistory {

    history = []

    constructor() {
    }
    generateId() {
        return new Date().getUTCMilliseconds()+Math.floor(Math.random()*100000000);
    }

    add(type, value) {
        let id = this.generateId();
        this.history.push({
            id: id,
            type: type,
            value: value,
            dt: moment().format('YYYY-MM-DD HH:mm:ss'),
        });
        this.clearOld();
        this.renderPanel();
        return id;
    }

    clearOld() {

    }

    show(id) {
        const log = this.history.find((item) => item.id === parseInt(id));
        if (log) {
            document.getElementById('dialogViewResponseTitle').innerHTML = 'View '+log.type+' Response ('+log.dt+')';
            let body = document.getElementById('dialogViewResponseBody');
            let code = document.getElementById('dialogViewResponseCode');
            let header = document.getElementById('dialogViewResponseHeader');

            code.innerHTML = jsonPretty.prettyPrint(log.value.status || 0);
            body.innerHTML = jsonPretty.prettyPrint(log.value.body || {});
            header.innerHTML = jsonPretty.prettyPrint(log.value.headers || {});

            document.getElementById('dialogViewResponseBodyCollapse').classList.add('show');
            document.getElementById('dialogViewResponseHeaderCollapse').classList.remove('show');
            bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogViewResponse')).show();
        }
    }

    renderPanel() {
        console.log("Render log panel");
    }
}
