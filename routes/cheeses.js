
const express = require('express');


//Schema models
const Cheese = require('../models/cheese');


const router = express.Router();

router.get('/', (req, res, next)=>{
  
  Cheese.find().sort('name')
    .then(results =>{
      return res.json(results);
    })
    .catch(err =>{
      next(err);
    });
});


router.get('/:id', (req, res, next)=>{
  const id = req.params.id;
  Cheese.findOne({_id: id})
    .then(results =>{
      if(results) res.json(results);
      else next();
    })
    .catch(err =>{
      next(err);
    });
});

router.post('/', (req, res, next)=>{
  const validFields = ['name'];
  const newObj = {};

  validFields.forEach(field=>{
    if(field in req.body)
      newObj[field] = req.body[field];
  });
  
  //Make sure name exists
  if(!newObj.name){
    const err = new Error('Missing `name` in request body');
    err.status = 500;
    return next(err);
  }

  //Trim name
  newObj.name = newObj.name.trim();
  console.log(newObj);
  Cheese.create(newObj)
  .then(results =>{
    res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
  })
  .catch(err =>{
    if(err.code === 11000){
      err = new Error('The folder name already exists');
      err.status = 400;
    }
    next(err);
  })
  ;

});

module.exports = router;