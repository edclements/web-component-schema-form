import {SchemaFormField} from './field.js';

const template = document.createElement('template');
template.innerHTML = `
<fieldset class="form-group">
    <legend></legend>
</fieldset>
`;

class SchemaFormFieldset extends SchemaFormField {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
    }

    onChange(event) {
        this.value = event.target.value;
    }

    attributeChangedCallback() {
        if (this.querySelector('legend') && this.title)
            this.querySelector('legend').innerHTML = this.title;
    }

}

window.customElements.define('schema-form-fieldset', SchemaFormFieldset);

