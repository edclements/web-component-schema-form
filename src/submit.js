const template = document.createElement('template');
template.innerHTML = `
<button type="submit" class="btn btn-primary">Submit</button>
`;

export class SchemaFormSubmit extends HTMLElement {
  connectedCallback() {
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }
}

window.customElements.define('schema-form-submit', SchemaFormSubmit);

