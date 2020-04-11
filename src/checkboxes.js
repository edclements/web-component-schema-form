import {SchemaFormField} from './field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="form-group">
    <label></label>
    <small class="form-text text-muted"></small>
    <div class="invalid-feedback"></div>
</div>
`;

const checkboxTemplate = document.createElement('template');
checkboxTemplate.innerHTML = `
<div class="checkbox">
    <label>
        <input type="checkbox">
        <span></span>
    </label>
</div>
`;

class SchemaFormCheckboxes extends SchemaFormField {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
        this.selectElement = this.querySelector('select');
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
        if (this.options) {
            let previous = this.querySelector('label');
            this.options.forEach((map) => {
                const checkbox = document.importNode(checkboxTemplate.content, true);
                checkbox.name = this.key;
                checkbox.querySelector('span').innerHTML = map.name;
                previous.after(checkbox);
                previous = previous.nextElementSibling;
            });
        }
    }

}

window.customElements.define('schema-form-checkboxes', SchemaFormCheckboxes);

