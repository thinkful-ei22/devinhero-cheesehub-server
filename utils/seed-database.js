const mongoose = require('mongoose');

const {DATABASE_URL} = require('../config');

const Cheese = require('../models/cheese');
const seedCheese = require('../db/seed/cheeses');

mongoose.connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Cheese.insertMany(seedCheese);
  })
  .then(results =>{
    console.info('Initialized db with Cheese');
  })
  .then(() => mongoose.disconnect())
  .catch(err =>{
    console.error(err);
  });