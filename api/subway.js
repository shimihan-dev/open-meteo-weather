import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { stationCode, weekTag, updnTag } = req.query;
  if (!stationCode || !weekTag || !updnTag) {
    res.status(400).json({ error: 'Missing required query parameters.' });
    return;
  }
  const API_KEY = '45786f636973636639397046796141';
  const BASE_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/SearchSTNTimeTableByIDService/1/5`;
  const url = `${BASE_URL}/${stationCode}/${weekTag}/${updnTag}/`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Seoul OpenAPI.' });
  }
} 