const ClassModel = require('../models/class')
const AccountModel = require('../models/account')
const FileModel = require('../models/file')

const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;
var cookie = require('cookie');
const StudentModel = require('../models/student')
const inforModel = require('../models/infor')
class informationController{

    infor(req,res){
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

                            })  
            
                        }else if(!data1) {
                        var isCreate = true;
                        let isEdit = false;
        
            
                            res.render("./teacher/infor",{data:data,isCreate:isCreate,
                                isEdit:isEdit,
                                filedata:filedata,
                            })  
                            
                        }
                })

               
    
            })
        })
        

    }
    edit(req,res){
        let today = new Date();
        let currentDate = today.getDate() ;
   
        let currentMonth1 = today.getMonth() +1;
        let date =currentDate.toString() +'/'+ currentMonth1.toString()
        inforModel.find({date:date},function(err,data){
        res.render("./teacher/editinfor",{data:data})  
        })

    }
    crinfor(req,res){
        
        StudentModel.find({studentClass:req.cookies.classId},function(err,data){
        res.render("./teacher/follow",{data:data})  
        })

    }
    doinfor(req,res){
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
      

        let newinfor = inforModel({
            Weight:req.body.Weight,
            Height:req.body.Height,
            Health : req.body.Health,
            date: req.body.date,
            Details: req.body.Details,
            studentID: req.body.studentID,
            studentName: req.body.studentName,
            date : currentDate.toString() +'/'+ currentMonth1.toString()
        })
        newinfor.save(function(err,data){
            if(err){
                console.log(err)
            }else{
                // res.json(data)
                res.redirect('/information/class')
            }
        })

    }
    delete(req,res){
        
        FileModel.findByIdAndDelete({_id:req.params.id},function(){
       
        }).then(()=>{
            res.redirect('/information/class')  
        })

    }
    doedit(req,res){
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
      

        // let newinfor = inforModel({
        //     Weight:req.body.Weight,
        //     Height:req.body.Height,
        //     Health : req.body.Health,
        //     date: req.body.date,
        //     Details: req.body.Details,
        //     studentID: req.body.studentID,
        //     studentName: req.body.studentName,
        //     date : currentDate.toString() +'/'+ currentMonth1.toString()
        // })
        attendanceModel.updateMany({date:date, month :month},{$set : { 
            Weight:req.body.Weight,
            Height:req.body.Height,
            Health : req.body.Health,
            date: req.body.date,
            Details: req.body.Details,
            studentID: req.body.studentID,
            studentName: req.body.studentName,
            date : currentDate.toString() +'/'+ currentMonth1.toString()}}, function(err,data1){

        }).then(data1=>{
            res.redirect('/information/class' )
        })

    }
}

module.exports = new informationController