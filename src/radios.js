import {SchemaFormField} from './field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="form-group">
    <label></label>
    <small class="form-text text-muted"></small>
    <div class="invalid-feedback"></div>
</div>
`;

const radioTemplate = document.createElement('template');
radioTemplate.innerHTML = `
<div class="radio">
    <label>
        <input type="radio">
        <span></span>
    </label>
</div>
`;

class SchemaFormRadios extends SchemaFormField {

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
                const radio = document.importNode(radioTemplate.content, true);
                radio.querySelector('span').innerHTML = map.name;
                const input = radio.querySelector('input');
                input.setAttribute('name', this.key);
                input.setAttribute('value', map.value);
                previous.after(radio);
                previous = previous.nextElementSibling;
            });
        }
    }

}

window.customElements.define('schema-form-radios', SchemaFormRadios);

