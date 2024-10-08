import ReportEvents from "./ReportEvents.js";
import ReportRender from "./ReportRender.js";
import toastr from "toastr";
//
import {TabulatorFull as Tabulator} from 'tabulator-tables';

export default class Report {

    reportData = {};
    gridTable;

    init() {
        this.events();
        this.gridTable = new Tabulator("#reportGridTable", {
            columns: [],
            data: [],
            layout: "fitDataFill",
            placeholder:"No Data Available",
            dataLoader: true,
        });
    }

    async runReport() {
        let viewBtn = document.getElementById('btnViewRunReport');
        let reportResponse = await window.statistic.getReport().catch((error) => {
            let allErrors = error.response.data.errors;
            let errors = [];
            for (let key in allErrors) {
                errors = [...errors, ...allErrors[key]];
            }
            if (errors.length > 0) {
                toastr.error(errors.join('<br>'),"Report request error");
                this.reportData = {};
                viewBtn.classList.remove('btn-secondary');
                viewBtn.classList.remove('btn-success');
                viewBtn.classList.add('btn-danger');
                viewBtn.removeAttribute('data-history-log-id');
                this.clearTable();
            }
        });
        window.Report.gridTable.dataLoader.clearAlert();
        if (reportResponse !== undefined) {
            this.reportData = {};
            let logId = window.requestLogHistory.add('Report', reportResponse.data.data);
            viewBtn.setAttribute('data-history-log-id', logId);
            if ((reportResponse.data.success ?? false) && (reportResponse.data.data.success ?? false)) {
                viewBtn.classList.remove('btn-secondary');
                viewBtn.classList.remove('btn-danger');
                viewBtn.classList.add('btn-success');
                this.reportData = reportResponse.data.data.body;
                this.clearTable();
                this.renderTable();
            } else {
                viewBtn.classList.remove('btn-secondary');
                viewBtn.classList.remove('btn-success');
                viewBtn.classList.add('btn-danger');
                viewBtn.removeAttribute('data-history-log-id');
                this.clearTable();
            }
        }
    }

}
Report.prototype.events = ReportEvents.events;
Report.prototype.clearTable = ReportRender.clearTable;
Report.prototype.renderTable = ReportRender.renderTable;
