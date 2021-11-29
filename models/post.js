var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/project";

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