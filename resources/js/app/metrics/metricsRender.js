import TableHelper from "../helpers/tableHelper.js";

export default {
    clearMetrics() {
        let wrapper = document.getElementById('metricsWrapper');
        wrapper.innerText = '';
    },

    renderMetrics() {
        let wrapper = document.getElementById('metricsWrapper');
        let currentSection = null;
        for (let section in (this.metrics.sections ?? [])) {
            if (currentSection !== section) {
                if (currentSection) {
                    let br = document.createElement('div');
                    br.style = 'width: 100%;';
                    wrapper.append(br);
                }
                let div = document.createElement('div');
                div.classList.add('h5');
                div.classList.add('d-flex');
                div.innerHTML = this.metrics.sections[section].name;
                wrapper.append(div)
                let br = document.createElement('div');
                br.style = 'width: 100%;';
                wrapper.append(br);
                currentSection = section;
            }
            this.metrics.sections[section].metrics.forEach((metric) => {
                let div = document.createElement('div');
                div.classList.add('d-inline-flex');
                div.classList.add('pt-1');
                div.classList.add('pb-1');
                div.classList.add('form-check');
                div.classList.add('form-check-inline');
                let cb = document.createElement('input');
                cb.classList.add('form-check-input');
                // cb.classList.add('mt-2');
                cb.classList.add('me-1');
                cb.setAttribute('type', 'checkbox');
                cb.setAttribute('id', 'cbMetrics_'+metric);
                cb.setAttribute('value', metric);
                cb.setAttribute('cb-metric', metric);
                if (this.checked.includes(metric)) {
                    cb.setAttribute('checked', 'checked');
                }
                TableHelper.renderSort();
                div.append(cb);
                let lbl = document.createElement('label');
                lbl.classList.add('form-check-label');
                // lbl.classList.add('p-1');
                lbl.setAttribute('for', 'cbMetrics_'+metric);
                lbl.innerHTML = this.metrics.metrics[metric].name;
                div.append(lbl);
                wrapper.append(div);
            });
        }
    }
}
