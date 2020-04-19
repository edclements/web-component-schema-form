# Web Component Schema Form

Create web forms with JSON schema and custom HTML elements

<!--
```
<custom-element-demo>
  <template>
    <script type="module" src="../dist/schema-form.js"></script>
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

