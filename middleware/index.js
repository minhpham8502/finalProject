// let { checkEmail} = require('../service/auth')
// let accountmodel = require('../models/account');
let AccountModel = require('../models/account');
var jwt = require('jsonwebtoken');
const ClassModel = require('../models/class');
const StudentModel = require('../models/student');
const Ministry = require('../models/Ministry');
const ministryModel = require('../models/Ministry');

// let checkEmail = (email)=>{
//     return AccountModel.findOne({email:email})

// }
let isEmail = async (req,res,next)=>{
    try {
        // let user = await checkEmail(req.body.email) 
        let user = req.body.email;
        await AccountModel.findOne({
            email:user
        }).then(user=>{
            if(!user){
                next();
            }else{
                return res.status(400).json({
                    message : "Email already exists",
                    status: 400,
                    error : true,
                })
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })

    }
}
let checkClassID = async (req,res,next)=>{
    try {
        // let user = await checkEmail(req.body.email) 
        let classID = req.body.classID;
        await ClassModel.findOne({
            classID:classID
        }).then(classID=>{
            if(!classID){
                next();
            }else{
                return res.status(400).json({
                    message : "Class already exists",
                    status: 400,
                    error : true,
                })
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })

    }
}

let checkLogin = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await AccountModel.findOne({
            email:user
        })
        // let user = await checkEmail(req.body.email)
        .then(user=>{
            if(!user){
                var message= "Username or password is invalid"
                res.render("login",{message:message
                }) 

            }else{
                req.user = user

                next();
            }
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })
    }
}
let checkStudentLogin = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await StudentModel.findOne({
            email:user
        })
        // let user = await checkEmail(req.body.email)
        .then(user=>{
            if(!user){
                var message= "Username or password is invalid"
                res.render("login",{message:message
                }) 

            }else{
                req.user = user

                next();
            }
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })
    }
}

let checkMinistryLogin = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await ministryModel.findOne({
            email:user
        })
        // let user = await checkEmail(req.body.email)
        .then(user=>{
            if(!user){
                var message= "Username or password is invalid"
                res.render("./home/loginMinistry.hbs",{message:message
                }) 

            }else{

                req.user = user

                next();
            }
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })
    }
}
let getUserById = function getUserById(id){
    return AccountModel.findOne({_id:id})
}
let getUserById1 = function getUserById(id){
    return ministryModel.findOne({_id:id})
}
let checkAuthMinistry = async (req,res,next)=>{
    try {
        var token = req.cookies.token || req.body.token
        let decodeAccount = jwt.verify(token,'minh')
        let user = await getUserById1(decodeAccount._id)
        console.log(user)
        if(user){
            req.userLocal = user;
        console.log(user)

            next();
        }else{
            return res.status(400).json({
                message : "tk k ton tai",
                status: 400,
                error : true,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "hay dang nhap",
            status: 500,
            error : true
        },
        res.redirect('/loginMinistry'))
    }
}
let checkAuth = async (req,res,next)=>{
    try {
        var token = req.cookies.token || req.body.token
        let decodeAccount = jwt.verify(token,'minh')
        let user = await getUserById(decodeAccount._id)
        console.log(user)
        if(user){
            req.userLocal = user;
        console.log(user)

            next();
        }else{
            return res.status(400).json({
                message : "tk k ton tai",
                status: 400,
                error : true,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "hay dang nhap",
            status: 500,
            error : true
        },
        res.redirect('/'))
    }
}

let getStudentById = function getUserById(id){
    return StudentModel.findOne({_id:id})
}
let checkAuthStudent = async (req,res,next)=>{
    try {
        var token = req.cookies.token || req.body.token
        let decodeAccount = jwt.verify(token,'minh')
        let user = await getStudentById(decodeAccount._id)
        if(user){
            req.userLocal = user;
            next();
        }else{
            return res.status(400).json({
                message : "tk k ton tai",
                status: 400,
                error : true,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "hay dang nhap",
            status: 500,
            error : true
        },
        res.redirect('/'))
    }
}

let checkAdmin = (req,res,next)=>{
    if (req.userLocal.role === "admin"){
        next()
    }else{
        return res.status(400).json({
            message : "no permission",
            status: 400,
            error : true,
        })
    }
}


let checkTeacher = (req,res,next)=>{
    if (req.userLocal.role === "teacher"){
        next()
    }else{
        return res.status(400).json({
            message : "no permission",
            status: 400,
            error : true,
        })
    }
}
let checkStudent = (req,res,next)=>{
    if (req.userLocal.role === "student"){
        next()
    }else{
        return res.status(400).json({
            message : "no permission",
            status: 400,
            error : true,
        })
    }
}

module.exports ={
    isEmail,
    checkLogin,
    checkAdmin,
    checkAuth,
    getUserById,
    checkTeacher,
    checkStudent,
    checkClassID,
    checkStudentLogin,
    getStudentById ,
    checkAuthStudent,
    checkMinistryLogin,
    checkAuthMinistry

}