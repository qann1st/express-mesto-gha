const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen('3000', (req, res) => {
  console.log('Server started');
});
