'use strict';

import '../src/textarea';

beforeEach(() => {
    document.body.innerHTML = '<schema-form-textarea></schema-form-textarea>';
});

test('set error', () => {
    const field = document.querySelector('schema-form-textarea');
    field.error = {message: 'this is bad'};
    expect(field.querySelector('textarea').classList).toContain('is-invalid');
    expect(field.querySelector('.invalid-feedback').innerHTML).toEqual('this is bad');
});

test('clear error on input', () => {
    const field = document.querySelector('schema-form-textarea');
    field.error = {message: 'this is bad'};
    field.querySelector('textarea').dispatchEvent(new Event('input'));
    expect(field.querySelector('textarea').classList).not.toContain('is-invalid');
    expect(field.querySelector('.invalid-feedback').innerHTML).toEqual('');
});
