const Pool = require("pg").Pool;
const pool = new Pool({
  user: "mattbrown",
  host: "localhost",
  database: "sdc",
  port: 5432,
});

module.exports = {
  getAllQuestions: (req, res) => {
    const query = (val) => {
      return {
        text: `select questions.* , answers.* from questions join answers on answers.q_id = questions.q_id where questions.p_id=${val};`,
        rowMode: "array",
      };
    };
    pool.query(query(2)).then((response) => {
      res.send(response.rows);
      console.log("sucess");
    });
  },
  addQuestion: (req, res) => {},
  addAnswer: (req, res) => {},
  markQuestionHelpful: (req, res) => {},
  reportQuestion: (req, res) => {},
  markAnswerHelpful: (req, res) => {},
  reportAnswer: (req, res) => {},
};
