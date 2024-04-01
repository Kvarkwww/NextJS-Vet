import React, { useState } from 'react';
import '../styles/globals.css'; 

const AdvancedSearch = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('vse');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    onFilterChange(newFilter, searchTerm, sortOrder);
  };

  const handleSearchTermChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange(filter, newSearchTerm, sortOrder);
  };

  const handleSortOrderChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    onFilterChange(filter, searchTerm, newSortOrder);
  };

  return (
    <div className="advanced-search">
      <div className="fleft">
        <select value={filter} onChange={handleFilterChange}>
          <option value="vse">Vse</option>
          <option value="Vzdevek">Vzdevek</option>
          <option value="Vrsta">Vrsta</option>
          <option value="Pasma">Pasma</option>
          {/* Dodajte več možnosti filtriranja po potrebi */}
        </select>
      </div>
      <div className="fleft">
        <input
          type="text"
          placeholder="Iskalni niz"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="fright">
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Rastoče</option>
          <option value="desc">Padajoče</option>
        </select>
      </div>
    </div>
  );
};

export default AdvancedSearch;