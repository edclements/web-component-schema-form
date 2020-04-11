const template = document.createElement('template');
template.innerHTML = `
<div class="form-group">
    <label></label>
    <small class="form-text text-muted"></small>
    <div class="invalid-feedback"></div>
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

class SchemaFormCheckboxes extends HTMLElement {

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
                previous.after(checkbox);
                previous = previous.nextElementSibling;
            });
        }
    }

    attributeChangedCallback() {
        if (this.querySelector('label') && this.title)
            this.querySelector('label').innerHTML = this.title;
        if (this.querySelector('small') && this.help)
            this.querySelector('small').innerHTML = this.help;
    }
}

window.customElements.define('schema-form-checkboxes', SchemaFormCheckboxes);

