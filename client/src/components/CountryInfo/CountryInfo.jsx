import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropagateLoader from 'react-spinners/PropagateLoader';

import styles from './CountryInfo.module.css';
import Population from '../Population/Population';

function CountryInfo () {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/country/${countryCode}`)
      .then(response => {
        setCountryInfo(response.data);
        setPopulationData(response.data.population || []);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load country information. Try again later.');
        setLoading(false);
      });
  }, [countryCode]);

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
      <Link to='/' className={styles.backButton}>
        Back
      </Link>
      <h1 className={styles.nameOfCountry}>{countryInfo?.name}</h1>
      {countryInfo?.flag ? (
        <img
          className={styles.image}
          src={countryInfo.flag}
          alt={`${countryInfo.name} flag`}
        />
      ) : (
        <p className={styles.noData}>Flag not available.</p>
      )}
      <h2>Borders of the country:</h2>
      <ul>
        {countryInfo?.borders && countryInfo.borders.length > 0 ? (
          countryInfo.borders.map(border => (
            <li className={styles.neerestCountry} key={border.countryCode}>
              <a href={`/country/${border.countryCode}`}>
                {border.commonName || border.countryCode}
              </a>
            </li>
          ))
        ) : (
          <p>There are no neighbouring countries.</p>
        )}
      </ul>

      <Population populationData={populationData} />
    </div>
  );
}

export default CountryInfo;
