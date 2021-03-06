
export function parseSchema(schema) {
    switch(schema.type) {
    case 'object':
        return parseObject(schema.properties);
    }
}

function parseObject(properties, namespace = null) {
    return Object.entries(properties).reduce((form, [key, property]) => {
        const namespacedKey = namespace ? [namespace, key].join('.') : key;
        form.push(parseObjectProperties(namespacedKey, property));
        return form;
    }, []);
}

function parseObjectProperties(key, properties) {
    const formItem = Object.assign({}, {key: key}, properties);
    if (properties.enum || properties.titleMap) {
        formItem.type = 'select';
    } else if (hasOneOfConst(properties)) {
        formItem.type = 'select';
        formItem.options = oneOfToTitleMap(properties.oneOf);
    } else if (properties.type == 'array' && properties.items.enum) {
        formItem.type = 'checkboxes';
    } else if (properties.type == 'object' && properties.properties) {
        formItem.type = 'fieldset';
        formItem.items = parseObject(properties.properties, key);
        delete formItem.properties;
    } else {
        const mappedType = schemaToFormType[properties.type];
        if (mappedType) formItem.type = mappedType;
    }
    formItem.title = formItem.title || key;
    return formItem;
}

function hasOneOfConst(properties) {
    return properties.oneOf &&
        properties.oneOf.filter(oneOf => oneOf.const).length > 0;
}

function oneOfToTitleMap(oneOf) {
    return oneOf.map(item => ({value: item.const, name: item.description || item.const}));
}

const schemaToFormType = {
    string: 'text',
    object: 'fieldset'
};

export function parseForm(form, schema) {
    if (form.length == 1 && form[0] == '*') {
        return parseSchema(schema);
    } else {
        return form.reduce((formItems, formItem) => {
            return handleFormItem(formItems, formItem, schema);
        }, []);
    }
}

function findSchemaProperties(key, schema) {
    return key.split('.').reduce((schema, namespace) => {
        return schema.properties[namespace];
    }, schema);
}

function handleFormItem(form, formItem, schema) {
    if (typeof(formItem) == 'string') {
        const schemaProperties = findSchemaProperties(formItem, schema);
        if (schemaProperties) {
            formItem = parseObjectProperties(formItem, schemaProperties);
        }
    } else {
        if (formItem.key) {
            const schemaProperties = findSchemaProperties(formItem.key, schema);
            if (schemaProperties) {
                formItem = mergeFormSchemaProperties(formItem, schemaProperties);
            }
        }
    }
    switch(formItem.type) {
    case 'section':
        formItem.items = formItem.items.reduce((sectionForm, sectionFormItem) => {
            return handleFormItem(sectionForm, sectionFormItem, schema);
        }, []);
        break;
    case 'fieldset':
        formItem.items = formItem.items.reduce((sectionForm, sectionFormItem) => {
            return handleFormItem(sectionForm, sectionFormItem, schema);
        }, []);
        break;
    }
    form.push(formItem);
    return form;
}

function mergeFormSchemaProperties(formProperties, schemaProperties) {
    return Object.assign({},
        parseObjectProperties(formProperties.key, schemaProperties),
        formProperties
    );
}
