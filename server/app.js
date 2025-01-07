const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/countries', async (req, res) => {
  try {
    const response = await axios.get(
      'https://date.nager.at/api/v3/AvailableCountries'
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error to get Countries', error.message);
    res.status(500).json({ error: 'Failed to retrieve the list of countries' });
  }
});

app.get('/country/:countryCode', async (req, res) => {
  const { countryCode } = req.params;
  try {
    const countryInfoRes = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );
    const countryName =
      countryInfoRes.data.commonName || countryInfoRes.data.name;
    if (!countryName) {
      throw new Error('Country name not found in the API response.');
    }

    const populationRes = await axios
      .get(
        'https://countriesnow.space/api/v0.1/countries/population?country=${countryName}',
        {
          country: countryName,
        }
      )
      .catch(err => {
        console.error('Failed to fetch population:', err.message);
        return { data: { data: { populationCounts: [] } } };
      });

    const flagRes = await axios
      .post('https://countriesnow.space/api/v0.1/countries/flag/images', {
        country: countryName,
      })
      .catch(err => {
        console.error('Failed to fetch flag:', err.message);
        return { data: { data: { flag: '' } } };
      });

    const data = {
      name: countryName,
      borders: countryInfoRes.data.borders || [],
      population: populationRes.data.data.populationCounts,
      flag: flagRes.data.data.flag,
    };

    res.json(data);
  } catch (error) {
    console.error('Error to get Country Info:', error.message);
    res.status(500).json({ error: 'Failed to retrieve country info' });
  }
});

module.exports = app;
