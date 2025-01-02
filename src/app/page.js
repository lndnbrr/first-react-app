'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { postFact, updateFact } from '@/api/facts';

// Component that displays the home page of application.
function Home() {
  // Variable for initial useState. Introduces the initial value of uselessFact and the function setUselessFact.
  const [uselessFact, setUselessFact] = useState({});

  // "any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks."
  const { user } = useAuth();

  // Function that fetches a random fact from random usesless facts API upon request (asynchronously).
  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();
    setUselessFact(fact);
  };

  // Function that determines which response is selected. The function starts when the Yes button or No button are pressed(asynchronously).
  const selectedResponse = async (boolean) => {
    // Variable that determines whether or not the param (boolean) of the selected response is true or false. When determined true, the variable will create a string saying 'Yes'. When determined false, the variable will create a string saying 'No'. Eventually will be called in the await API call.
    const value = boolean ? 'Yes' : 'No';

    // Object that builds the structure of the fact. Eventually will be called in the await API call.
    const obj = {
      userId: user.uid,
      text: uselessFact.text,
    };

    // Variable that houses an await statement. The statement awaits an API call to create (moreso grab/claim) a fact. ALSO, since we are labeling this variable as response, it is going to act as a firebaseKey for the updateFact API call.
    const response = await postFact(obj, value);

    // Await statement for API call. When a new object is created, it gives a name key with a firebaseKey value (its a name outside of the object, but it represents the object). So we just grab the firebaseKey value (response.name param) and make that become the value for our firebaseKey key that were updating into our object. The value param is what json firebase DB were routing to.
    await updateFact(response.name, value);

    // We call this function inside of selectedResponse(), which will display the next random fact.
    fetchFact();

    // Returns the obj object from the server as the result of the selectedResponse function.
    return obj;
  };

  // React hook that passes two arguments. First argument is an anonymous function that has the function that displays a random fact within it. Second argument is an empty dependency array, which only lets fetchFact display one fact at a time when the component is rendering, avoiding rapid display of random facts.
  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <div>
        <h1>{uselessFact.text}</h1>
      </div>
      <h3>Did you know this fact?</h3>

      {/* Button that uses react bootstrap, is identified as a button, and has an onClick that calls function when selecting Yes (which equals true) */}
      <button className="btn btn-success" type="button" onClick={() => selectedResponse(true)}>
        YES
      </button>

      {/* Button that uses react bootstrap, is identified as a button, and has an onClick that calls function when selecting No (which equals false) */}
      <button className="btn btn-danger" type="button" onClick={() => selectedResponse(false)}>
        NO
      </button>
    </>
  );
}

export default Home;
