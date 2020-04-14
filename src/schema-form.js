import './field.js';
import './textarea.js';
import './select.js';
import './checkboxes.js';
import './radios.js';
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
        this.formElement.addEventListener('change', this.onChange.bind(this));
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

    addField(key, properties, after = null) {
        const fieldProperties = {
            key: key,
            title: properties.title || key,
            help: properties.description,
            titleMap: properties.titleMap
        };
        const schemaToFormType = {
            textarea: 'textarea',
            string: 'text',
            integer: 'number',
            number: 'number'
        };
        const schemaToFormElement = {
            'textarea': 'schema-form-textarea',
            'string': 'schema-form-field',
            'integer': 'schema-form-field',
            'number': 'schema-form-field',
            'array-with-enum': 'schema-form-checkboxes',
            'enum': 'schema-form-select-field',
            'select': 'schema-form-select-field',
            'radios': 'schema-form-radios',
            'radiobuttons': 'schema-form-radios'
        };
        fieldProperties.element = schemaToFormElement[properties.type];
        if (!fieldProperties.element) {
            if (properties.type == 'array' && properties.items.enum) {
                fieldProperties.element = schemaToFormElement['array-with-enum'];
                fieldProperties.enum = properties.items.enum;
                fieldProperties.type = schemaToFormType[properties.items.type];
            } else if (properties.enum) {
                fieldProperties.element = schemaToFormElement['enum'];
                fieldProperties.enum = properties.enum;
            }
        }
        fieldProperties.type = schemaToFormType[properties.type];
        if (properties.element) fieldProperties.element = properties.element;
        this.addFieldElement(fieldProperties, after);
    }

    enumToTitleMap(fieldEnum) {
        return fieldEnum.map(key => ({name: key, value: key}));
    }

    addFieldElement(fieldProperties, after = null) {
        const formField = document.createElement(fieldProperties.element);
        if (after) {
            const field = this.fields.find(field => field.key == after);
            field.after(formField);
        } else {
            this.formElement.appendChild(formField);
        }
        formField.key = fieldProperties.key;
        formField.setAttribute('title', fieldProperties.title);
        if (fieldProperties.help)
            formField.setAttribute('help', fieldProperties.help);
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

    get form() {
        return this._form;
    }

    set form(value) {
        this._form = value;
        this.clearForm();
        this.buildForm();
    }

    clearForm() {
        this.formElement.innerHTML = '';
    }

    buildForm() {
        if (this.form) {
            this.form.forEach((key) => {
                if (typeof key == 'string') {
                    const properties = this.schema.properties[key];
                    if (properties) this.addField(key, properties);
                } else if (typeof key == 'object') {
                    if (key.type == 'submit') {
                        this.addSubmit(key);
                    } else {
                        const properties = this.schema.properties[key.key];
                        if (properties) {
                            const fieldProperties = Object.assign({}, properties, key);
                            this.addField(key.key, fieldProperties);
                        }
                    }
                }
            });
        } else {
            const keys = Object.keys(this.schema.properties);
            keys.forEach((key) => {
                const properties = this.schema.properties[key];
                this.addField(key, properties);
            });
            this.addSubmit();
            if (this.schema.dependencies) this.checkDependencies();
        }
    }

    addSubmit(properties) {
        const submit = document.createElement('schema-form-submit');
        this.formElement.appendChild(submit);
        if (properties) {
            const button = submit.querySelector('button');
            if (properties.title) button.innerHTML = properties.title;
            if (properties.style) button.classList.add(properties.style);
        }
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
        const fields = this.formElement.children;
        const model = {};
        for (let i = 0; i < fields.length; i++) {
            const element = fields[i];
            if (element.value == '') {
                delete model[element.key];
            } else {
                model[element.key] = element.value;
            }
        }
        return model;
    }

    onChange() {
        if (this.schema.dependencies) this.checkDependencies();
    }

    checkDependencies() {
        const dependencies = Object.keys(this.schema.dependencies);
        dependencies.forEach((key) => {
            if (this.model[key] && this.model[key] != '') {
                const dependency = this.schema.dependencies[key];
                this.addDependencies(key, dependency);
            }
        });
    }

    addDependencies(key, dependency) {
        Object.keys(dependency.properties).forEach((newKey) => {
            if (!this.fields.some(field => field.key == newKey)) {
                this.addField(newKey, dependency.properties[newKey], key);
            }
        });
    }

    get fields() {
        const children = this.formElement.children;
        const fields = [];
        for (let i = 0; i < children.length; i++) {
            fields.push(children[i]);
        }
        return fields;
    }

}

window.customElements.define('schema-form', SchemaForm);

