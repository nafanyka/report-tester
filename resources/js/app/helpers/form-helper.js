export default class FormHelper {
    constructor(formId) {
        this.formId = formId;
        this.form = document.getElementById(formId);
    }

    getData() {
        let data = {};
        document.querySelectorAll('#' + this.formId + ' input[name]').forEach(input => {
            data[input.name] = input.value;
        });
        document.querySelectorAll('#' + this.formId + ' select[name]').forEach(input => {
            data[input.name] = input.value;
        });
        document.querySelectorAll('#' + this.formId + ' textarea[name]').forEach(input => {
            data[input.name] = input.value;
        });
        return data;
    }

    resetValidation() {
        document.querySelectorAll('#' + this.formId + ' .invalid-feedback').forEach(error => {
            error.setAttribute('hidden', 'hidden');
            error.innerHTML = '';
        });
        document.querySelectorAll('#' + this.formId + ' .is-invalid').forEach(error => {
            error.classList.remove('is-invalid');
        });
    }

    renderValidation(errors) {
        this.resetValidation();
        this.form.setAttribute('novalidate', 'novalidate');
        for (let name in errors ) {
            let element = document.querySelector('#' + this.formId + ' [name='+name+']');
            element.className += ' is-invalid';
            //
            let elementError = document.getElementById(this.formId + '_' + name + '_error');
            if (elementError) {
                elementError.removeAttribute('hidden');
                elementError.innerHTML = errors[name].join('<br>');
            }
        }
    }
}
