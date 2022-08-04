const mongoose = require("mongoose");
const FavSchema = new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    images:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images'
      }]
  });
  
  const Favs = mongoose.model("favs", FavSchema);
  
  module.exports = Favs;