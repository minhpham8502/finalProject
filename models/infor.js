var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";
const url = 'mongodb://localhost:27017/project';


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);


var inforSchema= new mongoose.Schema({
    Weight:String,
    Height:String,
    Health : String,
    date: String,
    Details: String,
    studentID: String,

    classID :String,
    studentName :String

})

var inforModel = mongoose.model('infor',inforSchema);

module.exports = inforModel
