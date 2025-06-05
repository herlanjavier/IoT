const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://callback-iot.onrender.com/data');
    const data = response.data;

    const filtered = data.filter(d => d.temperature && d.humidity && d.pressure);
    const lastTwo = filtered.slice(-2);
    res.json(lastTwo);
  } catch (error) {
    console.error('Error fetching external data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/visualize', (req, res) => {
  const receivedData = req.body;
  console.log('Datos recibidos para visualizacion:', receivedData);

  res.json({ message: 'Datos recibidos correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
