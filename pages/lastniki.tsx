// pages/animals.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { default as NextLink } from 'next/link';

export async function getServerSideProps() {
  // Zamenjajte URL z dejanskim endpointom vašega Strapi API-ja
  const res = await fetch('http://localhost:1337/api/lastniki');
  const data = await res.json();

  return {
    props: {
      lastniki: data.data,
    },
  };
}

export default function LastnikiPage({ lastniki }) {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lastniki</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Priimek</th>
            <th>E-naslov</th>
            <th>Telefon</th>
          </tr>
        </thead>
        <tbody>
          {lastniki.map((lastnik) => (
            <tr key={lastnik.id}>
              <td>{lastnik.attributes.Ime}</td>
              <td>{lastnik.attributes.Priimek}</td>
              <td>{lastnik.attributes.Email}</td>
              <td>{lastnik.attributes.Telefon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}