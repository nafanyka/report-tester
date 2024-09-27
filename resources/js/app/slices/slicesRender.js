export default {
    clearSlices() {
        let wrapper = document.getElementById('slicesWrapper');
        wrapper.innerText = '';

        let filterWrapper = document.getElementById('filtersWrapper');
        filterWrapper.innerText = '';
    },

    renderSlices() {
        let wrapper = document.getElementById('slicesWrapper');

        this.slices.forEach((slice) => {
            let div = document.createElement('div');
            div.classList.add('d-inline-flex');
            div.classList.add('pt-1');
            div.classList.add('pb-1');
            div.classList.add('ps-0');
            div.classList.add('me-2');
            div.classList.add('form-check');
            div.classList.add('form-check-inline');
            let cb = document.createElement('input');
            cb.classList.add('btn-check');
            cb.setAttribute('type', 'checkbox');
            cb.setAttribute('value', slice.id);
            cb.setAttribute('id', 'cbSlice_'+slice.id);
            cb.setAttribute('cb-slice', slice.id);
            let lbl = document.createElement('label');
            lbl.classList.add('btn');
            //
            if (this.checked.includes(slice.id)) {
                cb.setAttribute('checked', 'checked');
                this.renderFilter(slice.id, true);
            } else {
                this.renderFilter(slice.id, false);
            }
            //
            if ((slice.is_visible ?? false)) {
                lbl.classList.add('btn-outline-primary');
            } else {
                lbl.classList.add('btn-outline-secondary');
            }
            lbl.setAttribute('for', 'cbSlice_'+slice.id);
            lbl.innerHTML = slice.name;
            div.append(cb);
            div.append(lbl);
            wrapper.append(div);
        });
    }
}
