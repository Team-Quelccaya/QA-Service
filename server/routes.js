const router = require("express").Router();
const controller = require("./controllers");

router.get("/:id", controller.getAllQuestions);
router.get("/answers/:id", controller.getAnswers);
router.put("/question/:id/helpful", controller.markQuestionHelpful);
router.put("/answer/:id/helpful", controller.markAnswerHelpful);

router.put("/question/:id/report", controller.reportQuestion);
router.put("/answer/:id/report", controller.reportAnswer);

router.post("/addQuestion/:id", controller.addQuestion);
router.post("/addAnswer/:id", controller.addAnswer);

router.post("/question/:id/report", controller.reportQuestion);
router.post("/answer/:id/report", controller.reportAnswer);

module.exports = router;
