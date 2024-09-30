import TableHelper from "..//helpers/tableHelper.js";
export default {

    clearTable() {
        TableHelper.clearTable(this.gridTable);
    },

    renderTable() {
        TableHelper.renderTable(this.gridTable, this.reportData);
    }

}
