import React from 'react';
import PropTypes from 'prop-types';
import FactCard from '@/components/Card';
import { readFacts } from '../../../api/facts';

// Route component for the both yes and no responses. Upon request (asynchronously), will grab API calls and use that call to return facts.
export default async function ResponsesPage({ params, searchParams }) {
  // Variable that houses await statement. This statement uses readFacts API call to retrieve all data from that specific userId and determines whether value is yes or no.
  const facts = await readFacts(params.userId, searchParams.value);

  return (
    <>
      <h1>Here the facts for the {searchParams.value} Page!</h1>
      <div>
        {/* Object.values grabs the variable of facts, and changes it from the object of facts objects to the array of facts objects. Map goes to facts array, loops through each individual fact object (each object has a firebaseKey as an identifier) and selects the text from that fact object to display in FactCard component. */}
        {Object.values(facts).map((fact) => (
          <FactCard key={fact.firebaseKey} fact={fact.text} />
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
