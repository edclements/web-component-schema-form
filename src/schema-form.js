import './field.js';
import './textarea.js';
import './select.js';
import './checkboxes.js';
import './radios.js';
import './help.js';
import './submit.js';

const template = document.createElement('template');
template.innerHTML = `
<form></form>
`;

export class SchemaForm extends HTMLElement {

    constructor() {
        super();
        this.elementMap = {
            'textarea': 'schema-form-textarea',
            'string': 'schema-form-field',
            'integer': 'schema-form-field',
            'number': 'schema-form-field',
            'checkboxes': 'schema-form-checkboxes',
            'select': 'schema-form-select-field',
            'radios': 'schema-form-radios',
            'help': 'schema-form-help'
        };
    }

    mapElement(type, element) {
        this.elementMap[type] = element;
    }

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

    addField(key, properties, after = null, parent = null) {
        const fieldProperties = Object.assign({}, properties);
        fieldProperties.title = fieldProperties.title || key;
        const schemaToFormType = {
            textarea: 'textarea',
            string: 'text',
            integer: 'number',
            number: 'number'
        };
        fieldProperties.element = this.elementMap[properties.type];
        fieldProperties.type = schemaToFormType[properties.type];
        this.addFieldElement(fieldProperties, after, parent);
    }

    enumToTitleMap(fieldEnum) {
        return fieldEnum.map(key => ({name: key, value: key}));
    }

    addFieldElement(fieldProperties, after = null, parent = null) {
        const formField = document.createElement(fieldProperties.element);
        if (after) {
            const field = this.fields.find(field => field.key == after);
            field.after(formField);
        } else if (parent) {
            parent.appendChild(formField);
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
        if (fieldProperties.htmlClass) formField.htmlClass = fieldProperties.htmlClass;
        if (fieldProperties.helpvalue) formField.innerHTML = fieldProperties.helpvalue;
    }

    addSection(properties, parent = null) {
        const div = document.createElement('div');
        if (properties.htmlClass) div.classList.add(properties.htmlClass);
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
        this.formElement.innerHTML = '';
    }

    buildFormSection(form, element) {
        form.forEach((key) => {
            if (typeof key == 'string') {
                const properties = this.schema.properties[key];
                if (properties) {
                    if (properties.enum) {
                        properties.type = 'select';
                    } else if (properties.array && properties.items.enum) {
                        properties.type = 'checkboxes';
                    }
                    this.addField(key, properties, null, element);
                }
            } else if (typeof key == 'object') {
                if (key.type == 'submit') {
                    this.addSubmit(key, element);
                } else if (key.type == 'section') {
                    this.addSection(key, element);
                } else {
                    const properties = this.schema.properties[key.key];
                    if (properties) {
                        const fieldProperties = Object.assign({}, properties, key);
                        this.addField(key.key, fieldProperties, null, element);
                    } else {
                        this.addField(key.key, key, null, element);
                    }
                }
            }
        });
    }

    buildForm() {
        if (this.form) {
            this.buildFormSection(this.form, this.formElement);
        } else {
            const keys = Object.keys(this.schema.properties);
            keys.forEach((key) => {
                const properties = this.schema.properties[key];
                this.addField(key, properties);
            });
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

    submit(event) {
        event.preventDefault();
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
                this.fields.forEach((element) => {
                    if (element.key == key) {
                        element.error = error;
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

