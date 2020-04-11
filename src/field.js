const template = document.createElement('template');
template.innerHTML = `
<div class="form-group">
    <label></label>
    <input type="text" class="form-control">
    <small class="form-text text-muted"></small>
    <div class="invalid-feedback"></div>
</div>
`;

export class SchemaFormField extends HTMLElement {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
        this.inputElement = this.querySelector('input');
        this.inputElement.addEventListener('input', this.onInput.bind(this));
    }

    onInput() {
        this.querySelector('.invalid-feedback').innerHTML = '';
        this.inputElement.classList.remove('is-invalid');
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

window.customElements.define('schema-form-field', SchemaFormField);

