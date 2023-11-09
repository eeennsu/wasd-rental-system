const express = require('express');
const router = express.Router();
const repairController = require('./repairController');

router.post('/repairTool',repairController.repairTool);

module.exports = router;

//수리요청(로그생성)
//수리중, 수리완료로 값 변경
//수리요청 자세히 보기
//수리요청 목록 보기