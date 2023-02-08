const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cors());

app.use('/', router);
app.use(errors());

app.listen('3000', () => {
  console.log('Server started');
});
