
const express = require("express");
const Router = require("./routes/routes")
const dbConexion = require("./database")
const multer = require("multer");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");

const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.set('port', process.env.PORT || 3000);
  // default  port to listen  for requests 



//public 
app.use(express.static(path.join(__dirname, 'public')));

//middleware 
app.use(express.urlencoded({extended:false}));
/*const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/upload'),
  filename:(req,file,cb,fillname) =>{
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})
app.use(multer({storage: storage }).single('image'));*/

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/public/img/upload/'
}));

dbConexion;
app.use(Router);


app.listen(app.get('port'), ()=> console.log('listening on port'+ app.get('port')));