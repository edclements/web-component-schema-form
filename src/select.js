const template = document.createElement('template');
template.innerHTML = `
<div class="form-group">
    <label></label>
    <select type="text" class="form-control"></select>
    <small class="form-text text-muted"></small>
    <div class="invalid-feedback"></div>
</div>
`;

class SchemaFormSelectField extends HTMLElement {

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
        this.selectElement = this.querySelector('select');
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

    get description() {
        return this.getAttribute('description');
    }

    set description(value) {
        this.setAttribute('description', value);
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

    get enum() {
        return this._enum;
    }

    set enum(value) {
        this._enum = value;
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
        if (this.options) {
            this.options.forEach((map) => {
                const option = document.createElement('option');
                option.innerHTML = map.name;
                this.selectElement.appendChild(option);
            });
        }
    }

    attributeChangedCallback() {
        if (this.querySelector('label') && this.title)
            this.querySelector('label').innerHTML = this.title;
        if (this.querySelector('small') && this.description)
            this.querySelector('small').innerHTML = this.description;
    }
}

window.customElements.define('schema-form-select-field', SchemaFormSelectField);

