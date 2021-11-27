const ClassModel = require('../models/class')
const AccountModel = require('../models/account')
const attendanceModel = require('../models/attendance')
const fileModel = require('../models/file')
const DashboardtModel = require('../models/Dashboard')

const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;


let allplans =(req,res)=>{
    fileModel.find({type:"doc"})
    .then((data)=>
       
        res.render('teacher/allplans',{data:data})

        
    )
}
let update =(req,res)=>{
    AccountModel.findById(req.params.id)
    .then((data)=>
        ClassModel.find(function(err,data){
        }).then(data1=>{
        res.render('teacher/updateteacher',{teacher:data,class:data1})

        })
    )
}
let deleteteacher = (req,res)=>{
    AccountModel.findById({_id:req.params.id},function(err,data){
        let classId = data.classId
        AccountModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            AccountModel.find({},function(err,data1){
                DashboardtModel.updateOne({db:"0" },{soHocsinh:data1.length},function(){
            res.redirect('/class/allStudent/'+ classId)
                })
            })
        })
    })
    
    
}

let profile =(req,res)=>{
    
    AccountModel.updateOne({
        _id : req.params.id
    }, req.body)
    .then(()=>{
        res.render('./teacher/teacher_profile/')
    })
}
let doupdate =(req,res)=>{
    AccountModel.findById({_id : req.params.id},function(err,data){
        AccountModel.updateOne({_id : req.params.id}, req.body,function(err,data1){
             res.redirect('/class/allStudent/'+ data.classId)
            
        })
    })
        
 
  
}

let attendance =(req,res)=>{
    let today = new Date();

    let currentMonth = today.getMonth() +1;
    console.log(req.cookies.accountID)
    attendanceModel.find({accountID_attendance: req.cookies.accountID, month:currentMonth},function(data){

    }).then(data=>{
        res.render("./teacher/checkattendance", {teacher:data})
       

    })
}
let preattendance =(req,res)=>{
    let today = new Date();

    let currentMonth = today.getMonth() ;
    console.log(req.cookies.accountID)
    attendanceModel.find({accountID_attendance: req.cookies.accountID, month:currentMonth},function(data){

    }).then(data=>{
        res.render("./teacher/preattendance", {teacher:data})
       

    })
}
let Attendance= (req,res)=>{
    let today = new Date();
    let currentDate = today.getDate() ;
    let currentMonth = today.getMonth() +1;


    attendanceModel.findOne({date:currentDate, month:currentMonth,accountID_attendance:req.cookies.accountID}, function(data1){

    })
    .then(data1=>{
        if(data1){

            res.redirect("/teacher/attendance")

        }else{
            
            AccountModel.find({accountID:req.cookies.accountID},function(data){

            }).then(data=>{

                   

                res.render("./teacher/attendance", {teacher:data})
    
            })
        }
    })

}
let doAttendance=(req,res)=>{
    let today = new Date();

    console.log(today)
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
    
    console.log(currentDay)
    let currentDate = today.getDate() ;
    console.log(currentDate)
    let currentMonth = today.getMonth() +1;
    console.log(currentMonth)
    let currentYear = today.getFullYear() ;
    console.log(currentYear)
    

    let newAttendance = attendanceModel({
        accountID_attendance: req.cookies.accountID,
        day: a,
        date: currentDate,
        month:currentMonth,
        year: currentYear,
        status: req.body.status,
    
    })

   newAttendance.save(function(err,data){
        res.redirect('/teacher/attendance')

   })
}
module.exports ={
    doupdate,
    deleteteacher,
    update,
    attendance,
    preattendance,
    Attendance,
    allplans,
    doAttendance,
    profile
}