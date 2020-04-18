import {SchemaFormField} from './field.js';

export class SchemaFormHelp extends SchemaFormField {

    connectedCallback() {
        const node = document.createElement('div');
        this.appendChild(node);
    }

}

window.customElements.define('schema-form-help', SchemaFormHelp);

