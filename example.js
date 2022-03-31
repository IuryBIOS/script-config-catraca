const express = require('express');
const app = express();

app.use(express.json());

app.post('/test', (req, res) => {
  res.status(200).json({ session: 'working' });
});

app.post('/monitor', (req, res) => {
  res.status(200).json({ monitor: 'working' });
});

app.post('/changeurl', (req, res) => {
  res.status(200).json({ change: 'working' });
});

app.listen(3000, () => {
  console.log('server is running');
});
