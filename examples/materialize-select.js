import {SchemaFormMaterializeField} from './materialize-field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="input-field">
    <select></select>
    <label></label>
    <span class="helper-text"></span>
</div>
`;

export class SchemaFormSelectField extends SchemaFormMaterializeField {

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

window.customElements.define('schema-form-materialize-select-field', SchemaFormSelectField);

