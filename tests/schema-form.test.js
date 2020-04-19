'use strict';

import '../src/schema-form';

beforeEach(() => {
    document.body.innerHTML = '<schema-form></schema-form>';
});

test('string in schema displays a text field', () => {
    const schemaForm = document.querySelector('schema-form');
    schemaForm.schema = {
        type: 'object',
        properties: {
            name: {
                title: 'Name',
                type: 'string'
            }
        }
    };
    const labelElement = document.querySelector('label');
    expect(labelElement).toBeInstanceOf(HTMLLabelElement);
    expect(labelElement.innerHTML).toEqual('Name');
    expect(labelElement.getAttribute('for')).toEqual('name');
    const inputElement = document.querySelector('input');
    expect(inputElement.getAttribute('type')).toEqual('text');
    expect(inputElement.id).toEqual('name');
});

test('enum displays select', () => {
    const schemaForm = document.querySelector('schema-form');
    schemaForm.schema = {
        type: 'object',
        properties: {
            select: {
                title: 'Select',
                type: 'string',
                enum: ['a', 'b', 'c']
            }
        }
    };
    const labelElement = document.querySelector('label');
    expect(labelElement).toBeInstanceOf(HTMLLabelElement);
    expect(labelElement.innerHTML).toEqual('Select');
    const selectElement = document.querySelector('select');
    expect(selectElement).toBeInstanceOf(HTMLSelectElement);
    const optionElements = document.querySelectorAll('option');
    expect(optionElements[0].innerHTML).toEqual('a');
    expect(optionElements[1].innerHTML).toEqual('b');
    expect(optionElements[2].innerHTML).toEqual('c');
    expect(optionElements[0].getAttribute('value')).toEqual('a');
    expect(optionElements[1].getAttribute('value')).toEqual('b');
    expect(optionElements[2].getAttribute('value')).toEqual('c');
});

test('array with enum displays checkboxes', () => {
    const schemaForm = document.querySelector('schema-form');
    schemaForm.schema = {
        type: 'object',
        properties: {
            checkboxes: {
                title: 'Checkboxes',
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['a', 'b', 'c']
                }
            }
        }
    };
    const labelElement = document.querySelector('label');
    expect(labelElement).toBeInstanceOf(HTMLLabelElement);
    expect(labelElement.innerHTML).toEqual('Checkboxes');
    const inputElements = document.querySelectorAll('input');
    expect(inputElements[0].getAttribute('type')).toEqual('checkbox');
    expect(inputElements[1].getAttribute('type')).toEqual('checkbox');
    expect(inputElements[2].getAttribute('type')).toEqual('checkbox');
});

test('empty required field displays error', () => {
    const schemaForm = document.querySelector('schema-form');
    schemaForm.schema = {
        type: 'object',
        properties: {
            name: {
                title: 'Name',
                type: 'string'
            }
        },
        required: [
            'name'
        ]
    };
    const formElement = document.querySelector('form');
    formElement.submit();
    const feedbackElement = document.querySelector('.invalid-feedback');
    expect(feedbackElement.innerHTML).toEqual('required');
});

