// let {signUp} = require('../service/auth')
const { JsonWebTokenError } = require('jsonwebtoken');
const AccountModel = require('../models/account');
const StudentModel = require('../models/student');

const ClassModel = require('../models/class')
const fileModel = require('../models/file')
const inforModel = require('../models/infor')

const FileModel = require('../models/file')

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const { data } = require('jquery');
const ministryModel = require('../models/Ministry');
const DashboardtModel = require('../models/Dashboard');
const e = require('cors');
const saltRounds = 10;
// const { model } = require('../models/account');
let indexAdmin = (req,res)=>{
    let email = req.cookies.email
    AccountModel.findOne({email : email},function(err,data){
        AccountModel.find({role : "teacher"},function(err,data2){
        DashboardtModel.findOneAndUpdate({db : "0"},{soGiaovien : data2.length},function(err,data1){

        }).then((data1)=>{
            res.render('./home/homeAdmin',{account:data,data1:data1})

        })

    })
})
    
      
    
}

let indexMinistry = (req,res)=>{
    let email = req.cookies.email
    ministryModel.findOne({email : email})
    .then(data=>{
       
        res.render('./home/homeMinistry')
    })
}
let indexTeacher = (req,res)=>{
    let email = req.cookies.email
    let classID = req.cookies.classId

    AccountModel.findOne({email : email})
    .then(data=>{
        ClassModel.findOne({classID: classID},function(err, result){
            res.render('./home/homeTeacher',{account:data,class :result})
        })    
    })
}

let indexStudent = (req,res)=>{
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
            AccountModel.findOne({classId:req.cookies.studentClass},(err,data1)=>{
                if(data1){
                    let isCreate = false;
                    let isEdit = true;
                    user = req.cookies.email
        
                        res.render("./home/homeStudent",{
                            data:data,
                            isCreate:isCreate,
                            filedata:filedata,
                            isEdit:isEdit,
                            data1:data1,
                            user:user,


                        })  
        
                    }else if(!data1) {
                    var isCreate = true;
                    let isEdit = false;
                    user = req.cookies.email
    
        
                        res.render("./home/homeStudent",{data:data,isCreate:isCreate,
                            isEdit:isEdit,
                            filedata:filedata,
                            data1:data1,
                            user:user,

                        })  
                        
                    }
            })

           

        })
    })
}


let signUpController = async(req,res)=>{
    try {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        if(username && password){
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            let newaccount = AccountModel({
                username,
                password :hash,
                email:req.body.email
            })
            newaccount.save({
                
            });

        } 
        let token = jwt.sign({_id: req.body._id},'minh');
        res.cookie("token",token,{maxAge: 60*60*10000});
        return res.status(200).json({
            message : "Sign Up success",
            error : false
        })
    }catch(error) {
        if(error){
            res.status(400).json({
                message : "Sign Up fail",
                error: true
            })
        }
    }
}

let loginController = function(req,res){
    bcrypt.compare(req.body.password, req.user.password, function(err,result){
        if(err){
            res.redirect("/loginAgain")

        }
        if(result){
            let token = jwt.sign({_id : req.user._id},'minh',{expiresIn :'1d'})
            res.cookie("token",token,{maxAge: 24*60*60*10000});
            let user = req.user 
            res.cookie('email',user.email, { maxAge: 90000000, httpOnly: true });
            res.cookie('id',user._id, { maxAge: 90000000, httpOnly: true });
            res.cookie('classId',user.classId, { maxAge: 90000000, httpOnly: true });
            res.cookie('accountID',user.accountID, { maxAge: 90000000, httpOnly: true });

            if(user.role === "admin"){
                res.redirect("./indexAdmin")
            }
            if(user.role === "teacher"){
                console.log(user.studentClass   )
                res.redirect("./indexTeacher")
            }
                               
            }else{
                res.redirect("/loginAgain")
            }
        }
    )
}
let loginStudentController = function(req,res){
    bcrypt.compare(req.body.password, req.user.password, function(err,result){
        if(err){
            res.redirect("/loginStudentAgain")
        }
        if(result){
            let token = jwt.sign({_id : req.user._id},'minh',{expiresIn :'1d'})
            res.cookie("token",token,{maxAge: 24*60*60*10000});
            let user = req.user 
            console.log(user)
            res.cookie('email',user.email, { maxAge: 90000000, httpOnly: true });
            res.cookie('id',user._id, { maxAge: 90000000, httpOnly: true });
            res.cookie('studentClass',user.studentClass, { maxAge: 90000000, httpOnly: true });
            res.cookie('studentID',user.studentID, { maxAge: 90000000, httpOnly: true });
                 
                res.redirect("./indexStudent")
            
            
            }else{
            
                res.redirect("/loginStudentAgain")
            }
        }
    )
    
}
let loginMinistryController = function(req,res){
    bcrypt.compare(req.body.password, req.user.password, function(err,result){
        if(err){
            res.redirect("/loginMinistryAgain")

        }
        if(result){
            let token = jwt.sign({_id : req.user._id},'minh',{expiresIn :'1d'})
            let user = req.user 
            res.cookie("token",token,{maxAge: 24*60*60*10000});
    console.log(token)
      
            res.cookie('email',user.email, { maxAge: 90000000, httpOnly: true });
            res.cookie('id',user._id, { maxAge: 90000000, httpOnly: true });
            res.cookie('studentClass',user.studentClass, { maxAge: 90000000, httpOnly: true });
            res.cookie('studentID',user.studentID, { maxAge: 90000000, httpOnly: true });
                 
                res.redirect("./indexMinistry")
            
            
            }else{
      
                res.redirect("/loginMinistryAgain")
            }
        }
    )
    
}
let danhgiabaibao=function(req,res){
    let id = req.params.id
    fileModel.find({_id:id},(err,data)=>{
    if(err){
        console.log(err)
    }
    else if(data.length>0){
        res.render('class/view.ejs',{data:data})
    }
    else{
        res.render('class/view.ejs',{data:data})
    }
    })
}

module.exports ={
    signUpController,
    loginController,
    indexAdmin,
    indexTeacher,
    indexStudent,

    loginStudentController,
    danhgiabaibao,
    loginMinistryController,
    indexMinistry
}