var express = require('express');
var FacultyModel = require('../models/class'); 
var teacherRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const teacherController = require('../controller/teacher.controller');
teacherRoute.use(checkAuth);

teacherRoute.get('/update:id',teacherController.update)
teacherRoute.get('/allplans',teacherController.allplans)

teacherRoute.get('/allplans',teacherController.allplans)

teacherRoute.get('/teacher_profile:id',teacherController.profile)
teacherRoute.get('/delete:id',teacherController.deleteteacher)
//  diem danh
teacherRoute.get('/CreateAttendance', teacherController.Attendance)
teacherRoute.post('/doAttendance', teacherController.doAttendance)


teacherRoute.get('/attendance',teacherController.attendance)
teacherRoute.get('/preattendance',teacherController.preattendance)



// 

teacherRoute.post('/doupdate:id', teacherController.doupdate)

module.exports = teacherRoute