var express = require('express');
var ClassModel = require('../models/class'); 
var adminRoute = express.Router();

const {checkAuth, isEmail , checkAdmin} = require('../middleware/index');
const AdminController = require('../controller/admin.controller');
var bodyParser = require('body-parser');
adminRoute.use(bodyParser.urlencoded({extended: false}));

adminRoute.use(checkAuth);
adminRoute.use(checkAdmin);

//tạo tk

adminRoute.get('/createStudent', AdminController.createStudent)
adminRoute.get('/createAccount', AdminController.createAccount)

adminRoute.post('/docreateAccount', isEmail,AdminController.docreateAccount)
adminRoute.post('/docreateStudent', isEmail,AdminController.docreateStudent)

/// diem danh

adminRoute.get('/chooseAttendance', AdminController.chooseAttendance)

adminRoute.get('/listEdit/:id', AdminController.listEdit)
adminRoute.get('/editAttendance/:id', AdminController.editAttendance)
adminRoute.post('/doEditAttendance/:id', AdminController.doEditAttendance)


//Thêm học sinh vào lớp
adminRoute.get('/addtoClass', AdminController.addtoClass)
adminRoute.post('/doaddtoClass:id', AdminController.doaddtoClass)

module.exports = adminRoute;