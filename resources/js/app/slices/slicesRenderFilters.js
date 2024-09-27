import moment from "moment";
import TomSelect from "tom-select";

export default {
    renderFilter(slice, enable = false) {
        if (enable) {
            const sliceConfig = this.slices.find((element) => element.id === slice);
            if (sliceConfig === undefined) return;
            let wrapper = document.getElementById('filtersWrapper');
            let div = document.createElement('div');
            div.className = 'd-inline-flex pt-1 pb-1 ps-0 me-4';
            div.setAttribute('id', 'sliceFilterWrapper_'+slice);
            let lbl = document.createElement('label');
            lbl.className = 'form-check-label me-1 mt-1 text-nowrap';
            lbl.setAttribute('for', 'sliceFilter_'+slice);
            lbl.innerHTML = sliceConfig.name;
            div.append(lbl);
            //
            if (slice === 'date') {
                div.innerHTML = div.innerHTML + '<input type="hidden" value="" data-filter="date_from" id="filter_date_from"><input type="hidden" value="" data-filter="date_to" id="filter_date_to">';
                div.innerHTML = div.innerHTML + '<input type="text" class="flatpickr flatpickr-input input-control-sm" id="sliceFilter_'+slice+'">';
                wrapper.appendChild(div);

                flatpickr('#sliceFilter_'+slice, {
                    mode: "range",
                    ariaDateFormat: "Y-m-d",
                    dateFormat: "Y-m-d",
                    defaultDate: [
                        moment().format('YYYY-MM-DD'),
                        moment().format('YYYY-MM-DD'),
                    ],
                    onChange: function (dates) {
                        if (dates.length === 2) {
                            document.getElementById('filter_date_from').value = moment(dates[0]).format('YYYY-MM-DD')
                            document.getElementById('filter_date_to').value = moment(dates[1]).format('YYYY-MM-DD');
                        }
                    },
                    onReady: function (dates) {
                        document.getElementById('filter_date_from').value = moment(dates[0]).format('YYYY-MM-DD')
                        document.getElementById('filter_date_to').value = moment(dates[1]).format('YYYY-MM-DD');
                    },
                });
            } else {
                let inp = '<div class="input-group input-group-sm">'
                    +'<input type="text" id="sliceFilter_'+slice+'" multiple>'
                    +'<button type="button" id="sliceFilterViewResp_'+slice+'" data-view-filter-response="true" data-slice="'+slice+'" class="btn btn-secondary">'+feather.icons.eye.toSvg()+'</button>'
                    +'</div>';
                div.innerHTML = div.innerHTML + inp;
                wrapper.append(div);

                new TomSelect('#sliceFilter_'+slice,{
                    create: false,
                    valueField: 'id',
                    labelField: 'name',
                    searchField: ['name', 'id'],
                    preload: 'focus',
                    plugins: ['input_autogrow', 'remove_button'],
                    onChange: function(option) {
                        //TODO save filter values
                    },
                    onBlur: function() {
                        this.clearOptions();
                        this.load();
                    },
                    load: function (query, callback) {
                        window.statistic.getFilterData(slice, query).
                        then(response => {
                            window.slices.filterResponses[slice] = response.data.data;
                            const json = response.data.data;
                            let respViewBtn = document.getElementById('sliceFilterViewResp_'+slice);
                            if (json.body.success) {
                                respViewBtn.classList.add('btn-secondary');
                                respViewBtn.classList.add('btn-success');
                                respViewBtn.classList.remove('btn-danger');
                                callback(json.body.data || []);
                            } else {
                                respViewBtn.classList.remove('btn-secondary');
                                respViewBtn.classList.remove('btn-success');
                                respViewBtn.classList.add('btn-danger');
                                callback([]);
                            }
                        }).
                        catch(error => {
                            console.error(error);
                            let respViewBtn = document.getElementById('sliceFilterViewResp_'+slice);
                            respViewBtn.classList.remove('btn-secondary');
                            respViewBtn.classList.remove('btn-success');
                            respViewBtn.classList.add('btn-danger');
                            callback();
                            window.slices.filterResponses[slice] = null;
                        });
                    },
                });
            }
        } else {
            let e = document.getElementById('sliceFilterWrapper_'+slice);
            if (e) {
                e.parentNode.removeChild(e);
            }
        }
    }
}
