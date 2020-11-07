'use strict';

const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
const getDb = require('./database.js');
const checks = require('./function');

getDb.then(sensorCollection => {
  app.get('/measures', (req, res) => {
    sensorCollection.find().toArray()
      .then(result => {
        if (result.length === 0) {
          res.send({ status: 'No saved sensor data' });
        } else {
          res.send(result);
        };
      })
      .catch(error => console.error(error));
  });
  app.get('/measures/:time', (req, res) => {
    sensorCollection.find({ 'time': req.params.time }).toArray()
      .then(result => {
        if (result.length === 0) {
          res.send({ error: 'No sensor data found by given time' });
        } else {
          res.send(result[0].value);
        };
      })
      .catch(error => console.error(error));
  });
  app.post('/measures/:time/:value', (req, res) => {
    if (!checks.checkTime(req.params.time)) {
      res.send({ error: 'Time invalid' });
    } else if (!checks.checkMeasure(req.params.value)) {
      res.send({ error: 'Value invalid' });
    } else {
      req.params.time = JSON.stringify(req.params.time);
      req.params.value = JSON.stringify(req.params.value);
      sensorCollection.insertOne({ 'time' : req.params.time, 'value' : req.params.value });
      res.send({ status: 'Created' });
    }
  });
})
  .catch(error => console.error(error));

app.get('/', (req, res) => {
  res.redirect('/measures');
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});