var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";
const url = 'mongodb://localhost:27017/project';


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);


var picSchema= new mongoose.Schema({
    filePathdoc:String,
    filePath:String,
    nameFile : String,
    email: String,
    date: String,
    description: String,

    classID :String,
    type :String,
    

})

var picModel = mongoose.model('file',picSchema);

module.exports = picModel
