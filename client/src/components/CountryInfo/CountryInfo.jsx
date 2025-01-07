import { data, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CountryInfo.module.css';
function CountryInfo () {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/country/${countryCode}`)
      .then(response => {
        console.log(response.data);
        setCountryInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load country info. Try again later.');
        setLoading(false);
      });
  }, [countryCode]);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>{countryInfo.name.commonName || countryInfo.name.officialName}</h1>
      {countryInfo.flag ? (
        <img
          src={countryInfo.flag}
          alt={`${
            countryInfo.name.commonName || countryInfo.name.officialName
          } flag`}
        />
      ) : (
        <p className={styles.noData}>Flag not available.</p>
      )}
      <h2>Border Countries:</h2>
      <ul>
        {countryInfo.borders && countryInfo.borders.length > 0 ? (
          countryInfo.borders.map(border => (
            <li key={border.countryCode}>
              <a href={`/country/${border.countryCode}`}>
                {border.commonName || border.countryCode}
              </a>
            </li>
          ))
        ) : (
          <p>No bordering countries found.</p>
        )}
      </ul>
    </div>
  );
}

export default CountryInfo;
