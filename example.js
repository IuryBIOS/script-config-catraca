const express = require('express');
const app = express();

app.use(express.json());

app.post('/login.fcgi', (req, res) => {
  console.log(req.body);
  res.status(200).json({ session: 'working' });
});

app.post('/set_configuration.fcgi', (req, res) => {
  console.log(req.body);
  res.status(200).json({});
});

app.post('/set_configuration.fcgi', (req, res) => {
  res.status(200).json({});
});

app.listen(3000, () => {
  console.log('server is running');
});
