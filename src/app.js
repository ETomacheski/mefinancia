const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors')

require('./database/index');

require('dotenv').config();

app.use(cors({
	origin: '*'
}));

app.use(bodyParser.json());


app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

app.use(routes);

module.exports = app;