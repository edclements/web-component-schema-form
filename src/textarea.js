import {SchemaFormField} from './field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="form-group">
    <label></label>
    <textarea class="form-control"></textarea>
    <small class="form-text text-muted"></small>
    <div class="invalid-feedback"></div>
</div>
`;

export class SchemaFormTextArea extends SchemaFormField {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
        this.textareaElement = this.querySelector('textarea');
        this.textareaElement.addEventListener('input', this.onChange.bind(this));
    }

    onChange(event) {
        this.value = event.target.value;
    }

    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
        if (this.key) {
            this.querySelector('label').setAttribute('for', this.key);
            this.textareaElement.id = this.key;
        }
    }

}

window.customElements.define('schema-form-textarea', SchemaFormTextArea);

