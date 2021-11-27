var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";
const url = 'mongodb://localhost:27017/project';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);


var takeClassSchema= new mongoose.Schema({
    email : String,
    username: String,
    age : String,
    phone: String,
    address : String,
    birthday : String,
    
    studentName :String,
    studentBirthday: String,
    studentAge :String,
})

var takeClassModel = mongoose.model('takeClass',takeClassSchema);

module.exports = takeClassModel