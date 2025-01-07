import { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Список стран</h1>
      <ul>
        {countries.map(country => (
          <li key={country.countryCode}>
            <a href={`/country/${country.countryCode}`}>{country.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
