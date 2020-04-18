import {SchemaFormField} from '../src/field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="input-field">
    <input type="text">
    <label></label>
    <span class="helper-text"></span>
</div>
`;

export class SchemaFormMaterializeField extends SchemaFormField {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
        this.inputElement = this.querySelector('input');
        this.inputElement.addEventListener('input', this.onInput.bind(this));
    }

    onInput() {
        this.querySelector('.helper-text').removeAttribute('data-error');
        this.inputElement.classList.remove('invalid');
        this.value = this.inputElement.value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    static get observedAttributes() {
        return ['title', 'help', 'type'];
    }

    get title() {
        return this.getAttribute('title');
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get help() {
        return this.getAttribute('help');
    }

    set help(value) {
        this.setAttribute('help', value);
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
        if (this.key) {
            if (this.querySelector('label'))
                this.querySelector('label').setAttribute('for', this.key);
            if (this.querySelector('input'))
                this.querySelector('input').id = this.key;
        }
    }

    get error() {
        return this._error;
    }

    set error(value) {
        this._error = value;
        this.inputElement.classList.add('invalid');
        if (this.error.keyword == 'required') {
            this.querySelector('.helper-text').setAttribute('data-error', 'required');
        } else {
            this.querySelector('.helper-text').setAttribute('data-error', this.error.message);
        }
    }

    attributeChangedCallback() {
        if (this.querySelector('label') && this.title)
            this.querySelector('label').innerHTML = this.title;
        if (this.querySelector('small') && this.help)
            this.querySelector('small').innerHTML = this.help;
        if (this.querySelector('input') && this.type)
            this.querySelector('input').setAttribute('type', this.type);
    }
}

window.customElements.define('schema-form-materialize-field', SchemaFormMaterializeField);

