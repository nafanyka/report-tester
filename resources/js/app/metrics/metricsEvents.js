import jsonPretty from "../helpers/jsonpretty.js";
import * as bootstrap from "bootstrap";
import ReportConfig from "../reportconfig.js";
import TableHelper from "@/app/helpers/tableHelper.js";

export default {
    events() {
        document.getElementById('btnGetMetrics').addEventListener('click', () => {
            this.getMetrics();
        });

        document.getElementById('btnViewMetrics').addEventListener('click', (e) => {
            const button = e.target.closest('button#btnViewMetrics');
            if (button) {
                if (button.hasAttribute("data-history-log-id")) {
                    window.requestLogHistory.show(button.getAttribute("data-history-log-id"));
                }
            }
        }, { capture: true, passive: true });

        document.getElementById('metricsWrapper').addEventListener('change', (event) => {
            let target = event.target;
            if (target.hasAttribute('cb-metric')) {
                let checked = [...document.querySelectorAll('#metricsWrapper input:checked')].map(e => e.getAttribute('cb-metric'));
                if (window.metrics.timeout) {
                    clearTimeout(window.metrics.timeout);
                }
                TableHelper.renderSort();
                this.checked = checked;
                window.metrics.timeout = setTimeout(() => {
                    ReportConfig.set(document.getElementById('selReport').value, 'selected_metrics', 'default', checked);
                }, 1500);
            }
        });
    }
}
