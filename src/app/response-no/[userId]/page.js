import PropTypes from 'prop-types';
import React from 'react';
import FactCard from '@/components/Card';

// An async route component for the no responses page.
export default async function ResponseNoPage({ params }) {
  // Fetch for just the no responses, where it is filtered by userId
  const response = await fetch(`https://first-react-app-539c2-default-rtdb.firebaseio.com/responseNo.json?orderBy="userId"&equalTo="${params.userId}"`);

  const facts = await response.json();

  return (
    <>
      <div>No Responses</div>
      {/* Object.values changes object of facts objects into an array of facts objects. Map goes to facts array, loops through each fact object and selects the text from that fact object to display in FactCard component. */}
      <div>
        {Object.values(facts).map((fact) => (
          <FactCard fact={fact.text} />
        ))}
      </div>
    </>
  );
}

ResponseNoPage.propTypes = {
  params: PropTypes.string.isRequired,
};
