// Variable that grabs Firebase DB URL from .env file and makes accessible to this file.
const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// API call function that creates (moreso searches API and claims that fact in our DB) a random fact upon request (asynchronously).
const postFact = async (obj, value) => {
  // Variable that houses await fetch statement. This statement grabs the Firebase DB URL (utilizing the value param as a string to determine where the route goes) and creates object data in JSON format, in Firebase DB with the obj param.
  const post = await fetch(`${dbUrl}/response${value}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  // Variable that takes the result of the post variable and parses as json data.
  const response = post.json();

  // Returns the parsed json data from the server as the result of the postFact function.
  return response;
};

// API call function that updates a random fact upon request (asynchronously). This adds a new key:value to the selected object.
// UPDATE: changed firebaseKey param to payload param. Did this so then we can update more than just the firebaseKey with this API call.
const updateFact = async (payload, value) => {
  // Variable that houses await fetch statement. This statement grabs the Firebase DB URL (utilizing the value string to determine where the route goes AND the firebaseKey to determine which term to update) and adds the firebaseKey data in JSON format, in Firebase DB with the obj object.
  // UPDATE: added payload before firebaseKey. Did this considering that we need to access the firebaseKey, and since payload is acting like the name of the object now, we can dot notate into the firebaseKey value of its key.
  const patch = await fetch(`${dbUrl}/response${value}/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },

    // UPDATE: changed the object of {firebaseKey,} to payload. This was done so then we can modify more than just the firebaseKey
    body: JSON.stringify(payload),
  });

  // Variable that takes the result of the patch variable and parses as .json()
  const response = patch.json();

  // Returns the parsed JSON data from the server as the result of the updateFact function.
  return response;
};

// API call function that lets user read a random fact upon request (asynchronously).
const readFacts = async (userId, value) => {
  // Variable that houses await fetch statement. This await fetch statement is filtered by userId, so the user will be able to read the facts that are unique to them.
  const read = await fetch(`${dbUrl}/response${value}.json?orderBy="userId"&equalTo="${userId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Variable that takes the result of the read variable and parses as .json()
  const response = read.json();

  // Returns the parsed JSON data from the server as the result of the readFacts function.
  return response;
};

const deleteFact = async (firebaseKey, value) => {
  const del = await fetch(`${dbUrl}/response${value}/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = del.json();
  return response;
};

export { postFact, updateFact, readFacts, deleteFact };
