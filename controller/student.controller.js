const ClassModel = require('../models/class')
const AccountModel = require('../models/account')
const FileModel = require('../models/file')

const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;
var cookie = require('cookie');
const StudentModel = require('../models/student')
const takeClassModel = require('../models/takeclass')
const DashboardtModel = require('../models/Dashboard')



let update =(req,res)=>{
    // AccountModel.findById(req.params.id)
    //     .then(data=>
    //         res.render('student/updatestudent',{account:data})
    //     )
   StudentModel.findById(req.params.id)
    .then((data)=>
        ClassModel.find(function(err,data){
        }).then(data1=>{
        res.render('student/updatestudent',{student:data,class:data1})

        })
    )
}
let deleteStudent = (req,res)=>{
    StudentModel.findById({_id:req.params.id},function(err,data){
        let studentClass = data.studentClass
        let email = data.email
        StudentModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            StudentModel.find({},function(err,data1){
                DashboardtModel.updateOne({db:"0" },{soHocsinh:data1.length},function(){
                    res.redirect('/class/allStudent/'+ studentClass)
    
                })
            })
            
        })
    })
    
    
}
let doupdate =(req,res)=>{
    StudentModel.updateOne({_id : req.params.id}, req.body)
    .then(()=>{

            res.redirect('/class/allStudent/'+ req.body.studentClass)



    })
}
let detailStudent=(req,res)=>{
    StudentModel.findById({_id : req.params.id},function(){

    }).then(data=>{
        res.render('student/detailStudent', {student:data})
    })
}
let dotakeclass=(req,res)=>{


    let newStudent = takeClassModel({
        username: req.body.username,

        age: req.body.age,
        email: req.body.email,
        phone:req.body.phone,
        address:req.body.address,

        studentName: req.body.studentName,
        studentBirthday: req.body.studentBirthday,
        studentAge: req.body.studentAge,

    })
    newStudent.save(function(err,data){
        if(err){
            console.log(err)
        }else{
            // StudentModel.find({studentID:data.studentID},function(data){})
            // .then(data=>{
            //     if(data){
            //     res.redirect("admin/createStudent")
            //     }else{
            //         console.log(data.cla)

            //     }
            // })
            // res.send('<script>alert("Online enrollment successful")</script>');
            res.redirect('/')
       
        }
    })
    
}
let deletetakeclass =(req,res)=>{
    takeClassModel.findByIdAndDelete({_id : req.params.id},function(){

    }).then(()=>{
        res.redirect('/student/enrollment')
    })
}
let enrollment =(req,res)=>{
    takeClassModel.find({},function(data){

    }).then(data=>{
        res.render('student/enrollment', {student:data})
    })
}


let doaddStudent =(req,res)=>{
    takeClassModel.findById({_id : req.params.id},function(err,data1){
        ClassModel.find({},function(err,data){
            res.render("admin/createStudent", {class:data,data:data1})

        })
    })
}
module.exports ={
    doupdate,
    deleteStudent,
    update,
    detailStudent,
    dotakeclass,
    deletetakeclass,
    doaddStudent,
    enrollment,


    
}