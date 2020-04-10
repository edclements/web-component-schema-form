
class SchemaFormSubmit extends HTMLElement {
  connectedCallback() {
    const template = document.getElementById('schema-form-submit');
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }
}
customElements.define('schema-form-submit', SchemaFormSubmit);

class SchemaFormField extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById('schema-form-field');
    const node = document.importNode(template.content, true);
    this.appendChild(node);
    this.inputElement = this.querySelector('input');
    this.inputElement.addEventListener('input', this.onInput.bind(this));
  }

  onInput(event) {
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

  attributeChangedCallback() {
    if (this.querySelector('label') && this.title)
      this.querySelector('label').innerHTML = this.title;
    if (this.querySelector('small') && this.description)
      this.querySelector('small').innerHTML = this.description;
    if (this.querySelector('input') && this.type)
      this.querySelector('input').setAttribute('type', this.type);
  }
}

customElements.define('schema-form-field', SchemaFormField);

class SchemaForm extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById('form-template');
    const node = document.importNode(template.content, true);
    this.appendChild(node);
    this.formElement = this.querySelector('form');
    this.formElement.addEventListener('submit', this.submit.bind(this));
    if (this.hasAttribute('schema')) {
      fetch(this.getAttribute('schema'))
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const keys = Object.keys(data.properties);
          keys.forEach((key) => {
            const properties = data.properties[key];
            this.addField(key, properties);
          });
        });
    }
  }

  addField(key, properties) {
    const formField = document.createElement('schema-form-field');
    formField.key = key;
    this.formElement.appendChild(formField);
    if (properties.type == 'string') {
      formField.setAttribute('title', properties.title || key);
      if (properties.description)
        formField.setAttribute('description', properties.description);
      formField.setAttribute('type', 'text');
    } else if (properties.type == 'integer') {
      formField.setAttribute('title', properties.title || key);
      if (properties.description)
        formField.setAttribute('description', properties.description);
      formField.setAttribute('type', 'number');
    }
  }

  get schema() {
    return this._schema;
  }

  set schema(value) {
    this._schema = value;
    this.clearForm();
    this.buildForm();
  }

  clearForm() {
    this.formElement.innerHTML = '';
  }

  buildForm() {
    const keys = Object.keys(this.schema.properties);
    keys.forEach((key) => {
      const properties = this.schema.properties[key];
      this.addField(key, properties);
    });
    this.addSubmit();
  }

  addSubmit() {
    const submit = document.createElement('schema-form-submit');
    this.formElement.appendChild(submit);
  }

  submit(event) {
    event.preventDefault();
    const model = {};
    const fields = this.formElement.querySelectorAll('schema-form-field');
    fields.forEach((element) => {
      const input = element.querySelector('input');
      if (input.value == '') {
        delete model[element.key];
      } else {
        model[element.key] = input.value;
      }
    });
    const ajv = new Ajv();
    const valid = ajv.validate(this.schema, model);
    if (!valid) {
      ajv.errors.forEach((error) => {
        let key;
        if (error.keyword == 'required') {
          key = error.params.missingProperty;
        } else {
          key = error.dataPath.match(/\.(.*)/)[1];
        }
        fields.forEach((element) => {
          if (element.key == key) {
            const input = element.querySelector('input');
            input.classList.add('is-invalid');
            const invalidFeedback = element.querySelector('.invalid-feedback');
            if (error.keyword == 'required') {
              invalidFeedback.innerHTML = 'required';
            } else {
              invalidFeedback.innerHTML = error.message;
            }
          }
        });
      });
    }
  }

}

customElements.define('schema-form', SchemaForm);

