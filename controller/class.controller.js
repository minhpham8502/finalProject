const ClassModel = require('../models/class')
const AccountModel = require('../models/account')



const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var DashboardtModel = require('../models/Dashboard')
var fileModel = require('../models/file');
const { findById } = require('../models/class');
const StudentModel = require('../models/student');



class ClassController {
    
    // create(req,res){
    //     res.render('./class/create')
    // }

    detail(req,res){
        let classID = req.params.classID;

        ClassModel.find({
            classID : classID
        })
        .then(data=>{
            console.log(data)
            res.render('./class/detail',{class:data})
        })
        
    }

    allclass(req,res ){
        ClassModel.find({

        })
        .then(data=>{
            
            res.render('./class/class',{class: data})
        })
        .catch(err=>{
            res.json("loi sever")
        })
    }

    search(req,res){
        var classname = req.body.classname;
        var topic = req.body.topic;
        ClassModel.find({
            classname : classname,   
        })
        .then(data=>{
            res.render('./class/class',{class:data})
        })
    }

    create(req,res,next){
        AccountModel.find()
        .then(data=>{
            res.render('./class/create',{account:data})

        })
    }

    update(req,res){
        AccountModel.find({},function(err,data1){
            ClassModel.findById({_id:req.params.id},function(err,data){
              res.render('./class/update',{data:data,account:data1})

            })
     
        })
       
        
    }

    docreate(req,res){
        var classnme = req.body.classname

        var newClass = ClassModel({
            classname : classnme,
            topic : req.body.topic,
            classID: req.body.classID,
            teacherID : req.body.teacherID,
            category : req.body.category,

            student: []
        })
    
        newClass.save(function(err){
            if(err){
                console.log(err)
            }else{
                ClassModel.find({},function(err,data){
                    // var newDashboard = DashboardtModel({
                    //     classID:req.body.classID
                    // })
                     ClassModel.find({category:newClass.category},function(err,solop){
                         if(newClass.category =="hocsinhcualop23"){
                            DashboardtModel.updateOne({db:"0"},{soLop:data.length,hocsinhcualop23:solop.length },function(err){
                                AccountModel.updateOne({accountID:newClass.teacherID},{classId:newClass.classID},function(err){
                                    res.redirect('/class/allclass')
                                
                                })
                            })
                        }else if(newClass.category =="hocsinhcualop34"){
                            DashboardtModel.updateOne({db:"0"},{soLop:data.length,hocsinhcualop34:solop.length },function(err){
                                AccountModel.updateOne({accountID:newClass.teacherID},{classId:newClass.classID},function(err){
                                    res.redirect('/class/allclass')
                                
                                })
                            })
                        }else if(newClass.category =="hocsinhcualop45"){
                            DashboardtModel.updateOne({db:"0"},{soLop:data.length,hocsinhcualop45:solop.length },function(err){
                                AccountModel.updateOne({accountID:newClass.teacherID},{classId:newClass.classID},function(err){
                                    res.redirect('/class/allclass')
                                
                                })
                            })
                        }else if(newClass.category =="hocsinhcualop56"){
                            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

                            console.log(solop.length)
                            DashboardtModel.update({db:"0"},{soLop:data.length,hocsinhcualop56:solop.length },function(err){
                                AccountModel.updateOne({accountID:newClass.teacherID},{classId:newClass.classID},function(err){
                                    res.redirect('/class/allclass')
                                
                                })
                            })
                        }
                    })
    // res.redirect('/class/allclass')
                })
            }
        })
    }

    doupdate(req,res){
        // var id1 = req.params.id
        ClassModel.updateOne({
            _id : req.params.id
        }, req.body)
        .then(()=>{
            res.redirect('/class/allclass')
        })
    }

