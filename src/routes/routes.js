const express = require("express");
const userModel = require('../models/user_schema');
const imageModel = require('../models//image_schema');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadImage = require('../cloudinary');
const fs = require('fs-extra');

app.get('/', async (req, res) => {
  const images = await imageModel.find()

  res.send({ images: images })
})

app.post('/upload', async (req, res) => {


  try {

    /*image.title = req.body.title,
  image.description = req.body.description,
  image.filename = req.file.filename,
  image.path = '/img/upload/' + req.file.filename,
  image.originalname = req.file.originalname,
  image.mimetype = req.file.mimetype,
  image.size = req.file.size;
*/
    const image = new imageModel();

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
    

      image.title = req.body.title
      image.description = req.body.description
      image.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      image.size = result.bytes
      //await fs.unlink(req.files.image.tempFilePath);
      await image.save();
      res.send('uploaded')
    }else{
      res.send('Hace falta una image')
    }
  } catch (error) {
    res.status(500).send(error);
  }

})

app.get('/image/:id', (req, res) => {

})
app.get('/image/:id/delete', (req, res) => {

})
app.post("/add_user", async (request, response) => {


  let body = request.body;
  let { name, user, email, password } = body;
  let usuario = new userModel({
    name,
    user,
    email,
    password: bcrypt.hashSync(password, 10)
  });
  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    response.json({
      ok: true,
      usuario: usuarioDB
    });
  })
});
app.post("/login", async (request, res) => {
  let body = request.body
  userModel.findOne({ email: body.email }, (erro, usuarioDB) => {
    if (erro) {
      return res.status(500).json({
        ok: false,
        err: erro
      })
    }
    // Verifica que exista un usuario con el mail escrita por el usuario.
    console.log(usuarioDB)
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o contraseña incorrectos"
        }
      })
    }
    // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
    console.log(usuarioDB.password)
    if (!bcrypt.compareSync(body.password, usuarioDB.password, 10)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o contraseña incorrectos"
        }
      });
    }
    // Genera el token de autenticación
    let token = jwt.sign({
      usuario: usuarioDB,
    }, 'este-es-el-seed-desarrollo', {
      expiresIn: '48h'
    })
    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
    })
  })
});
app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/usersby", async (request, response) => {
  const data = request.query.data;
  const campo = request.query.campo
  console.log(campo, data);
  const users = await userModel.findOne({ name: data });

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
