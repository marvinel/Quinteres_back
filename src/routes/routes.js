const express = require("express");
const userModel = require('../models/user_schema');
const imageModel = require('../models//image_schema');
const favModel = require('../models/favs_schema');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadImage = require('../cloudinary');
const fs = require('fs-extra');
const checkAuth = require('./middleware/checkAuth');


//AÑADIR NUEVO USUARIO
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
      return response.json({
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

//INICIAR SESION
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

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o contraseña incorrectos"
        }
      })
    }
    // Valida que la contraseña escrita por el usuario, sea la almacenada en la db

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

// DEVUELVE TODAS LAS IMAGENES
app.get('/', async (req, res) => {
  const images = await imageModel.find()

  res.send({ images: images })
})

//INFORMACION DE UN USUARIO CON SUS RESPECTIVAS IMAGENES
app.get("/perfil", async (req, res) => {

  try{

 
  const token = req.headers.authorization?.split(' ').pop();
  console.log(token)
  const decoded = jwt.decode(token,"este-es-el-seed-desarrollo")
  let id = '';
  
  if(req.query.id){
    id = req.query.id;
  }else{
    id = decoded?.usuario._id;
  }
  const user = await userModel.findById(id).populate('images', {
    image: 1,
    title: 1,
    description: 1
  })
  res.json(user)
} catch (error) {
  res.status(500).send(error);
}

})

//CARGAR NUEVA IMAGEN
app.post('/upload', async (req, res) => {

  const userid = req.body.userId;

  const user = await userModel.findById(userid)

  try {

    const image = new imageModel();

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)

      image.user = user._id
      image.title = req.body.title
      image.description = req.body.description
      image.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      image.size = result.bytes
      //await fs.unlink(req.files.image.tempFilePath);
      const savedimage = await image.save();

      user.images = user.images.concat(savedimage._id)
      await user.save()
      res.send('uploaded')
    } else {
      res.send('Hace falta una image')
    }
  } catch (error) {
    res.status(500).send(error);
  }

})

//AÑADIR IMAGEN A FAVORITA
app.post('/addfav/:imageid', async(req,res)=>{

  try{


  const fav = new favModel();
  const decoded = jwt.decode(req.body.token,"este-es-el-seed-desarrollo")
  const user = await favModel.findOne({user: decoded.usuario._id})
console.log(user)
  if(user){
    user.images = user.images.concat(req.params.imageid)
   await user.save()
   res.send({favs: user.images})
  }else{
    fav.user = decoded.usuario._id;
    fav.images =req.params.imageid;
    await fav.save()
    res.send({favs: fav.images})
  }
  
  console.log(fav +" id: "+  decoded.usuario._id+ "imageid: "+ req.params.imageid)
}catch (error){
  res.status(500).send(error);
}
})

app.get('/favs', async(req,res)=>{
  const token = req.headers.authorization.split(' ').pop();
  console.log(token)
  const decoded = jwt.decode(token,"este-es-el-seed-desarrollo")

console.log(decoded)
  const favs = await favModel.findOne({user: decoded.usuario._id})

  res.send({ favs: favs.images })
})
app.post('/deletefavs', async(req,res)=>{
  const favs = await favModel.findOne({user: req.body.userid})

  const deletefav = favs.images.filter((item) => item != req.body.imageid)
  favs.images = deletefav;
  favs.save()
  res.send({ favs: deletefav })
})



app.get('/image/:id', (req, res) => {

})


app.get('/image/:id/delete', (req, res) => {

})




app.get("/users", checkAuth, async (request, response) => {
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

  const users = await userModel.findOne({ name: data });

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
