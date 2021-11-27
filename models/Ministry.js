var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/project';

// var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const ministrySchema = new Schema({
    // username: String,
    password: String,
    email : String,
   
},
{
    collection: 'ministry'
});

var ministryModel = mongoose.model('ministry', ministrySchema);
module.exports = ministryModel