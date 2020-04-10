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
    pool.query(query(val)).then((response) => {
      res.send(response.rows);
      console.log("sucess");
    });
  },
  addQuestion: (req, res) => {},
  addAnswer: (req, res) => {},
  markQuestionHelpful: (req, res) => {
    const query = (val) => {
      return {
        text: `UPDATE questions SET helpfulness = helpfulness + 1 WHERE q_id = ${val};`,
        rowMode: "array",
      };
    };
    pool.query(query(val)).then((response) => {
      res.send(response.rows);
      console.log("sucess");
    });
  },
  reportQuestion: (req, res) => {
    const query = (val) => {
      return {
        text: `UPDATE questions SET reported = reported + 1 WHERE q_id = ${val};`,
        rowMode: "array",
      };
    };
    pool.query(query(val)).then((response) => {
      res.send(response.rows);
      console.log("sucess");
    });
  },
  markAnswerHelpful: (req, res) => {
    const query = (val) => {
      return {
        text: `UPDATE answers SET helpfulness = helpfulness + 1 WHERE a_id = ${val};`,
        rowMode: "array",
      };
    };
    pool.query(query(val)).then((response) => {
      res.send(response.rows);
      console.log("sucess");
    });
  },
  reportAnswer: (req, res) => {
    const query = (val) => {
      return {
        text: `UPDATE answers SET reported = reported + 1 WHERE a_id = ${val};`,
        rowMode: "array",
      };
    };
    pool.query(query(val)).then((response) => {
      res.send(response.rows);
      console.log("sucess");
    });
  },
};
