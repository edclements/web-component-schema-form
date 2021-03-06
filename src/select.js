import {SchemaFormField} from './field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="form-group">
    <label></label>
    <select type="text" class="form-control"></select>
    <small class="form-text text-muted"></small>
    <div class="invalid-feedback"></div>
</div>
`;

export class SchemaFormSelectField extends SchemaFormField {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
        this.selectElement = this.querySelector('select');
        this.selectElement.addEventListener('change', this.onChange.bind(this));
    }

    onChange(event) {
        this.value = event.target.value;
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
        if (this.options && this.options.forEach) {
            this.options.forEach((map) => {
                const option = document.createElement('option');
                option.innerHTML = map.name;
                option.setAttribute('value', map.value);
                this.selectElement.appendChild(option);
            });
        }
    }

}

window.customElements.define('schema-form-select-field', SchemaFormSelectField);

