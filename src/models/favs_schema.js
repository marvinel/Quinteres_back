const mongoose = require("mongoose");
const FavSchema = new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    images:[{
        imgid: mongoose.Schema.Types.ObjectId,
        secure_url: String,
        
      }]
  });
  
  const Favs = mongoose.model("favs", FavSchema);
  
  module.exports = Favs;