var express = require('express')
var fileRouter = express.Router()
var fileModel = require('../models/file')
var multer =  require('multer');
const Post = require('../models/post')
const mailer = require('../ultis/mailer')
var bodyParser = require('body-parser');


let {checkAuth } = require('../middleware/index')
const {checkAdmin} = require('../middleware/index');

var AccountModel = require('../models/account')
const nodemailer =  require('nodemailer');
const ClassModel = require('../models/class')
//word to pdf:  npm i docx-pdf
//have to install: npm i phantomjs-prebuilt 
var docxConverter = require('docx-pdf');
fileRouter.use('/uploads', express.static('uploads'));
var path = require('path');
var pathh = path.resolve(__dirname,'public');
fileRouter.use(express.static(pathh));
fileRouter.use(bodyParser.urlencoded({extended:false}));

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        var namefile = file.originalname
        cb(null,file.originalname)
    }
})
var upload = multer({storage:storage})

fileRouter.get('/sendMail',(req,res)=>{
    res.render('formMail.ejs')
})
fileRouter.post('/mail',async (req,res)=>{
    try {
        to = "minhpqgch18572@fpt.edu.vn"
        subject = req.body.subject
        body = req.body.body
        await mailer.sendMail( to,subject, body)
        res.redirect('/file/sendMail')
      } catch (error) {

        console.log(error)

      }
})

fileRouter.get('/fileMinistry',(req,res)=>{
    let email = req.cookies.email
    fileModel.find({type:"ministry"},(err,data)=>{
        if(err){
            console.log(err)
        }
      
        else{
            res.render('uploadFileMinistry.hbs',{data:data})
        }
    })
})
fileRouter.post('/uploadFileMinistry',upload.array('filePath',1),(req,res)=>{
    x = req.files[0].originalname
        if(req.files.length == 1 && x.endsWith('docx')){
            if(x.endsWith('docx')){
                xdoc ='uploads/'+  req.files[0].originalname
                var x1 = './public/' + xdoc
                var xx = x1.split('.');
                filePath1 = '.' + xx[1] + '.pdf'
                var filePath = xdoc.split('.');
                filePath = filePath[0] + '.pdf'
                docxConverter(x1,filePath1,function(err,result){
                    if(err){
                      console.log(err);
                    }
                });
            }
        
            let email = req.cookies.email
            var temp = new fileModel({
                filePathdoc: xdoc,
                filePath:filePath,
                nameFile : x,
                email: email,
                date : req.body.date,
                description : req.body.description,
                type:"ministry"

            })
            temp.save((err)=>{
                if(err){
                    console.log(err)
                }
              
            res.redirect('/file/fileMinistry')
            })
        }else{
            fileModel.find({type:"ministry"},(err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.render('uploadFileMinistry.hbs',{data:data, errmess:true})
                }
            })
        } 
 
})
fileRouter.use(checkAuth)

fileRouter.use(checkAdmin);

fileRouter.get('/file',(req,res)=>{
    let email = req.cookies.email
    fileModel.find({type:"doc"},(err,data)=>{
        if(err){
            console.log(err)
        }
        // else if(data.length>0){
        //     res.render('uploadFile',{data:data})
        // }
        else{
            res.render('uploadFile',{data:data})
        }
    })
})
fileRouter.get('/Officialdispatch',(req,res)=>{
    let email = req.cookies.email
    fileModel.find({type:"ministry"},(err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('./admin/dispatch.hbs',{data:data})
        }
        else{
            res.render('./admin/dispatch.hbs',{data:data})
        }
    })
})

fileRouter.get('/fileSubmited',(req,res)=>{
    let email = req.cookies.email
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate().toString().padStart(2, "0");;
    let month = (date_ob.getMonth() + 1).toString().padStart(2, "0");
    let hour = date_ob.getHours().toString().padStart(2, "0");;
    let minutes = date_ob.getMinutes().toString().padStart(2, "0");;
    let year = date_ob.getFullYear();
    dl = year + "-" + month + "-" + date + " " + hour + ":" + minutes;
    ClassModel.findOne({},function(err,result){
        fileModel.find({studentemail:email},(err,data)=>{
            if(err){
                console.log(err)
            }
            else if(data.length>0){
                a = result.deadline2
                b = result.deadline
                if(dl < result.deadline2  ){
                    res.render('file/fileSubmited.ejs',{data:data, deadline2:a,deadline:b })
                } else{
                    res.render('file/fileSubmitedkhongnop2nd.ejs',{data:data,deadline2:a,deadline:b})
                }
            }
            else{
                a = result.deadline2
                b = result.deadline
                if(dl < result.deadline2  ){
                    res.render('file/fileSubmited.ejs',{data:data, deadline2:a,deadline:b})
                } else{
                    res.render('file/fileSubmitedkhongnop2nd.ejs',{data:data,deadline2:a,deadline:b})
                }
            }
        })
    })
    
})

// set up mail sever
// var transporter =  nodemailer.createTransport({ 
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: true,
//     auth: {
//         user: 'minhpham852000@gmail.com', 
//         pass: 'Quangminh2000' 
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
//     });


fileRouter.post('/upload',upload.array('filePath',1),(req,res)=>{
    x = req.files[0].originalname
        if(req.files.length == 1 && x.endsWith('docx')){
            if(x.endsWith('docx')){
                xdoc ='uploads/'+  req.files[0].originalname
                var x1 = './public/' + xdoc
                var xx = x1.split('.');
                filePath1 = '.' + xx[1] + '.pdf'
                var filePath = xdoc.split('.');
                filePath = filePath[0] + '.pdf'
                docxConverter(x1,filePath1,function(err,result){
                    if(err){
                      console.log(err);
                    }
                });
            }
            let email = req.cookies.email
            var temp = new fileModel({
                filePathdoc: xdoc,
                filePath:filePath,
                nameFile : x,
                email: email,
                date : req.body.date,
                description : req.body.description,
                type:"doc"

            })
            temp.save((err,data)=>{
                if(err){
                    console.log(err)
                }
                return res.redirect('/file/file')

            }) 
        }else{
            fileModel.find({type:"doc"},(err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.render('uploadFile',{data:data, errmess:true})
                }
            })
        }
            

})

//download zip
fileRouter.get('/lol:classID',(req,res)=>{
    classID = req.params.classID
    fileModel.find({classID:classID},(err,data)=>{
        res.render('marketingmanager/selectfiletodownload.ejs',{data:data})
    })
})


var file_system = require('fs');
var archiver = require('archiver');
fileRouter.post('/abc',(req,res)=>{
    var classID = "public/"+  req.body.classID + ".zip"
    var name = req.body.classID + ".zip"
    console.log("ssssssssssssss:",name)
    var output = file_system.createWriteStream(classID);
    var archive = archiver('zip');
    var a = req.body.hobby
    output.on('close', function () {

    });
    archive.on('error', function(err){
        throw err;
    });
    archive.pipe(output);
        for(var n = 1; n <a.length; n++ ){
            file = "public/" +  a[n]
            console.log("file name là:", file)
            archive.append(file_system.createReadStream(file), { name: file })
        }
    archive.finalize();   
        res.redirect('./abc1/'+ name)
})

fileRouter.get('/abc1/:name',(req,res)=>{
            var name = req.params.name
            var x = __dirname.replace('routes','public/') + name
            res.download(x)
        }
)
module.exports = fileRouter