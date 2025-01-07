import React from 'react';
import styles from './Population.module.css';

function Population ({ populationData }) {
  if (!populationData || populationData.length === 0) {
    return <p>There is no population data for this country.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Population numbers over the years:</h2>
      <table className={styles.populationTable}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Population size</th>
          </tr>
        </thead>
        <tbody>
          {populationData.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Population;
