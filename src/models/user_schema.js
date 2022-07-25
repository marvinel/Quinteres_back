const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true,' el nombre es necesario'],
    },
    user: {
        type: String,
        required: [true,' el usuario es necesario'],
      },
    email: {
      type: String,
      unique: true,
      required: [true,' el correo es necesario'],
     
    },
    password: {
      type: String,
      required: [true, "Le contraseña es obligatoria"],
  },
  });
  
  const User = mongoose.model("users", UserSchema);
  
  module.exports = User;