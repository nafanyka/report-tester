import Environment from "./environment.js"
import EnvironmentDialogs from "./environmentDialogs.js"
import TomSelect from "tom-select";
import apiUrls from "./apiUrls.js";
import currentstate from "@/app/currentstate.js";

document.addEventListener('DOMContentLoaded', function(){
    const environment = new Environment();

    EnvironmentDialogs.events(environment);

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



});
