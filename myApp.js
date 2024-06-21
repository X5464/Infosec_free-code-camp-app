const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));

// Middleware to sanitize input using XSS filter
app.use((req, res, next) => {
  helmet.xssFilter()(req, res, next);
});

// Serve static files
app.use(express.static('public'));
app.disable('strict-transport-security');

const api = require('./server.js');
app.use('/_api', api);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Useful programmer Info Security App started on port ${port}`);
});
