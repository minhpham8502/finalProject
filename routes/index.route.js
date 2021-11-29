var express = require('express');
var indexrouter = express.Router();
let {getUserById} = require('../middleware/index')
var jwt = require("jsonwebtoken")
var AccountModel = require('../models/account')
var Post = require('../models/post')
var takeClassModel = require('../models/takeclass')

indexrouter.get('/takeclass' ,(req,res,next)=>{
    res.render('./student/takeclass.hbs')
})
indexrouter.get('/login' ,(req,res,next)=>{
    res.render('login.hbs')
})
indexrouter.get('/loginAgain' ,(req,res,next)=>{
    res.render('loginAgain.hbs')
})
indexrouter.get('/loginStudentAgain' ,(req,res,next)=>{
    res.render('loginStudentAgain.hbs')
})
indexrouter.get('/loginMinistry' ,(req,res,next)=>{
    res.render('./home/loginMinistry.hbs')
})
indexrouter.get('/loginMinistryAgain' ,(req,res,next)=>{
    res.render('./home/loginMinistryNew.hbs')
})
indexrouter.get('/' ,(req,res)=>{
    Post.find({}, function(err,posts){

    }).then(posts=>{
        res.render('index.ejs',{posts:posts})
    })
})

indexrouter.get('/post:id' ,(req,res)=>{
    // Post.find({}, function(err,posts){
      
    // }).then((posts)=>{
        Post.findById({_id:req.params.id}, function(err,data1){
            var str = data1.Content.length  -7
            var content1 = data1.Content
            var content = content1.substr(3, str )
            Post.findById({_id:req.params.id}, function(err,data){
                res.render('post.hbs',{
                    data:data,
                   content:content})

            })



        
        })

    // })
})
indexrouter.get('/home',async function (req,res){
    try {
        var token = req.cookies.token || req.body.token
        let decodeAccount = jwt.verify(token,'minh')
        let user = await getUserById(decodeAccount._id)
        if(user.role === "admin"){
            return res.render("home/homeAdmin")
        }
        if(user.role === "student"){
            return res.render("home/homeStudent")
        }
        if(user.role === "teacher"){
            return res.render("home/homeTeacher")
        }
        
    } catch (error) {
        res.status(500).json({
            message : "hay dang nhap",
            status: 500,
            error : true
        },
        )
    }
})
module.exports = indexrouter