# Generate React mixins that can leverage context

Sometimes when writing certain types of mixins you want to leverage React's undocumentend 'context'. Although props and state should always be your choice, every now and then you run into situations where that's just impractical. Use this function to create mixins that will safely store you context under one, easy to change prop.

**Warning: do not use unless you know what you're doing. Chances of seriously screwing up your app's architecture using this are significant**

Poorly documented intentionally. Read the source and tests, it's tiny.