var express = require('express');
var ClassModel = require('../models/class'); 
var studentRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const studentController = require('../controller/student.controller');
studentRoute.use(checkAuth);

studentRoute.post('/docreate',studentController.dotakeclass)
studentRoute.get('/doaddStudent:id',studentController.doaddStudent)
studentRoute.get('/enrollment',studentController.enrollment)

studentRoute.get('/deletetakeclass:id',studentController.deletetakeclass)

studentRoute.get('/update:id',studentController.update)
studentRoute.get('/delete:id',studentController.deleteStudent)
studentRoute.get('/allStudent/detail/:id',studentController.detailStudent)


studentRoute.post('/doupdate:id', studentController.doupdate)

module.exports = studentRoute