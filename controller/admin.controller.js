const ClassModel = require('../models/class')
const AccountModel = require('../models/account')
const StudentModel = require('../models/student')
const DashboardtModel = require('../models/Dashboard')

const attendanceModel = require("../models/attendance");

const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');

var fileModel = require('../models/file');
const { findById } = require('../models/class');
var bcrypt = require('bcrypt');
const { response } = require('express');
const express = require('express');
var saltRounds = 10;
class AdminController {
    createAccount(req,res ){
        ClassModel.find({},function(data){
            
        }).then(data=>{
             res.render("admin/createAccount", {class:data})

        })
    }
    createStudent(req,res ){
        ClassModel.find({},function(data){

        }).then(data=>{
             res.render("admin/createStudent", {class:data})

        })
    }
    

    docreateAccount(req,res ){
        var password = req.body.password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        let classID = req.body.classId

        let newAccount = AccountModel({
            username: req.body.username,
            age: req.body.age,

            password :hash,
            email: req.body.email,
            classId: classID,
            role : "teacher",
            phone:req.body.phone,
            birthday:req.body.birthday,
            address:req.body.address,
            accountID: req.body.accountID,
            classID: req.body.classID
        })
        newAccount.save(function(err,data){
            if(err){
                console.log(err)
            }else{
                AccountModel.find({},function(err,data1){
                    DashboardtModel.findOneAndUpdate({db:"0"},{"soGiaovien": data1.length -1},function(err,data2){
                        res.redirect("/class/allclass")  
                        
                    })
                })
            }
        })
    }
    docreateStudent(req,res ){
        var password = req.body.password
        var role = req.body.Role
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        let classID = req.body.classID

        let newStudent = StudentModel({
            username: req.body.username,
            password :hash,
            age: req.body.age,
            email: req.body.email,
            phone:req.body.phone,
            address:req.body.address,

            studentName: req.body.studentName,
            studentBirthday: req.body.studentBirthday,
            studentAge: req.body.studentAge,
            studentClass:  req.body.studentClass,
            studentID: req.body.studentID
        })
        newStudent.save(function(err,data){
            if(err){
                console.log(err)
            }else{
                StudentModel.find({},function(err,data1){
                    DashboardtModel.findOneAndUpdate({db:"0"},{"soHocsinh": data1.length },function(err,data2){
                        res.redirect("/class/allStudent/" + req.body.studentClass)
                    
                    })
                })
            }
        })
    }
    

    addtoClass(req,res ){
        AccountModel.find({classID:"None",role:"student"},function(err,result){
            AccountModel.find({classID:"None",role:"teacher"},function(err,result2){
                AccountModel.find({classID:"None",role:"guest"},function(err,result4){
                    console.log(result4)
                    ClassModel.find({},function(err,result3){
                        res.render("admin/addtoClass.ejs",{data:result,data2:result2,class: result3,data3 : result4})
                    })
                })
            })
        })
    }
    doaddtoClass(req,res ){
        AccountModel.findOneAndUpdate({_id: req.params.id},{classID: req.body.classID},function(err,result){
            // res.send('<script>alert("Successfully added");window.back();</script>')
            res.redirect('/admin/addtoClass')
        })
    }
    chooseAttendance(req,res){
        let today = new Date();
        let currentDay = today.getDate() ;
        let currentMonth = today.getMonth() +1;
        let currentDate = today.getDate() ;
        let currentDate1 = today.getDate() -1 ;
        
        let currentMonth1 = today.getMonth() +1;

 
        attendanceModel.findOne({date:today.getDate() , month:today.getMonth() +1}, (err,data1)=> {
          

             attendanceModel.findOne({date:today.getDate() -1, month:today.getMonth() +1}, (err,data)=>{
                 if(data1 && data){
                    var isAttendace = false
                    var isEdit = true
                    var isEdit1 = true

                       res.render("./teacher/chooseAttendance",{
                        data:data,
                        data1:data1,
                        isAttendace : isAttendace,
                        isEdit1:isEdit1,
                        isEdit:isEdit
          

                    })
                 }else if(data1 && !data){
                    var isAttendace = false
                    var isEdit = true
                    var isEdit1 = false

                    res.render("./teacher/chooseAttendance",{
                     data:data,
                     data1:data1,
                     isAttendace : isAttendace,
                     isEdit:isEdit,
                     isEdit1:isEdit1,
       

                 })
                 }else{
                    var isAttendace = true
                    var isEdit = false
                    var isEdit1 = false

                    res.render("./teacher/chooseAttendance",{
                     data:data,
                     data1:data1,
                     isAttendace : isAttendace,
                     isEdit:isEdit,
                     isEdit1:isEdit1,
       
                 })
                }
               
    
             })
             
        })
        
    
    }     
    
    

    editAttendance(req,res){
        let today = new Date();
        let currentDate = today.getDate() ;
        let currentMonth = today.getMonth() +1;

        attendanceModel.findById({_id:req.params.id},function(err,data1){
            let date = data1.date

            let month = data1.month
            let day = data1.day
            let year = data1.year
      

            
            // attendanceModel.find({date:data1.date, month:data1.month}, function(data){
            // }).then(data=>{
            // })
        }).then((data1)=>{
            res.render("./teacher/editAttendance", {data1:data1})

        })

    }
    doEditAttendance(req,res){
        let today = new Date();
        let currentDate = today.getDate() ;
        let currentMonth = today.getMonth() +1;

        ///
        // attendanceModel.findById({ _id:req.params.id },function(err,data){
        //     var date = data.date
        //     var day = data.day
        //     var month = data.month
        //     var year = data.year
            attendanceModel.update({_id:req.params.id },{$set : {status: req.body.status}}, function(err,data1){

            }).then(data1=>{
                res.redirect('/admin/editAttendance/'+req.params.id )
            })
        //  })  
    }
    listEdit(req,res){
        let today = new Date();
        let currentDate = today.getDate() ;
        let currentMonth = today.getMonth() +1;
            attendanceModel.findById({_id:req.params.id}, function(err,data1){
                attendanceModel.find({date:data1.date,month:data1.month}, function(err,data){
                    res.render("./teacher/listEdit", {data:data})
                
                })
            })
    }
}
module.exports = new AdminController;