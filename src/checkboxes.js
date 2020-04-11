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
    let previous = this.querySelector('label');
    this.enum.forEach((optionKey) => {
      const checkbox = document.importNode(checkboxTemplate.content, true);
      checkbox.name = this.key;
      checkbox.querySelector('span').innerHTML = optionKey;
      previous.after(checkbox);
      previous = previous.nextElementSibling;
    });
  }

  attributeChangedCallback() {
    if (this.querySelector('label') && this.title)
      this.querySelector('label').innerHTML = this.title;
    if (this.querySelector('small') && this.description)
      this.querySelector('small').innerHTML = this.description;
  }
}

window.customElements.define('schema-form-checkboxes', SchemaFormCheckboxes);

