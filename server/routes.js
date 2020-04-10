const router = require("express").Router();
const controller = require("./controllers");

router.get("/", controller.getAllQuestions);
router.post("/addQuestion", controller.addQuestion);
router.post("/addAnswer", controller.addAnswer);
router.post("/reportQuestion", controller.reportQuestion);
router.post("/reportAnswer", controller.reportAnswer);
router.post("/markAnswerHelpful", controller.markAnswerHelpful);
router.post("/markQuestionHelpful", controller.markQuestionHelpful);

module.exports = router;
