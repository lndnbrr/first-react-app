'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';

function Home() {
  // Variable for initial useState. Introduces the initial value of uselessFact and the function setUselessFact.
  const [uselessFact, setUselessFact] = useState({});

  const { user } = useAuth();

  // Asyncronous function that fetches a useless fact when the async function is called upon.
  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();
    setUselessFact(fact);
  };

  // Function that builds object structure for each random fact.
  const selectedResponse = (boolean) => {
    const obj = {
      userId: user.uid,
      permalink: uselessFact.permalink,
      response: boolean,
    };

    // Function inside of selectedResponse() that displays the next random fact.
    fetchFact();

    // TBD in future tutorial.
    return obj;
  };

  // React hook that passes two arguments. First argument is an anonymous function that has the function that displays a random fact within it. Second argument is an empty dependency array, which only lets fetchFact display one fact when the component is rendered and avoids displaying repeated random facts.
  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <div>
        <h1>{uselessFact.text}</h1>
      </div>
      <h3>Did you know this fact?</h3>
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
