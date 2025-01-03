import React from 'react';
import Form from '@/components/Form';

const sampleData = {
  firebaseKey: '-OFdRGz3PSgzO9Fd-S3h',
  name: 'Landon Borrego',
  text: 'A fish is an animal',
  userId: 'dg40g1KPURXtcDUfTOl2s1Zjc3D3',
};

export default function FormPage() {
  return (
    <div>
      <h2>Create</h2>
      {/* If were not passing the form an object like the obj prop in update, then the inital value is going to be an empty string, making the form blank. */}
      <Form />
      <h2>Update</h2>
      {/* If were are passing the form an object obj prop, then the inital value is going to display the data of that object , making the form prefilled. */}
      <Form obj={sampleData} />
    </div>
  );
}
