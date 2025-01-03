// Added use client since we will be adding a state to this file

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FactCard from '@/components/Card';
import { readFacts } from '../../../api/facts';

// Route component for the both yes and no responses. Depending on whether you click the Yes page or the No page, when entering the page, it will grab API calls and use that call to return facts.
export default function ResponsesPage({ params, searchParams }) {
  // facts = curent state of facts
  // setFacts = function that updates facts
  // useState = manages state in functional components.
  // [] = this is the initialized state, which appears as an empty array. but it is actually what is being loaded from map array below.
  const [facts, setFacts] = useState([]);

  // Function that shows a list of updated facts.
  const getFacts = () => {
    // API call that retrieves all data from that specific userId and determines whether value is yes or no.
    readFacts(params.userId, searchParams.value)
      // A promise method after the API call that will show the updated list of facts.
      .then(setFacts);
  };

  // State Hook that houses an anonymous function. This function will show all updated facts for either selected yes or no page. The first param gets the facts to read. The second param helps prevent any actions from constantly happening, only updating one at a time when the page is rendering.
  useEffect(() => {
    getFacts();
  }, []);

  return (
    <>
      <h1>Here the facts for the {searchParams.value} Page!</h1>
      <div>
        {/* Object.values grabs the variable of facts, and changes it from the object of facts objects to the array of facts objects. Map goes to facts array, loops through each individual fact object (each object has a firebaseKey as an identifier) and selects that fact object (which should just be the fact.text) to display in FactCard component. Also in the FactCard component, a param called deleteFunc is used to get the facts when we "rerun this function" (when the function that deletes facts happens, we use this to get the facts back onto the page that are updated with those changes). */}
        {Object.values(facts).map((fact) => (
          <FactCard key={fact.firebaseKey} fact={fact} deletFunc={getFacts} />
        ))}
      </div>
    </>
  );
}

// PropType object that declares params AND searchParams as a string in ResponsesPage component.
ResponsesPage.propTypes = {
  params: PropTypes.string.isRequired,
  searchParams: PropTypes.string.isRequired,
};
