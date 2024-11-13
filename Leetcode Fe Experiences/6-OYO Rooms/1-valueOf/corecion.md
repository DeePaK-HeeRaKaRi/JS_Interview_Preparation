Conversion Order in Type Coercion
JavaScript follows a set of rules, known as the ToPrimitive algorithm, when it coerces an object to a primitive value. This often involves calling valueOf or toString on the object:

For == Comparisons:
If JavaScript needs to compare an object and a primitive, it will try to convert the object to a primitive.
The algorithm first tries valueOf. If valueOf returns a primitive, that value is used.
If valueOf does not return a primitive, it tries toString.

For Arithmetic Operations (e.g., +):
When adding a string and a number, JavaScript will convert the number to a string, as string concatenation takes precedence over addition.
For other operators (e.g., -, *, /), JavaScript will coerce strings to numbers if possible.