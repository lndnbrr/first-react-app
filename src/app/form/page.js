'use client';

import React, { useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { postFact, updateFact } from '@/api/facts';

// Object that will be a param in a useState hook. This will tell useState that there is a space for text and a space for name to be filled out, and at the inital point where it renders, it is an empty string.
const initialState = {
  text: '',
  name: '',
};

export default function FormPage() {
  // Variable that introduces the useAuth hook, a hook that allows the current user to be represented by the variable name.
  const { user } = useAuth();

  // factDetails = current state of fact.
  // setFactDetails = function to update factDetails.
  // useState = manages state in functional components.
  // initialState = intial value of fact (nothing).
  const [factDetails, setFactDetails] = useState(initialState);

  // Function that updates the state whenever a user types. So everytime the input value changes, this function will run.
  const handleInputUpdate = (e) => {
    // Variable that is named in a destructuring manner, and the code needs these two elements for the function below.. This is successfully done because e.target is targeting the name and the value properties in the element through event (e). The name destructured variable is the same in the inputs that use it (more convenient for API calling).
    const { name, value } = e.target;

    // Function that modifies the state object (intialState or factDetails(current state of the object)). Passes prevState as the obj in this very moment.
    setFactDetails((prevState) => ({
      // Spreading the param of prevState, so this means that it will be opening up the object in the very state it's in at the moment.
      ...prevState,

      // Overriding the name (which could be text or name) by modifying the value of it. The name is using dynamic [] because of it goes to the element, grabs the name and makes it as if it is a key and that ulitmately modifies the value.
      [name]: value,
    }));
  };

  // Function that clears the form. Called later.
  const resetForm = () => {
    // Sets state of fact back to empty strings
    setFactDetails(initialState);
  };

  // Function that creates a fact upon submitting (asynchonously).
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Variable that houses await statement. This statement is awaiting the API call postFact, and this will be represented by response, a variable that is referenced in the next await statement. postFact has two parameters (obj, value) and these are being filled up in this response variable.
    const response = await postFact(
      {
        // factDetails is the current state of the fact object. So spreading the object displays the two key:value pairs.
        ...factDetails,

        // This is a new key:value that will be added to the spread out object. This will represent the uid of the current user (through useAuth()).
        userId: user.uid,

        // This fact that was created will be routed to the facts that we do know (the Yes section)
      },
      'Yes',
    );

    // Await statement that uses API call updateFact. When creating the fact, a name is given to data in the form of a firebaseKey, but it is not an object key:value pair. So snagging the name and placing it into this API call will create a key:value pair inside of the object to uniquely identify that object. The second param notifies the code that this is happening in the Yes section.
    await updateFact(response.name, 'Yes');

    // Calls function to clear the form.
    resetForm();
  };

  return (
    // Form that has an onSubmit attribute, letting the form know that when response is submitted, we must run this function.
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Fact</label>
        <input onChange={handleInputUpdate} type="text" name="text" id="text" className="form-control" value={factDetails.text} required />
      </div>
      <div>
        <label htmlFor="name">Your Name</label>
        <input onChange={handleInputUpdate} type="text" name="name" id="name" className="form-control" value={factDetails.name} required />
      </div>
      <button className="btn btn-success" type="submit">
        Submit
      </button>
    </form>
  );
}
