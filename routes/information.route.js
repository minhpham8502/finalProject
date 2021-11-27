var express = require('express');
var inforModel = require('../models/infor'); 
var inforRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');
const multerConf = require('../config/multer');
var fileModel =require('../models/file')
var docxConverter = require('docx-pdf');
const FileModel = require('../models/file')


const informationController = require('../controller/information.controller');
// inforModel.use(checkAuth);
inforRoute.get('/class', informationController.infor)
inforRoute.get('/edit', informationController.edit)

inforRoute.get('/create', informationController.crinfor)
inforRoute.post('/doinfor', informationController.doinfor)
inforRoute.post('/doedit', informationController.doedit)

inforRoute.post('/delete:id', informationController.delete)



inforRoute.post('/uploadmenu',multerConf.array('filePath', 2),(req,res)=>{
    let today = new Date();

        let currentDay = today.getDay() ;
        if(currentDay =="0"){
           var a = "Sunday"
        }else if(currentDay == "1"){
            var a =  "Monday"
        }else if(currentDay=="2"){
            var a = "Tuesday"
        }else if(currentDay=="3"){
            var a = "Wednesday"
        }else if(currentDay=="4"){
            var a = "Thursday"
        }else if(currentDay=="5"){
            var a = "Friday"
        }else if(currentDay=="6"){
            var a = "Saturday"
        }   
        let currentDate = today.getDate() ;
        let currentMonth1 = today.getMonth() +1;

       x = req.files[0].originalname

    if(req.files.length == 1 && x.endsWith('docx')){
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
 
      var menu = new fileModel({
          filePath :filePath,
          nameFile: req.body.nameFile,
          date: currentDate.toString() +'/'+ currentMonth1.toString(),
          classID: req.cookies.classID,
          type: "menu",


      });

      menu.save(function(err){
          if(err) throw err;
         
          return res.redirect('/information/class');
      });
    }else{
        let today = new Date();

        let currentDay = today.getDay() ;
        if(currentDay =="0"){
           var a = "Sunday"
        }else if(currentDay == "1"){
            var a =  "Monday"
        }else if(currentDay=="2"){
            var a = "Tuesday"
        }else if(currentDay=="3"){
            var a = "Wednesday"
        }else if(currentDay=="4"){
            var a = "Thursday"
        }else if(currentDay=="5"){
            var a = "Friday"
        }else if(currentDay=="6"){
            var a = "Saturday"
        }   
        

        let currentMonth = today.getMonth() +1;
        let currentDate = today.getDate() ;
   
        let currentMonth1 = today.getMonth() +1;
        let date =currentDate.toString() +'/'+ currentMonth1.toString()
        FileModel.find({type:"menu",date :currentDate.toString() +'/'+ currentMonth1.toString()},function(err,filedata){
            inforModel.find({date:date},(err,data)=>{     
                inforModel.findOne({date:date},(err,data1)=>{
                    if(data1){
                        let isCreate = false;
                        let isEdit = true;
            
                            res.render("./teacher/infor",{
                                data:data,
                                isCreate:isCreate,
                                filedata:filedata,
                                isEdit:isEdit,
                                errmess:true
                            })  
            
                        }else if(!data1) {
                        var isCreate = true;
                        let isEdit = false;
        
            
                            res.render("./teacher/infor",{data:data,isCreate:isCreate,
                                isEdit:isEdit,
                                filedata:filedata,
                                errmess:true
                            })  
                            
                        }
                })

               
    
            })
        })
         
        
    }
  })


module.exports = inforRoute