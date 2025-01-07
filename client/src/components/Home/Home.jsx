import { useEffect, useState } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import axios from 'axios';
import styles from './Home.module.css';

function App () {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/countries')
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load data. Try again later.');
        setLoading(false);
      });
  }, []);

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
      <h1 className={styles.title}>Countries List</h1>
      <ul>
        {countries.map(country => (
          <li className={styles.countryName} key={country.countryCode}>
            <a href={`/country/${country.countryCode}`}>{country.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
