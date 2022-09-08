const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
    title: { type: String },
    admin:{type: Boolean},
    description: { type: String },
    image:{
      public_id: String, 
      secure_url: String
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    size: { type: Number},
    created_at: { type: Date, default: Date.now()},
  });
  
  const Image = mongoose.model("images", ImageSchema);
  
  module.exports = Image;