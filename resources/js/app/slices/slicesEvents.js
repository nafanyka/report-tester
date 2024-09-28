import jsonPretty from "../helpers/jsonpretty.js";
import ReportConfig from "../reportconfig.js";
import * as bootstrap from 'bootstrap';

export default {
    events() {
        document.getElementById('btnGetSlices').addEventListener('click', () => {
            this.getSlices();
        });

        document.getElementById('btnViewSlices').addEventListener('click', (e) => {
            //TODO show
            if (this.sliceResponse !== null) {
                const button = e.target.closest('button#btnViewSlices');
                if (button) {
                    if (button.hasAttribute("data-history-log-id")) {
                        window.requestLogHistory.show(button.getAttribute("data-history-log-id"));
                    }
                }
            }
        }, { capture: true, passive: true });

        document.getElementById('slicesWrapper').addEventListener('change', (event) => {
            let target = event.target;
            this.renderFilter(event.target.getAttribute('cb-slice'), event.target.checked);
            if (target.hasAttribute('cb-slice')) {
                let checked = [...document.querySelectorAll('#slicesWrapper input:checked')].map(e => e.getAttribute('cb-slice'));
                if (window.slices.timeout) {
                    clearTimeout(window.slices.timeout);
                }
                this.checked = checked;
                window.slices.timeout = setTimeout(() => {
                    ReportConfig.set(document.getElementById('selReport').value, 'selected_slices', 'default', checked);
                }, 1500);
            }
        });

        document.getElementById('filtersWrapperBody').addEventListener('click', (e) => {
            const button = e.target.closest('button[data-view-filter-response]');
            if (button) {
                if (button.hasAttribute("data-history-log-id")) {
                    window.requestLogHistory.show(button.getAttribute("data-history-log-id"));
                }
            }
        }, { capture: true, passive: true });
    },
}
