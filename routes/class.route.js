var express = require('express');
var ClassModel = require('../models/class'); 
var classRoute = express.Router();
let {checkAuth,checkAdmin,checkTeacher,checkClassID } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const classController = require('../controller/class.controller');

classRoute.use(checkAuth);

// tương tác với class
classRoute.get('/allclass', classController.allclass)
classRoute.get('/class/:classID', classController.detail)

classRoute.post('/class/search', classController.search)
classRoute.get('/allStudent/:classID/',classController.allstudent,)
// classRoute.get('/teacher/:classID',classController.teacher)

classRoute.get('/view:classID', checkTeacher,classController.viewmanagine)
// classRoute.get('/view/:id', checkTeacher,classController.danhgiabaibao)
classRoute.get('/allDocument/:email',checkTeacher ,classController.allDocument)

classRoute.post('/dodanhgiabaibao:id', checkTeacher,classController.dodanhgiabaibao)

classRoute.post('/rate2:id', checkTeacher,classController.rate2)
classRoute.get('/evaluate2nd/:id', checkTeacher,classController.danhgiabaibao2nd)

classRoute.use(checkAdmin);

//sơn test|


classRoute.use('/uploads', express.static('uploads'));
classRoute.use('/public', express.static('public'));



classRoute.get('/class/update/:id',classController.update)
classRoute.get('/create',classController.create)
classRoute.get('/class/delete/:id',classController.delete)


classRoute.post('/doupdate:id', classController.doupdate)
classRoute.post('/doCreate', checkClassID,classController.docreate)


// tương tác với học sinh
// classRoute.get('/class/addStudent',classController.addStudent)

// classRoute.post('/class/doAddStudent', isEmail,classController.doAddStudent)

module.exports = classRoute;