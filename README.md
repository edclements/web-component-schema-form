# Web Component Schema Form

Create web forms with JSON schema and custom HTML elements

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="web-component-schema-form.html">
    <script>
        const json = {
          "type": "object",
          "title": "Comment",
          "properties": {
            "name": {
              "title": "Name",
              "type": "string"
            },
            "email": {
              "title": "Email",
              "type": "string",
              "pattern": "^\\S+@\\S+$",
              "description": "Email will be used for evil."
            },
            "comment": {
              "title": "Comment",
              "type": "string",
              "maxLength": 20,
              "validationMessage": "Don't be greedy!"
            }
          },
          "required": [
            "name",
            "email",
            "comment"
          ]
        };
        document.addEventListener("DOMContentLoaded", function() {
          const schemaForm = document.querySelector('schema-form');
          schemaForm.schema = json;
        });
    </script>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<schema-form></schema-form>
```

The included custom elements work with Bootstrap 4. Various examples can be viewed [here](https://edclements.github.io/web-component-schema-form/examples/bootstrap.html).

Alternatively a Materialize version can be found [here](https://edclements.github.io/web-component-schema-form/examples/materialize.html).

