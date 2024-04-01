// pages/animals.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export async function getServerSideProps() {
  // Zamenjajte URL z dejanskim endpointom vašega Strapi API-ja
  const res = await fetch('http://localhost:1337/api/cepljenja');
  const data = await res.json();

  return {
    props: {
      cepljenja: data.data,
    },
  };
}
export default function CepljenjaPage({ cepljenja }) {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Cepljenja</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Vrsta Cepiva</th>
            <th>Datum Cepljenja</th>
            <th>Veljavnost</th>
          </tr>
        </thead>
        <tbody>
          {cepljenja.map((cepivo) => (
            <tr key={cepivo.id}>
              <td>{cepivo.attributes.VrstaCepiva}</td>
              <td>{cepivo.attributes.DatumCepljenja}</td>
              <td>{cepivo.attributes.Veljavnost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}