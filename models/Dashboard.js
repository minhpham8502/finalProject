var mongoose = require("mongoose");
//const { stringify } = require("querystring");
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://minhpham852000:Quangminh2000@cluster0.46ara.mongodb.net/test";
const url = 'mongodb://localhost:27017/project';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const DashboardSchema = new Schema({
    soHocsinh:  {
        type : String,
        default : "0"
    },
    soLop:  {
        type : String,
        default : "0"
    },
    soGiaovien:  {
        type : String,
        default : "0"
    },
    hocsinhcualop23:  {
        type : String,
        default : "0"
    },
    hocsinhcualop34:  {
        type : String,
        default : "0"
    },
    hocsinhcualop45:  {
        type : String,
        default : "0"
    },
    hocsinhcualop56:  {
        type : String,
        default : "0"
    },
    fail:  {
        type : String,
        default : "0"
    },

    facultyID: String
},
{
    collection: 'Dashboard'
});

var DashboardtModel = mongoose.model('Dashboard', DashboardSchema);
module.exports = DashboardtModel