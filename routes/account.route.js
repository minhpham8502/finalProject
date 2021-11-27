var express = require('express');
var router = express.Router();
var {signUpController, loginController,indexAdmin,indexTeacher, indexMinistry,indexStudent,indexManager,indexGuest,loginMinistryController,loginStudentController,danhgiabaibao} = require('../controller/account.controller');
const {checkAuth,checkAuthMinistry, checkAuthStudent,isEmail , checkAdmin,checkLogin,checkTeacher,checkStudentLogin,checkMinistryLogin} = require('../middleware/index');
router.post('/sign-up', isEmail, signUpController)
router.post('/dologin', checkLogin, loginController)
router.post('/doStudentlogin', checkStudentLogin, loginStudentController)


router.post('/doMinistrylogin', checkMinistryLogin, loginMinistryController)

router.get('/indexMinistry',checkAuthMinistry ,indexMinistry)

router.get('/indexAdmin',checkAuth ,checkAdmin, indexAdmin)
router.get('/indexTeacher',checkAuth ,checkTeacher, indexTeacher)
router.get('/indexStudent',checkAuthStudent , indexStudent)
router.get('/indexGuest',checkAuth,indexGuest)
router.get('/indexManager',checkAuth,indexManager)
router.get('/view/:id',danhgiabaibao)

module.exports = router
