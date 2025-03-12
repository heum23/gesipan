const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.postUser);
router.post("/emailCheck", userController.findEmail);
router.post("/findId", userController.idFind);
router.post("/findPw", userController.pwFind);
router.post("/updatePw", userController.updatePw);
router.post("/login", userController.login);
router.post("/token", userController.tokenCheck);
router.post("/checktoken", userController.checkToken);
router.post("/kakaoToken", userController.kakaoToken);
router.post("/updateAdress", userController.updateAdress);
router.delete("/del", userController.del);
module.exports = router;
