const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

router.get("/heart", likeController.heartCheck);
router.post("/postHeart", likeController.postHeart);
router.post("/token", likeController.tokenCheck);
router.post("/post", likeController.heartPost);
module.exports = router;
