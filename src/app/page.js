'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';

// Variable that grabs Firebase DB URL from .env file and makes accessible to this file.
const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// Component that displays the home page of application.
function Home() {
  // Variable for initial useState. Introduces the initial value of uselessFact and the function setUselessFact.
  const [uselessFact, setUselessFact] = useState({});

  // "any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks."
  const { user } = useAuth();

  // Asyncronous API function that fetches a useless fact.
  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();
    setUselessFact(fact);
  };

  // Asyncronous API function that builds object structure for each random fact. UPDATE THIS!!!!
  const selectedResponse = async (boolean) => {
    // Variable that determines whether or not the param (boolean) of the selected response is true or false. When determined true, the variable will create a string saying 'Yes'. When determined false, the variable will create a string saying 'No'.
    const value = boolean ? 'Yes' : 'No';

    // Object that builds the structure of the fact. Eventually will be called in the await fetch statement.
    const obj = {
      userId: user.uid,
      text: uselessFact.text,
    };

    // Await API that fetches the Firebase DB URL, utilizes the value string to determine where the route goes, and creates data in Firebase DB with obj object.
    await fetch(`${dbUrl}/response${value}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    // We call this function inside of selectedResponse(), which will display the next random fact.
    fetchFact();

    // TBD in future tutorial.
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
      {/* Button that uses react bootstrap, is identified as a button, and has an onClick that calls Asynchonous API function */}
      <button className="btn btn-success" type="button" onClick={() => selectedResponse(true)}>
        YES
      </button>
      <button className="btn btn-danger" type="button" onClick={() => selectedResponse(false)}>
        NO
      </button>
    </>
  );
}

export default Home;
