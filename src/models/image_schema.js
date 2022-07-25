const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image:{
      public_id: String, 
      secure_url: String
    },
    size: { type: Number},
    created_at: { type: Date, default: Date.now()},
  });
  
  const Image = mongoose.model("images", ImageSchema);
  
  module.exports = Image;