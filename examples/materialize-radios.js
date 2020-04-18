import {SchemaFormMaterializeField} from './materialize-field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="input-field">
    <label style="position: relative"></label>
    <span class="helper-text"></span>
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

class SchemaFormRadios extends SchemaFormMaterializeField {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
    }

    onChange(event) {
        this.value = event.target.value;
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
                input.addEventListener('change', this.onChange.bind(this));
                previous.after(radio);
                previous = previous.nextElementSibling;
            });
        }
    }

}

window.customElements.define('schema-form-materialize-radios', SchemaFormRadios);

