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
module.exports = router;
