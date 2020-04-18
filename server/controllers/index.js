var moment = require("moment");
var redis = require("redis");
var client = redis.createClient();

const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "postgres",
//   host: "34.228.230.86",
//   database: "qaservice",
//   port: 5432,
// });

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "3.91.93.167",
  database: "qaservice",
  port: 5432,
});

module.exports = {
  getAllQuestions: (req, res) => {
    var id = req.params.id;

    return client.get(`${id}`, (err, result) => {
      if (result) {
        const resultJSON = JSON.parse(result);
        return res.send(resultJSON);
      } else {
        const query = (val) => {
          return {
            // text: `select * from questions where p_id =${id} ;`,
            text: `select * from answers right outer join questions on questions.q_id = answers.q_id left outer join photos on photos.a_id = answers.a_id where questions.p_id  = ${id} ;`,
            rowMode: "object",
          };
        };
        pool.query(query()).then((response) => {
          let questions = { product_id: id, results: [] };
          let countedQuestions = {};

          response.rows.forEach((q) => {
            if (!countedQuestions[q.q_body]) {
              let questionObj = {
                question_id: q.q_id,
                question_body: q.q_body,
                question_date: q.q_date,
                asker_name: q.q_asker_name,
                question_helpfulness: q.q_helpfulness,
                reported: q.q_reported,
                answers: {
                  [q.q_body]: {
                    id: q.a_id,
                    body: q.a_body,
                    date: q.a_date,
                    answerer_name: q.a_ans_name,
                    helpfulness: q.a_helpfulness,
                    photos: [q.url],
                  },
                },
              };
              countedQuestions[q.q_body] = questionObj;
            } else if (q.a_id !== null) {
              let answerObj = {
                id: q.a_id,
                body: q.a_body,
                date: q.a_date,
                answerer_name: q.a_ans_name,
                helpfulness: q.a_helpfulness,
                photos: [q.url],
              };
              countedQuestions[q.q_body].answers[q.a_id] = answerObj;
            }
          });

          questions.results = Object.values(countedQuestions);

          client.setex(
            `${id}`,
            3600,
            JSON.stringify({ source: "Redis Cache", ...questions })
          );

          res.send(questions);
        });
      }
    });
  },
  getAnswers: (req, res) => {
    const query = (val) => {
      var id = req.params.id;
      return {
        text: `select * from answers where q_id = ${id} ;`,
        rowMode: "object",
      };
    };
    pool.query(query(2)).then((response) => {
      let idArray = response.rows.map((q) => {
        return q.q_id;
      });

      res.send(response.rows);
    });
  },
  addQuestion: (req, res) => {
    var id = req.params.id;
    let date = moment().format();

    const findLargestQuery = "select max(q_id) from questions";
    const query = (val, largest) => {
      return {
        text: `INSERT INTO questions (q_id, p_id, q_body, q_asker_name, q_reported, q_helpfulness, q_asker_email, q_date) VALUES (${
          largest + 1
        }, ${val},'${req.body.body}','${req.body.name}', 0, 0, '${
          req.body.email
        }', '${date}')`,
        rowMode: "object",
      };
    };

    pool
      .query(findLargestQuery)
      .then((response) => {
        const largest = Number(response.rows[0].max);
        return largest;
      })
      .then((response) => {
        pool.query(query(id, response)).then((response) => {
          res.sendStatus(201);
        });
      });
  },
  addAnswer: (req, res) => {
    var id = req.params.id;
    let date = moment().format().slice(0, 10);

    const findLargestQuery = "select max(a_id) from answers";
    const query = (val, largest) => {
      return {
        text: `INSERT INTO answers (a_id, q_id, a_body, a_ans_name, a_reported, a_helpfulness, a_ans_email, a_date) VALUES (${
          largest + 1
        }, ${val},'${req.body.body}','${req.body.name}', 0, 0, '${
          req.body.email
        }', '${date}')`,
        rowMode: "object",
      };
    };
    pool
      .query(findLargestQuery)
      .then((response) => {
        const largest = Number(response.rows[0].max);
        return largest;
      })
      .then((response) => {
        pool.query(query(id, response)).then((response) => {
          res.sendStatus(201);
        });
      });
  },
  markQuestionHelpful: (req, res) => {
    var id = req.params.id;
    const query = (val) => {
      return {
        text: `UPDATE questions SET q_helpfulness = q_helpfulness + 1 WHERE q_id = ${val};`,
        rowMode: "object",
      };
    };
    pool.query(query(id)).then((response) => {
      res.sendStatus(201);
    });
  },
  markAnswerHelpful: (req, res) => {
    var id = req.params.id;
    const query = (val) => {
      return {
        text: `UPDATE answers SET a_helpfulness = a_helpfulness + 1 WHERE a_id = ${val};`,
        rowMode: "object",
      };
    };
    pool.query(query(id)).then((response) => {
      res.sendStatus(201);
    });
  },
  reportQuestion: (req, res) => {
    var id = req.params.id;
    const query = (val) => {
      return {
        text: `UPDATE questions SET q_reported =  1 WHERE q_id = ${val};`,
        rowMode: "object",
      };
    };
    pool.query(query(id)).then((response) => {
      res.sendStatus(201);
    });
  },

  reportAnswer: (req, res) => {
    var id = req.params.id;
    const query = (val) => {
      return {
        text: `UPDATE answers SET a_reported =  1 WHERE a_id = ${val};`,
        rowMode: "object",
      };
    };
    pool.query(query(id)).then((response) => {
      res.sendStatus(201);
    });
  },
};
