/*

Controlled Component
A controlled component is a component where React fully controls the form element’s state. The form input's value is bound to a state variable, and changes are handled via React.

Characteristics:
The input's value is controlled by the React state.
Changes to the input value are handled through an onChange handler.
The source of truth is the React state.

Example:

import React, { useState } from 'react';

function ControlledComponent() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value} // Controlled by React state
        onChange={handleChange}
      />
      <p>Current Value: {value}</p>
    </div>
  );
}

export default ControlledComponent;

Advantages:
Easier to validate or manipulate input values.
Makes it straightforward to implement features like conditional rendering, custom validation, or dynamic forms.
Enables React to maintain a single source of truth.
Uncontrolled Component
An uncontrolled component is a component where the form element's state is managed by the DOM, and React does not directly control the input value. You access the input's current value through a ref.

Characteristics:
The input value is managed by the DOM, not React.
A ref is used to read the current value of the input.
React does not manage the form element's state directly.

Example:

import React, { useRef } from 'react';

function UncontrolledComponent() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert(`Input Value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <input type="text" ref={inputRef} /> 
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UncontrolledComponent;
Advantages:
Useful for simple forms where you don’t need React to control every input.
Easier to integrate with non-React codebases or libraries.

Comparison
Feature	Controlled Component	Uncontrolled Component

State Management	React controls the state	DOM manages the state

Source of Truth	React state	Input DOM element

Validation	Can validate as the user types	Requires additional effort

Code Complexity	Slightly more complex due to state management	Simpler, no need for state

Use Case	When you need form validations or dynamic behavior	When you need minimal control and simplicity

Which to Use?

Controlled Components: Recommended for most use cases, especially when you need:
Real-time validation.
Dynamic form updates.
Integration with React state and logic.

Uncontrolled Components: Ideal for:
Simple use cases where you don’t need real-time updates.
Interoperability with third-party libraries or legacy code.
*/