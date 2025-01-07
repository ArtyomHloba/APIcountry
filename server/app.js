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

module.exports = app;
