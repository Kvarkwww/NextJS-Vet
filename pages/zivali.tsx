// Strani: pages/zivali.tsx
import React, { useState, useEffect } from 'react';
import AdvancedSearch from '../components/AdvancedSearch'; // Predpostavimo, da imate to komponento
import 'bootstrap/dist/css/bootstrap.min.css';
import { default as NextLink } from 'next/link';

const ZivaliPage = () => {
  const [zivali, setZivali] = useState([]);

  const fetchZivali = async (filter: string, searchTerm: string, sortOrder: string) => {
    let baseUrl = `http://localhost:1337/api/zivali`;
    let queryParams = `populate[lastnik]=*&populate[cepljenja]=*`;
  
    if (filter !== 'vse' && searchTerm) {
      queryParams += `&filters[${filter}][$containsi]=${encodeURIComponent(searchTerm)}`;
    }
  
    if (sortOrder && filter !== 'vse') {
      queryParams += `&sort[${filter}]=${sortOrder}`;
    } else if (sortOrder) {
      // Tukaj predpostavimo, da imate defaultno polje za sortiranje, npr. 'createdAt'
      queryParams += `&sort=createdAt:${sortOrder}`;
    }
  
    const apiUrl = `${baseUrl}?${queryParams}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setZivali(data.data || []);
    } catch (error) {
      console.error('Napaka pri pridobivanju živali:', error);
    }
  };
 

  useEffect(() => {
    fetchZivali('vse', 'asc');
  }, []);

  return (
    <div className="container mt-5">
      <hr/>
      <h1>Živali</h1>
      <hr/>
      <AdvancedSearch onFilterChange={fetchZivali} />
      <hr/>
      <table className="table table-striped table-bordered table-hover rounded">
      <thead className="table-light">
          <tr>
            <th>Vzdevek</th>
            <th>Vrsta</th>
            <th>Pasma</th>
            <th>Spol</th>
            <th>Višina</th>
            <th>Teža</th>
            <th>Id</th>
            <th>Last. Ime</th>
            <th>Last. Priimek</th>
            <th>Cepljenja - Veljavno do</th>
          </tr>
        </thead>
        <tbody>
          {zivali.map((zivali) => (
            <tr key={zivali.id}>
              <td>{zivali.attributes.Vzdevek}</td>
              <td>{zivali.attributes.Vrsta}</td>
              <td>{zivali.attributes.Pasma}</td>
              <td>{zivali.attributes.Spol}</td>
              <td>{zivali.attributes.Visina}</td>
              <td>{zivali.attributes.Teza}</td>
              <td>{zivali.attributes.Identifikacija}</td>
              <td>{zivali.attributes.lastnik.data ? zivali.attributes.lastnik.data.attributes.Ime : 'Ni podatkov'}</td>
              <td>{zivali.attributes.lastnik.data ? zivali.attributes.lastnik.data.attributes.Priimek : 'Ni podatkov'}</td>
              <td>
                {zivali.attributes.cepljenja.data.length > 0
                  ? zivali.attributes.cepljenja.data.map((cepivo) => (
                      <div key={cepivo.id}>{cepivo.attributes.VrstaCepiva} - {new Date(cepivo.attributes.DatumCepljenja).toLocaleDateString()}</div>
                    ))
                  : 'Ni cepljenj'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ZivaliPage;