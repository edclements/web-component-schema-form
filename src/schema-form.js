import './field.js';
import './select.js';
import './checkboxes.js';
import './submit.js';

const template = document.createElement('template');
template.innerHTML = `
<form></form>
`;

export class SchemaForm extends HTMLElement {

  connectedCallback() {
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
    const fieldProperties = {
      key: key,
      title: properties.title || key,
      description: properties.description,
      titleMap: properties.titleMap
    };
    const schemaToFormType = {
      string: 'text',
      integer: 'number'
    }
    const schemaToFormElement = {
      'string': 'schema-form-field',
      'integer': 'schema-form-field',
      'array-with-enum': 'schema-form-checkboxes',
      'enum': 'schema-form-select-field'
    }
    fieldProperties.element = schemaToFormElement[properties.type];
    if (properties.type == 'array' && properties.items.enum) {
      fieldProperties.element = schemaToFormElement['array-with-enum'];
      fieldProperties.enum = properties.items.enum;
      fieldProperties.type = schemaToFormType[properties.items.type];
    } else if (properties.enum) {
      fieldProperties.element = schemaToFormElement['enum'];
      fieldProperties.enum = properties.enum;
    }
    fieldProperties.type = schemaToFormType[properties.type];
    this.addFieldElement(fieldProperties);
  }

  enumToTitleMap(fieldEnum) {
    return fieldEnum.map(key => ({name: key, value: key}));
  }

  addFieldElement(fieldProperties) {
    const formField = document.createElement(fieldProperties.element);
    this.formElement.appendChild(formField);
    formField.key = fieldProperties.key;
    formField.setAttribute('title', fieldProperties.title);
    if (fieldProperties.description)
      formField.setAttribute('description', fieldProperties.description);
    formField.setAttribute('type', fieldProperties.type);
    if (fieldProperties.titleMap) {
      formField.options = fieldProperties.titleMap;
    } else if (fieldProperties.enum) {
      formField.options = this.enumToTitleMap(fieldProperties.enum);
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
    const fields = this.formElement.querySelectorAll('schema-form-field');
    const ajv = new Ajv();
    const valid = ajv.validate(this.schema, this.model);
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

  get model() {
    const fields = this.formElement.querySelectorAll('schema-form-field');
    const model = {};
    fields.forEach((element) => {
      const input = element.querySelector('input');
      if (input.value == '') {
        delete model[element.key];
      } else {
        model[element.key] = input.value;
      }
    });
    return model;
  }

}

window.customElements.define('schema-form', SchemaForm);

