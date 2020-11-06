'use strict';

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.DB_URL;

const getDatabase = () => {
  return MongoClient.connect(dbUrl, { useUnifiedTopology: true })
    .then(client => {
      const gammaDb = client.db('gamma_db');
      const sensorCollection = gammaDb.collection('sensor');
      console.log('Connected to Database');
      return sensorCollection
    }
  )};

module.exports = getDatabase();