var mongoose = require('mongoose')


var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/project';

// var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;
const ClassSchema = new Schema({ 
    classname : String,
    classID: String,
    deadline:String,
    deadline2:String,
    teacherID :String,
    category:String
},{
    collection : 'classs',
    timestamps : true
});

var ClassModel = mongoose.model('class', ClassSchema)
module.exports = ClassModel