import { useEffect, useState } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import axios from 'axios';
import styles from './Home.module.css';

function App () {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/countries')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load data. Try again later.');
        setLoading(false);
      });
  }, []);

  const handleSearch = e => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(query)
    );
    setFilteredCountries(filtered);
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <PropagateLoader color='#ffffff' />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Countries List</h1>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Search country'
          className={styles.searchInput}
        />
      </div>

      <ul>
        {filteredCountries.length > 0 ? (
          filteredCountries.map(country => (
            <li className={styles.countryName} key={country.countryCode}>
              <a href={`/country/${country.countryCode}`}>{country.name}</a>
            </li>
          ))
        ) : (
          <p className={styles.noResults}>No countries found.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
