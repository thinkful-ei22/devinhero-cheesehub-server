'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//DB connection
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

//Routers
const cheeseRouter = require('./routes/cheeses');


//Create express app
const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//Mount routers
app.use('/api/cheeses', cheeseRouter);


//Custom 404 not found route
app.use((req, res, next) =>{
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//Custom Error Handler
app.use((err, req, res, next) =>{
  if(err.status){
    const errBody = Object.assign({}, err, {message: err.message});
    res.status(err.status).json(errBody);
  }else{
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
