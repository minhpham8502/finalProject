
const AccountModel = require('../models/account')
const StudentModel = require('../models/student')

const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
const mongodb = require("mongodb");
var fileModel = require('../models/file');
const chatModel = require('../models/chat');
const ClassModel = require('../models/class');

class messtController {
    list(req,res){
        ClassModel.findOne({teacherID: req.cookies.accountID})
        .then(data=>{
            StudentModel.find({studentClass: data.classID})
                .then((data)=>{
                    AccountModel.findOne({accountID:req.cookies.accountID})
                    .then(data2=>{
                   
                        res.render('./message/list_mess',{student : data, teacher: data2})

                    })
                    // console.log(data)
                })
        })

        
    }
    listCoordinator(req,res){
        AccountModel.find({studentClass: req.params.studentClass,role: "coordinator"})
        .then((data)=>{
            
            res.render('./message/list_coordinator',{account : data})
        })
    }
   
    detailTeacher(req, res){
        AccountModel.findOne({ email: req.cookies.email }, (err, cookies) => {
                StudentModel.findOne({ email: req.params.email }, (err, data) => {
                            var isFriend = true;
                            var isMessage = false;
                            chatModel.findOne( { $or:[ {'userSend':req.cookies.email,'userReceive':req.params.email}, 
                                                    {'userReceive':req.cookies.email,'userSend':req.params.email} ]}, 
                                function(err,kq){       
                                                
                            }).then(kq=>{
                                if(kq){
                                    isFriend = false
                                    isMessage = true
                                }             
                                res.render('./message/coordinator',{
                                    data: data,
                                    cookies: cookies,
                                    isFriend: isFriend,
                                    isMessage: isMessage
                                })
                            })
                            
                        })
                    })        
            }

            detailStudent(req, res){
                AccountModel.findOne({ email: req.cookies.email }, (err, cookies) => {
                        StudentModel.findOne({ email: req.params.email }, (err, data) => {
                                    // var isFriend = true;
                                    // var isMessage = false;
                                    chatModel.findOne( { $or:[ {'userSend':req.cookies.email,'userReceive':req.params.email}, 
                                                            {'userReceive':req.cookies.email,'userSend':req.params.email} ]}, 
                                        function(err,kq){       
                                                        
                                    }).then(kq=>{
                                        if(kq){
                                            // isFriend = false
                                            // isMessage = true
                                        }             
                                        res.render('./message/allStudent',{
                                            data: data,
                                            cookies: cookies,
                                            // isFriend: isFriend,
                                            // isMessage: isMessage
                                        })
                                    })
                                    
                                })
                            })        
                    }        

            get1 (req, res)  {
                var query1 = {
                    userSend: req.params.cookiesemail,
                    userReceive: req.params.user
                }
                const MongoClient = mongodb.MongoClient;
                MongoClient.connect('mongodb://localhost:27017/project', (err, db) => {
                    let dbo = db.db("project");
                    // find user send
                    dbo.collection("student").findOne({ email: req.params.cookiesemail}, (err, cookiesemail) => {
                        if (err) console.log(err);
                        // find user receive
                        dbo.collection("account").findOne({ email: req.params.user }, (err, user) => {
                            // find chat
                            dbo.collection("chats").find({userSend:req.params.cookiesemail}).toArray((err,list)=>{
                                dbo.collection("chats").findOne(query1, (err, result) => {
                                    if (result && cookiesemail.email=== req.cookies.email ) {
                                        // if(cookiesemail=== req.cookies.email){
                                            console.log(cookiesemail.studentClass)
                                            res.render("chat.ejs", {
                                                cookiesemail: cookiesemail,
                                                user: user,
                                                data: result,
    
                                            });
                                        // }else {
                                        //     res.render("chat1.ejs", {
                                        //         cookiesemail: cookiesemail,
                                        //         user: user,
                                        //         data: result,
    
                                        //     });
                                        // }
                                    } 
                                    else{
                                        res.redirect('/error')
                                    }
                                });
                            });
                        });
                    })
                 
                })
            } 

            get2 (req, res)  {
                var query1 = {
                    userSend: req.params.cookiesemail,
                    userReceive: req.params.user
                }
                const MongoClient = mongodb.MongoClient;
                MongoClient.connect('mongodb://localhost:27017/project', (err, db) => {
                    let dbo = db.db("project");
                    // find user send
                    dbo.collection("account").findOne({ email: req.params.cookiesemail, role :"teacher" }, (err, cookiesemail) => {
                        if (err) console.log(err);
                        // find user receive
                        dbo.collection("student").findOne({ email: req.params.user }, (err, user) => {

                            // find chat
                            dbo.collection("chats").find({userSend:req.params.cookiesemail}).toArray((err,list)=>{
                                dbo.collection("chats").findOne(query1, (err, result) => {
                                    // if (result && cookiesemail.email=== req.cookies.email && cookiesemail.classId === user.studentClass) {
                                        // if(cookiesemail=== req.cookies.email){
                                            res.render("chat1.ejs", {
                                                cookiesemail: cookiesemail,
                                                user: user,
                                                data: result,
    
                                            });
                                        // }else {
                                        //     res.render("chat1.ejs", {
                                        //         cookiesemail: cookiesemail,
                                        //         user: user,
                                        //         data: result,
    
                                        //     });
                                        // }
                                    // } 
                                    // else{
                                        
                                    //     res.redirect('/error')
                                    // }
                                });
                            });
                        });
                    })
                 
                })
            } 
}
module.exports = new messtController;