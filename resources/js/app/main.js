import Environment from "./environment.js"
import EnvironmentDialogs from "./environmentDialogs.js"
import TomSelect from "tom-select";
import apiUrls from "./apiUrls.js";
import currentstate from "./currentstate.js";
import Metric from "./metric.js";
import {Statistic} from "./statistic.js";

document.addEventListener('DOMContentLoaded', function(){
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

    window.environment = new Environment();
    window.statistic = new Statistic();
    window.metric = new Metric();

    EnvironmentDialogs.events();

    new TomSelect("#selReport",{
        create: true,
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        onLoad: function(){
            if (this.getValue() == '') {
                currentstate.get('currentReport', false)
                    .then(result => {if(result) {this.setValue(result);}});
            }
        },
        preload: true,
        onChange: function(option) { this.blur(); currentstate.set('currentReport', option); },
        onOptionAdd: function(option) { axios.post(apiUrls.reports.add, {option: option}); },
        load: function (query, callback) {
            fetch(apiUrls.reports.search + '?q=' + encodeURIComponent(query))
                .then(response => response.json())
                .then(json => { callback(json.data)})
                .catch(error => {callback();});
        }
    });

    new TomSelect('#selReportFormat', {
        create: false,
        onInitialize: function(){
            currentstate.get('currentReportFormat', false)
                .then(result => {if(result) {this.setValue(result);}});
        },
        onChange: function(option) { this.blur(); currentstate.set('currentReportFormat', option); },
    });



});
