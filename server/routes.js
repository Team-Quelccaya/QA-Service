const router = require("express").Router();
const controller = require("./controllers");

router.get("/", controller.getAllQuestions);

module.exports = router;
