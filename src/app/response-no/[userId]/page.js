import React from 'react';
import PropTypes from 'prop-types';
import FactCard from '@/components/Card';

// An API async route component for the no responses page.
export default async function ResponseNoPage({ params }) {
  // Variable that holds an API await fetch statement for No responses only. This await fetch statement is filtered by userId and also communicates with Next.js to not store the cache (since data returned from fetch is automatically cached, we are telling the fetch statement to not store (cache) this data, but rather always go to the server and retrieve the latest data).
  const response = await fetch(`https://first-react-app-539c2-default-rtdb.firebaseio.com/responseNo.json?orderBy="userId"&equalTo="${params.userId}"`, { cache: 'no-store' });

  // Variable with await statement that retrieves all data from that specific userId and converts said data into json format.
  const facts = await response.json();

  return (
    <>
      <div>Facts you did not know about!</div>

      {/* Object.values grabs the variable of facts, and changes it from the object of facts objects to the array of facts objects. Map goes to facts array, loops through each individual fact object and selects the text from that fact object to display in FactCard component. */}
      <div>
        {Object.values(facts).map((fact) => (
          <FactCard fact={fact.text} />
        ))}
      </div>
    </>
  );
}

// PropType object that declares params as a string in ResponseNoPage component.
ResponseNoPage.propTypes = {
  params: PropTypes.string.isRequired,
};
