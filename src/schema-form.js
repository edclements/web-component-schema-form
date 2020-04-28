import Ajv from 'ajv';
import set from 'lodash/set';

import './field.js';
import './textarea.js';
import './select.js';
import './checkboxes.js';
import './radios.js';
import './help.js';
import './submit.js';
import './fieldset.js';
import {parseForm,parseSchema} from './parse.js';

const template = document.createElement('template');
template.innerHTML = `
<form></form>
`;

export class SchemaForm extends HTMLElement {

    constructor() {
        super();
        this.elementMap = {
            'textarea': 'schema-form-textarea',
            'text': 'schema-form-field',
            'number': 'schema-form-field',
            'checkboxes': 'schema-form-checkboxes',
            'select': 'schema-form-select-field',
            'radios': 'schema-form-radios',
            'help': 'schema-form-help',
            'fieldset': 'schema-form-fieldset'
        };
        this.fields = [];
    }

    mapElement(type, element) {
        this.elementMap[type] = element;
    }

    connectedCallback() {
        const node = document.importNode(template.content, true);
        this.appendChild(node);
        this.formElement = this.querySelector('form');
        this.formElement.addEventListener('submit', this.onSubmit.bind(this));
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
                        this.addField(properties);
                    });
                });
        }
    }

    enumToTitleMap(fieldEnum) {
        return fieldEnum.map(key => ({name: key, value: key}));
    }

    addField(properties, after = null, parent = null) {
        const element = this.elementMap[properties.type];
        const formField = document.createElement(element);
        if (after) {
            const field = this.fields.find(field => field.key == after);
            field.after(formField);
        } else if (parent) {
            parent.appendChild(formField);
        } else {
            this.formElement.appendChild(formField);
        }
        formField.key = properties.key;
        formField.setAttribute('title', properties.title);
        if (properties.help)
            formField.setAttribute('help', properties.help);
        formField.setAttribute('type', properties.type);
        if (properties.titleMap) {
            formField.options = properties.titleMap;
        } else if (properties.enum) {
            formField.options = this.enumToTitleMap(properties.enum);
        } else if (properties.items && properties.items.enum) {
            formField.options = this.enumToTitleMap(properties.items.enum);
        }
        if (properties.htmlClass) formField.htmlClass = properties.htmlClass;
        if (properties.helpvalue) formField.innerHTML = properties.helpvalue;
        if (properties.type == 'fieldset') {
            this.buildFormSection(properties.items, formField, properties.key);
        }
        this.fields.push(formField);
    }

    addSection(properties, parent = null) {
        const div = document.createElement('div');
        if (properties.htmlClass) {
            properties.htmlClass.split(' ').forEach((className) => {
                div.classList.add(className);
            });
        }
        if (parent) {
            parent.appendChild(div);
        } else {
            this.formElement.appendChild(div);
        }
        this.buildFormSection(properties.items, div);
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
        this.fields = [];
        this.formElement.innerHTML = '';
    }

    buildFormSection(form, element) {
        form.forEach((formItem) => {
            if (formItem) {
                switch (formItem.type) {
                case 'section':
                    this.addSection(formItem, element);
                    break;
                case 'submit':
                    this.addSubmit(formItem, element);
                    break;
                default:
                    this.addField(formItem, null, element);
                }
            }
        });
    }

    buildForm() {
        if (this.form) {
            this.buildFormSection(parseForm(this.form, this.schema), this.formElement);
        } else {
            this.buildFormSection(parseSchema(this.schema), this.formElement);
            this.addSubmit({}, this.formElement);
            if (this.schema.dependencies) this.checkDependencies();
        }
    }

    addSubmit(properties, element) {
        const submit = document.createElement('schema-form-submit');
        element.appendChild(submit);
        if (properties) {
            const button = submit.querySelector('button');
            if (properties.title) button.innerHTML = properties.title;
            if (properties.style) button.classList.add(properties.style);
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const ajv = new Ajv();
        const valid = ajv.validate(this.schema, this.model);
        if (!valid) {
            ajv.errors.forEach(this.addError.bind(this));
        }
    }

    addError(error) {
        let key;
        if (error.keyword == 'required') {
            key = error.params.missingProperty;
        } else {
            key = error.dataPath.match(/\.(.*)/)[1];
        }
        this.fields.forEach((element) => {
            if (element.key == key) {
                element.error = error;
            }
        });
    }

    get model() {
        return this.fields.reduce((model, field) => {
            if (field.value && field.value != '') {
                set(model, field.key, field.value);
            }
            return model;
        }, {});
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
                this.addField(dependency.properties[newKey], key);
            }
        });
    }

}

window.customElements.define('schema-form', SchemaForm);

