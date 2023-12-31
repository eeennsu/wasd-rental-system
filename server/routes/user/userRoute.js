const express = require('express');
const router = express.Router();
const userController = require('./userController')
const checkToken = require("../../middleware/authorization").checkToken
const checkOne = require("../../middleware/authorization").checkOne
const checkMaster = require("../../middleware/authorization").checkMaster



// 개인정보 수정 
router.post('/changeInfo',checkToken,checkOne,userController.changeInfo);

// 개인정보 조회 
router.get('/viewInfo/:user_id',checkToken,checkOne,userController.viewInfo);

// 이메일 중복 조회
router.post('/checkEmail',checkToken,checkOne,userController.checkEmail);

//학번 중복 조회
router.post('/checkStudentNum',checkToken,checkOne,userController.checkStudentNum);




module.exports = router;


