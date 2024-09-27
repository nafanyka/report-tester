import jsonPretty from "../helpers/jsonpretty.js";
import ReportConfig from "../reportconfig.js";
import * as bootstrap from 'bootstrap';

export default {
    events() {
        document.getElementById('btnGetSlices').addEventListener('click', () => {
            this.getSlices();
        });

        document.getElementById('btnViewSlices').addEventListener('click', () => {
            if (this.sliceResponse !== null) {
                document.getElementById('dialogViewResponseTitle').innerHTML = 'View Slices Response';
                let body = document.getElementById('dialogViewResponseBody');
                let code = document.getElementById('dialogViewResponseCode');
                let header = document.getElementById('dialogViewResponseHeader');

                code.innerHTML = jsonPretty.prettyPrint(this.sliceResponse.status || 0);
                body.innerHTML = jsonPretty.prettyPrint(this.sliceResponse.body || {});
                header.innerHTML = jsonPretty.prettyPrint(this.sliceResponse.headers || {});

                document.getElementById('dialogViewResponseBodyCollapse').classList.add('show');
                document.getElementById('dialogViewResponseHeaderCollapse').classList.remove('show');
                bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogViewResponse')).show();
            }
        });

        document.getElementById('slicesWrapper').addEventListener('change', (event) => {
            let target = event.target;
            this.renderFilter(event.target.getAttribute('cb-slice'), event.target.checked);
            if (target.hasAttribute('cb-slice')) {
                let checked = [...document.querySelectorAll('#slicesWrapper input:checked')].map(e => e.getAttribute('cb-slice'));
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.checked = checked;
                this.timeout = setTimeout(() => {
                    ReportConfig.set(document.getElementById('selReport').value, 'selected_slices', 'default', checked);
                }, 1500);
            }
        });

        document.getElementById('filtersWrapperBody').addEventListener('click', (e) => {
            const button = e.target.closest('button[data-view-filter-response]');
            if (button) {
                let slice = button.getAttribute('data-slice');
                if (this.filterResponses[slice] || null) {
                    const sliceConfig = this.slices.find((element) => element.id === slice);
                    document.getElementById('dialogViewResponseTitle').innerHTML = 'View Filter Response for '+sliceConfig.name || slice;
                    let body = document.getElementById('dialogViewResponseBody');
                    let code = document.getElementById('dialogViewResponseCode');
                    let header = document.getElementById('dialogViewResponseHeader');

                    code.innerHTML = jsonPretty.prettyPrint(this.filterResponses[slice].status || 0);
                    body.innerHTML = jsonPretty.prettyPrint(this.filterResponses[slice].body || {});
                    header.innerHTML = jsonPretty.prettyPrint(this.filterResponses[slice].headers || {});

                    document.getElementById('dialogViewResponseBodyCollapse').classList.add('show');
                    document.getElementById('dialogViewResponseHeaderCollapse').classList.remove('show');
                    bootstrap.Modal.getOrCreateInstance(document.getElementById('dialogViewResponse')).show();
                }
            }
        }, { capture: true, passive: true });
    },
}
