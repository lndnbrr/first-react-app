'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from './Form';
import { deleteFact } from '../api/facts';

// Component that, when rendered, shows the current list of facts for either Yes responses or No responses.
function FactCard({ fact, deleteFunc }) {
  // localFact = current state of fact.
  // setLocalFact = function to update localFact.
  // useState = manages state in functional components.
  // fact = useState will have fact as the default value, meaning it will initally show the user the fact.
  const [localFact, setLocalFact] = useState(fact);

  // editMode = current state of mode.
  // setEditMode = function to update editMode.
  // useState = manages state in functional components.
  // false = useState will be false if in Read mode and true if in edit mode. false is the default value, meaning it will initally show the user that their in read mode.
  const [editMode, setEditMode] = useState(false);

  // Function that uses API call to delete a fact, then update the DOM.
  const deleteThisFact = () => {
    // API call goes to the fact with this firebaseKey inside of the Yes valued data, and removed this fact from firebase DB. Then, it will update the page with all of the facts (no longer showing the previously deleted fact).
    deleteFact(fact.firebaseKey, 'Yes').then(() => deleteFunc());
  };

  return (
    <Card>
      <Card.Body>
        {/* edit mode uses ternary operator syntax (condition ? trueBlock : falseBlock) for conditional rendering. So if setEditMode has true in it's params, then it will be in Edit mode and all of the code in that block will show. If setEditMode has false in it's params, then it will be in Read mode and all of the code in the other block will show */}
        {editMode ? (
          <>
            <p>EDIT MODE</p>

            {/* Component that houses props to influence the form. When in edit mode, the first prop is saying to display the obj as a localFact in the input. The second prop updates the form input with the newly updated fact, so the next time you want to update that fact it is going to appear like it was when it was last updated. */}
            <Form obj={localFact} func={setLocalFact} />
            <div>
              <button className="btn btn-secondary" type="button" onClick={() => setEditMode(false)}>
                Leave Edit Mode
              </button>
            </div>
          </>
        ) : (
          <>
            {/* UPDATE: changed fact.text to localFact.text. This localFact.text allows the changes from edit mode to appear on the card when in Reading Mode. */}
            <div>{localFact.text}</div>
            <div>
              <button className="btn btn-warning" type="button" onClick={() => setEditMode(true)}>
                Edit Button
              </button>
              <button className="btn btn-danger" type="button" onClick={deleteThisFact}>
                Delete Button
              </button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

FactCard.propTypes = {
  fact: PropTypes.string.isRequired,
  deleteFunc: PropTypes.string.isRequired,
};

export default FactCard;
