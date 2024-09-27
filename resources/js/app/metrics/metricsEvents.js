import jsonPretty from "../helpers/jsonpretty.js";
import * as bootstrap from "bootstrap";
import ReportConfig from "../reportconfig.js";

export default {
    events() {
        document.getElementById('btnGetMetrics').addEventListener('click', () => {
            this.getMetrics();
        });

        document.getElementById('btnViewMetrics').addEventListener('click', () => {
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
                this.checked = checked;
                this.timeout = setTimeout(() => {
                    ReportConfig.set(document.getElementById('selReport').value, 'selected_metrics', 'default', checked);
                }, 1500);
            }
        });
    }
}
