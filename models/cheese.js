const mongoose = require('mongoose');

const cheeseSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

cheeseSchema.set('timestamps', true);

cheeseSchema.set('toObject',{
  virtuals: true,
  versionKey: false,
  transform: (document, ret) =>{
    delete ret._id;
  }
});

module.exports = mongoose.model('Cheese', cheeseSchema);