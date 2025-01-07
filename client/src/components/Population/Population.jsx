import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './Population.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Population ({ populationData }) {
  if (!populationData || populationData.length === 0) {
    return <p>There is no population data for this country.</p>;
  }

  const chartData = {
    labels: populationData.map(item => item.year),
    datasets: [
      {
        label: 'Population Size',
        data: populationData.map(item => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Population Over the Years',
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Population numbers over the years:</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default Population;
