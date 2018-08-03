
const express = require('express');


//Schema models
const Cheese = require('../models/cheese');


const router = express.Router();

router.get('/', (req, res, next)=>{
  
  const cheeseList = [
    'Bath Blue',
    'Barkham Blue',
    'Buxton Blue',
    'Cheshire Blue',
    'Devon Blue',
    'Dorset Blue Vinney',
    'Dovedale',
    'Exmoor Blue',
    'Harbourne Blue',
    'Lanark Blue',
    'Lymeswold',
    'Oxford Blue',
    'Shropshire Blue',
    'Stichelton',
    'Stilton',
    'Blue Wensleydale',
    'Yorkshire Blue'
  ];
  res.json(cheeseList);
  
});

module.exports = router;