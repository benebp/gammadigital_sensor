'use strict';

const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
let getDb = require('./database.js');

getDb.then(sensorCollection => {
  app.get('/records', (req, res) => {
    sensorCollection.find().toArray()
      .then(result => {
        if (result.length === 0) {
          res.send({ status: 'No saved records' });
        } else {
          res.send(result);
        };
      })
      .catch(error => console.error(error));
  });
  app.get('/records/:id', (req, res) => {
    sensorCollection.find({ 'id': req.params.id }).toArray()
      .then(result => {
        if (result.length === 0) {
          res.send({ error: 'No record found by given ID' });
        } else {
          res.send(result[0]);
        };
      })
      .catch(error => console.error(error));
  });
  app.post('/records', (req, res) => {
    if (!req.body.id) {
      res.send({ error: 'No ID given' });
    } else {
      sensorCollection.find({ 'id': req.body.id }).toArray()
        .then(result => {
          if (result.length !== 0) {
            res.send({ error: 'Given ID already exists' });
          } else {
            req.body.id = JSON.stringify(req.body.id);
            sensorCollection.insertOne(req.body);
            res.send({ status: 'Created' });
          };
        })
        .catch(error => console.error(error));
    }
  });
})
  .catch(error => console.error(error));

app.get('/', (req, res) => {
  res.redirect('/sensor');
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});