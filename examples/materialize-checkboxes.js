import {SchemaFormMaterializeField} from './materialize-field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="input-field">
    <label style="position: relative"></label>
    <span class="helper-text"></span>
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

class SchemaFormCheckboxes extends SchemaFormMaterializeField {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
    }

    onChange() {
        const inputs = this.querySelectorAll('input');
        this.value = [];
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) this.value.push(inputs[i].value);
        }
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
                const input = checkbox.querySelector('input');
                input.setAttribute('name', this.key);
                input.setAttribute('value', map.value);
                input.addEventListener('change', this.onChange.bind(this));
                previous.after(checkbox);
                previous = previous.nextElementSibling;
            });
        }
    }

}

window.customElements.define('schema-form-materialize-checkboxes', SchemaFormCheckboxes);

