import Environment from "./environment.js"
import EnvironmentDialogs from "./environmentDialogs.js"
import TomSelect from "tom-select";
import apiUrls from "./apiUrls.js";
import currentstate from "./currentstate.js";
import Metrics from "./metrics/metrics.js";
import Slices from "./slices/slices.js";
import Statistic from "./statistic.js";
import ReportConfig from "./reportconfig.js";
import RequestLogHistory from "./requestLogHistory.js"
import CollapseHelper from "./helpers/collapseHelper.js"
import Report from "./report/Report.js";

window.environment = new Environment();
window.statistic = new Statistic();
window.metrics = new Metrics();
window.slices = new Slices();
window.requestLogHistory = new RequestLogHistory();
window.Report = new Report();

document.addEventListener('DOMContentLoaded', function(){
    window.environment.init();
    window.metrics.init();
    window.slices.init();
    window.Report.init();
    EnvironmentDialogs.events();
    CollapseHelper();
    //
    window.axios.interceptors.request.use(function (config) {
        document.getElementById('globalLoader').removeAttribute('hidden');
        return config
    }, function (error) {
        return Promise.reject(error);
    });

    window.axios.interceptors.response.use(function (response) {
        document.getElementById('globalLoader').setAttribute('hidden', 'hidden');
        return response;
    }, function (error) {
        return Promise.reject(error);
    });


    new TomSelect("#selReport",{
        create: true,
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        onLoad: function(){
            if (this.getValue() === '') {
                currentstate.get('currentReport', false)
                    .then(result => {if(result) {this.setValue(result);}});
            }
        },
        // preload: true,
        plugins: ['input_autogrow'],
        onChange: function(option) {
            this.blur();
            currentstate.set('currentReport', option);
            Promise.all([
                ReportConfig.get(option, 'metrics', 'default', {})
                    .then(result => {window.metrics.metrics = result})
                    .catch(() => {window.metrics.metrics = {};}),
                ReportConfig.get(option, 'selected_metrics', 'default', [])
                    .then(result => {window.metrics.checked = result})
                    .catch(() => {window.metrics.checked = []})
            ]).then(() => {
                metrics.clearMetrics();
                metrics.renderMetrics();
            });
            Promise.all([
                ReportConfig.get(option, 'slices', 'default', [])
                    .then(result => {window.slices.slices = result})
                    .catch(() => {window.slices.slices = [];}),
                ReportConfig.get(option, 'selected_slices', 'default', [])
                    .then(result => {window.slices.checked = result})
                    .catch(() => {window.slices.checked = [];}),
                ReportConfig.get(option, 'filter_values', 'default', {})
                    .then(result => {window.slices.filterValues = result})
                    .catch(() => {window.slices.filterValues = [];})
            ]).then(() => {
                slices.clearSlices();
                slices.renderSlices();
            });
        },
        onOptionAdd: function(option) { axios.post(apiUrls.reports.add, {option: option}); },
        load: function (query, callback) {
            fetch(apiUrls.reports.search + '?q=' + encodeURIComponent(query))
                .then(response => response.json())
                .then(json => { callback(json.data)})
                .catch(() => {callback();});
        }
    });

    new TomSelect('#selReportFormat', {
        create: false,
        plugins: ['input_autogrow'],
        onChange: function(option) { this.blur(); currentstate.set('currentReportFormat', option); },
    });



});
