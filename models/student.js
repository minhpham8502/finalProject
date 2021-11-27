var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/project";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    password: String,
    email : String,
    username: String,
    age : String,
    phone: String,
    address : String,
    birthday : String,
    
    studentName :String,
    studentBirthday: String,
    studentAge :String,
    studentClass :String,
    studentID :String,

},
{
    collection: 'student'
});

var StudentModel = mongoose.model('student', StudentSchema);
module.exports = StudentModel