    delete(req,res){
        ClassModel.findById({_id : req.params.id},function(err,data){
            AccountModel.deleteMany({classId:data.classID},function(err,result1){
                StudentModel.deleteMany({studentClass:data.classID},function(err,result2){
                    ClassModel.deleteOne({_id : req.params.id},function(){
                        AccountModel.find({},function(err,result3){
                            ClassModel.find({},function(err,result6){
                                StudentModel.find({},function(err,result4){
                                    if(data.category=="hocsinhcualop23"){
                                        ClassModel.find({category : "hocsinhcualop23"},function(err,result5){
                                            DashboardtModel.updateOne({db:"0"},{soLop:result6.length,soGiaovien:result3.length,soHocsinh:result4.length,hocsinhcualop23:result5.length},function(err,result1){
                                                res.redirect('/class/allclass')
                                
                                            })
                                        })
        
                                    }else if(data.category=="hocsinhcualop34"){
                                        ClassModel.find({category : "hocsinhcualop34"},function(err,result5){
                                            DashboardtModel.updateOne({db:"0"},{soLop:result6.length,soGiaovien:result3.length,soHocsinh:result4.length,hocsinhcualop34:result5.length},function(err,result1){
                                                res.redirect('/class/allclass')
                                
                                            })
                                        })
        
                                    }
                                    else if(data.category=="hocsinhcualop45"){
                                        ClassModel.find({category : "hocsinhcualop45"},function(err,result5){
                                            DashboardtModel.updateOne({db:"0"},{soLop:result6.length,soGiaovien:result3.length,soHocsinh:result4.length,hocsinhcualop45:result5.length},function(err,result1){
                                                res.redirect('/class/allclass')
                                
                                            })
                                        })
        
                                    }
                                    else if(data.category=="hocsinhcualop56"){
                                        ClassModel.find({category : "hocsinhcualop56"},function(err,result5){
                                            DashboardtModel.updateOne({db:"0"},{soLop:result6.length,soGiaovien:result3.length,soHocsinh:result4.length,hocsinhcualop56:result5.length},function(err,result1){
                                                res.redirect('/class/allclass')
                                
                                            })
                                        })
        
                                    }
                                })
                            })
                        })
                    })

                })

            })
        })
        
        
            
           



        
    }

    // addStudent(req,res){
    // //     ClassModel.find(function(err,data){
    // //         res.render('./student/class_student',{class:data})    
    // // })
    // res.render('./student/class_student',{class:data})    
    // }

    doAddStudent(req,res){
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;
            let classID = req.body.classID;
            
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            let newStudent = AccountModel({
                username,
                password :hash,
                email,
                classID  
            })
            newStudent.save(function(err,data){
            if(err){
                console.log(err)
            }else{
                res.render('./student/class_student')
            }
            })
    }

    allstudent(req,res){
            // ClassModel.find({classname:req.params.classID})
            StudentModel.find({studentClass: req.params.classID},function(err,data){
                AccountModel.find({classId: req.params.classID},function(err,data1){
                    res.render('./student/allstudent', {student:data,teacher:data1})

                })

            })
            
            
        

    }

    coordinator(req,res){ 
        AccountModel.findOne({
            classID: req.params.classId,
            role :'teacher'
        })
        .then(data=>{
        res.render('./teacher/teacher_profile', {teacher:data})
    })  
}

           
    //sơn test|
    viewmanagine(req,res){
        let classID = req.params.classID
        AccountModel.find({classID:classID,role:"student"},(err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('./class/baocuahocsinh',{account:data})
        }
        else{
            res.render('./class/baocuahocsinh',{account:data})
        }
        })
    }

    allDocument(req,res){
        fileModel.find({
            studentemail : req.params.email
        }).then(data=>{
            res.render('./file/allDocument.ejs',{file : data})
        })
    }
        
    danhgiabaibao(req,res){
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

    dodanhgiabaibao(req,res){
        let id = req.params.id
        let status = req.body.status
        let comment = req.body.comment
        fileModel.findById({_id :id},function(err,data){
            let studentemail = data.studentemail
            console.log(studentemail)
        fileModel.updateOne(
            { _id: id },   // Query parameter
            {                     // Replacement document
                status: status,
                comment: comment
            })
            .then(()=>{
                res.redirect('/class/allDocument/' + studentemail)
            })
        })
    }

    danhgiabaibao2nd(req,res){
        let id = req.params.id
        fileModel.find({_id:id},(err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('class/danhgia2nd.ejs',{data:data})
        }
        else{
            res.render('class/danhgia2nd.ejs',{data:data})
        }
        })
    }


    rate2(req,res){
        let id = req.params.id
        let status2 = req.body.status
        let comment2 = req.body.comment
        fileModel.findById({_id :id},function(err,data){
            let studentemail = data.studentemail            
        fileModel.updateOne(
            { _id: id },   // Query parameter
            {                     // Replacement document
                status2: status2,
                comment2: comment2
            })
            .then(()=>{
                res.redirect('/class/allDocument/' + studentemail)
            })
        })
    }
}
module.exports = new ClassController;