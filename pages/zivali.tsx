// Strani: pages/zivali.tsx
import React, { useState, useEffect } from 'react';
import AdvancedSearch from '../components/AdvancedSearch'; // Predpostavimo, da imate to komponento
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="boxed">
      <hr/>
      <h1>Živali</h1>
      <hr/>
      <AdvancedSearch onFilterChange={fetchZivali} />
      <hr/>
      <table className="table">
        <thead>
          <tr>
            <th>Vzdevek</th>
            <th>Vrsta</th>
            <th>Pasma</th>
            <th>Last. Ime</th>
            <th>Last. Priimek</th>
            <th>Cepljenja</th>
          </tr>
        </thead>
        <tbody>
          {zivali.map((zival) => (
            <tr key={zival.id}>
              <td>{zival.attributes.Vzdevek}</td>
              <td>{zival.attributes.Vrsta}</td>
              <td>{zival.attributes.Pasma}</td>
              <td>{zival.attributes.lastnik.data ? zival.attributes.lastnik.data.attributes.Ime : 'Ni podatkov'}</td>
              <td>{zival.attributes.lastnik.data ? zival.attributes.lastnik.data.attributes.Priimek : 'Ni podatkov'}</td>
              <td>
                {zival.attributes.cepljenja.data.length > 0
                  ? zival.attributes.cepljenja.data.map((cepivo) => (
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