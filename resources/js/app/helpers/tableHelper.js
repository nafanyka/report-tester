
export default class TableHelper {

    static sortTimeout = null;

    static clearTable(table) {
        console.log('clearTable()');
        table.clearData();
        table.setColumns([]);
        table.setData([]);
        table.redraw(true);
        document.getElementById('totalRows').innerHTML = '0';
    }

    static renderTable(table, data) {
        table.clearData();
        console.log('renderTable()');
        console.log(data);
        const columns = TableHelper.prepareColumns(data);
        if (columns.length > 0) {
            table.setColumns(columns);
            table.addData(data.data);
            table.redraw(true);
        } else {
            table.clearData();
        }
    }

    static prepareColumns(data) {
        const columns = [];
        document.getElementById('totalRows').innerHTML = data.totals.total_rows ?? 0;
        let perPage = document.getElementById('selPerpage').value;
        document.getElementById('inpPageTotal').value = Math.ceil((data.totals.total_rows ?? 0) / perPage);
        //
        const responseColumns = Object.getOwnPropertyNames(data.totals);
        responseColumns.forEach((column) => {
            if (column === 'total_rows') {
                return;
            }
            let slice = window.slices.slices.find((item) => {return item.id === column;});
            if (slice) {
                //SLICES
                columns.push({
                    title: slice.name,
                    field: column,
                    formatter: TableHelper.sliceFormatter,
                    headerSort: false,
                    // frozen: true,
                });
            } else if (window.metrics.metrics.metrics[column] !== undefined) {
                //METRICS
                let formatter;
                switch (window.metrics.metrics.metrics[column].type) {
                    case 'currency':
                    case 'float':
                        formatter = TableHelper.floatFormatter;
                        break;
                    case 'int':
                        formatter = TableHelper.intFormatter;
                        break;
                    case 'percent':
                        formatter = TableHelper.percentFormatter;
                        break;
                    default:
                        formatter = TableHelper.rawFormatter;
                }
                columns.push({
                    title: window.metrics.metrics.metrics[column].name,
                    field: column,
                    formatter: formatter,
                    headerSort: false,
                    hozAlign: 'right',
                    bottomCalc: function (a, b, c){return TableHelper.getTotalValue(c,data.totals ?? {})},
                    bottomCalcParams: {column: column},
                    bottomCalcFormatter: formatter,
                });
            } else {
                columns.push({title: "Unknown col: " + column, field: column});
            }
        });
        return columns;
    }

    static getTotalValue(params, totals) {
        return totals[params.column] ?? '';
    }

    static sliceFormatter(cell) {
        let value = cell.getValue();
        return /*value.id + "#" + */value.name;
    }

    static intFormatter(cell) {
        try {
            return parseInt(cell.getValue()).toLocaleString('en-US');
        } catch (e) {
            return '###';
        }
    }

    static floatFormatter(cell) {
        try {
            return parseFloat(cell.getValue()).toFixed(2).toLocaleString('en-US');
        } catch (e) {
            return '#.##';
        }
    }
    static percentFormatter(cell) {
        try {
            return parseFloat(cell.getValue()).toFixed(2).toLocaleString('en-US')+"%";
        } catch (e) {
            return '#.##%';
        }
    }
    static rawFormatter(cell) {
        try {
            return cell.getValue();
        } catch (e) {
            return '___';
        }
    }

    static renderSort() {
        if (TableHelper.sortTimeout) {
            clearTimeout(TableHelper.sortTimeout);
        }

        TableHelper.sortTimeout = setTimeout(function () {
            let select = document.getElementById('selSortField');
            let selected = select.value;
            [...select.querySelectorAll('[data-dynamic-option]')].map((i) => {i.remove();});
            window.slices.checked.forEach((sliceId) => {
                let slice = window.slices.slices.find((i) => i.id === sliceId);
                if (slice) {
                    let option = document.createElement('option');
                    option.text = slice.name;
                    option.value = slice.id;
                    option.selected = slice.id === selected;
                    option.setAttribute('data-dynamic-option', 'true');
                    select.appendChild(option);
                }
            });
            let option = document.createElement('option');
            option.text = '---------------';
            option.setAttribute('data-dynamic-option', 'true');
            option.setAttribute('disabled', 'disabled');
            select.appendChild(option);
            window.metrics.checked.forEach((metricId) => {
                let metric = window.metrics.metrics.metrics[metricId];
                if (metric) {
                    let option = document.createElement('option');
                    option.text = metric.name;
                    option.value = metricId;
                    option.selected = metricId === selected;
                    option.setAttribute('data-dynamic-option', 'true');
                    select.appendChild(option);
                }
            });
        }, 500);
    }


}
