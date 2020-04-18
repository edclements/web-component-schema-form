import {SchemaFormMaterializeField} from './materialize-field.js';

const template = document.createElement('template');
template.innerHTML = `
<div class="input-field">
    <textarea class="materialize-textarea"></textarea>
    <label></label>
    <span class="helper-text"></span>
</div>
`;

export class SchemaFormTextArea extends SchemaFormMaterializeField {

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

window.customElements.define('schema-form-materialize-textarea', SchemaFormTextArea);

