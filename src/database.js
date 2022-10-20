const mongoose = require("mongoose");

const user = "mhuser"
const pass = "WYxe4L4wZMkmfLil"
const dbname = "instagrem_fv"
var {MONGODB_USER, MONGODB_PASS, MONGODB_DBNAME } = require('./config');
mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.c2n65o7.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db;