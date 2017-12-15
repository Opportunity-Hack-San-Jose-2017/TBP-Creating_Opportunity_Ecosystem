const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const compression = require('compression');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression({filter: shouldCompress}));

app.use(express.static(path.join(__dirname, 'dist')));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false
  return compression.filter(req, res)
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));