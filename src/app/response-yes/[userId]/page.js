import React from 'react';
import FactCard from '@/components/Card';
import PropTypes from 'prop-types';

// An async route component for the yes responses page.
export default async function ResponseYesPage({ params }) {
  // Fetch for just the yes responses, where it is filtered by userId
  const response = await fetch(`https://first-react-app-539c2-default-rtdb.firebaseio.com/responseYes.json?orderBy="userId"&equalTo="${params.userId}"`);

  const facts = await response.json();

  console.log(Object.values(facts));

  return (
    <>
      <div>Yes Responses</div>
      {/* Object.values changes object of facts objects into an array of facts objects. Map goes to facts array, loops through each fact object and selects the text from that fact object to display in FactCard component. */}
      <div>
        {Object.values(facts).map((fact) => (
          <FactCard fact={fact.text} />
        ))}{' '}
      </div>
    </>
  );
}

ResponseYesPage.propTypes = {
  params: PropTypes.string.isRequired,
};
