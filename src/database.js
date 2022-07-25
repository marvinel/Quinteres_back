const mongoose = require("mongoose");

const user = "mhuser"
const pass = "WYxe4L4wZMkmfLil"
const dbname = "instagrem_fv"

mongoose.connect(`mongodb+srv://mhuser:${pass}@cluster0.c2n65o7.mongodb.net/${dbname}?retryWrites=true&w=majority`,
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