
const express = require("express");
const Router = require("./routes/routes")
const dbConexion = require("./database")
const multer = require("multer");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
var { PORT} = require('./config');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.set('port', PORT);
  // default  port to listen  for requests 



//public 
app.use(express.static(path.join(__dirname, 'public')));

//middleware 
app.use(cors())
app.use(express.urlencoded({extended:false}));


app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/public/img/upload/'
}));

dbConexion;
app.use(Router);


app.listen(app.get('port'), ()=> console.log('listening on port'+ app.get('port')));