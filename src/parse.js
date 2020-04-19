
export function parseSchema(schema) {
    switch(schema.type) {
    case 'object':
        return parseObject(schema.properties);
    }
}

function parseObject(properties) {
    return Object.entries(properties).reduce((form, [key, property]) => {
        form.push(parseObjectProperties(key, property));
        return form;
    }, []);
}

function parseObjectProperties(key, properties) {
    const formItem = Object.assign({}, {key: key}, properties);
    if (properties.enum) {
        formItem.type = 'select';
    } else if (properties.type == 'array' && properties.items.enum) {
        formItem.type = 'checkboxes';
    } else {
        const mappedType = schemaToFormType[properties.type];
        if (mappedType) formItem.type = mappedType;
    }
    formItem.title = formItem.title || key;
    return formItem;
}

const schemaToFormType = {
    string: 'text'
};

export function parseForm(form, schema) {
    if (form == ['*']) {
        return parseSchema(schema);
    } else {
        return form.reduce((formItems, formItem) => {
            return handleFormItem(formItems, formItem, schema);
        }, []);
    }
}

function handleFormItem(form, formItem, schema) {
    if (typeof(formItem) == 'string') {
        const schemaProperties = schema.properties[formItem];
        if (schemaProperties) {
            form.push(parseObjectProperties(formItem, schemaProperties));
        }
    } else {
        const schemaProperties = schema.properties[formItem.key];
        switch(formItem.type) {
        case 'section':
            formItem.items = formItem.items.reduce((sectionForm, sectionFormItem) => {
                return handleFormItem(sectionForm, sectionFormItem, schema);
            }, []);
            form.push(formItem);
            break;
        case 'submit':
            form.push(formItem);
            break;
        default:
            if (schemaProperties) {
                form.push(mergeFormSchemaProperties(formItem, schemaProperties));
            } else {
                form.push(formItem);
            }
        }
    }
    return form;
}

function mergeFormSchemaProperties(formProperties, schemaProperties) {
    return Object.assign({},
        parseObjectProperties(formProperties.key, schemaProperties),
        formProperties
    );
}
