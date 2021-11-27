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
const postSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    posturl:{
        type: String,

    },
    Content: {
        type: String,
        required: true
    },

    ImageURL : {
        type: String, 
        default : '#'
    },
},
{
    collection: 'post'
});

var Post = mongoose.model('post', postSchema);
module.exports = Post