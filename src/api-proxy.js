const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '45786f636973636639397046796141';
const BASE_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchSTNTimeTableByIDService/1/5`;

app.get('/api/subway', async (req, res) => {
  const { stationCode, weekTag, updnTag } = req.query;
  if (!stationCode || !weekTag || !updnTag) {
    return res.status(400).json({ error: 'Missing required query parameters.' });
  }
  const url = `${BASE_URL}/${stationCode}/${weekTag}/${updnTag}/`;
  try {
    const response = await fetch(url);
    const data = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Seoul OpenAPI.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Proxy server listening on port ${PORT}`);
}); 