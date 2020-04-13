const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "qaservice",
  port: 5432,
});

module.exports = {
  getAllQuestions: (req, res) => {
    var id = req.params.id;
    const query = (val) => {
      return {
        text: `select * from questions where p_id =${id} ;`,
        rowMode: "object",
      };
    };
    pool.query(query()).then((response) => {
      let idArray = response.rows.map((q) => {
        return q.q_id;
      });
      console.log(idArray);
      res.send(response.rows);
      console.log("sucess");
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
      console.log(idArray);
      res.send(response.rows);
      console.log("sucess");
    });
  },
  addQuestion: (req, res) => {
    var id = req.params.id;

    const query = (val) => {
      console.log("vallll", val);
      return {
        text: `INSERT INTO questions (q_id, p_id, q_body, q_asker_name, q_reported, q_helpfulness, q_asker_email) VALUES ((SELECT MAX(q_id) from "questions") + 1, ${val},'${req.body.body}','${req.body.name}', 0, 0, '${req.body.email}')`,
        rowMode: "object",
      };
    };
    pool.query(query(id)).then((response) => {
      res.sendStatus(201);
      console.log("sucess");
    });
  },
  addAnswer: (req, res) => {
    var id = req.params.id;
    console.log(req.body);

    const query = (val) => {
      console.log("vallll", val);
      return {
        text: `INSERT INTO answers (a_id, q_id, a_body, a_ans_name, a_reported, a_helpfulness, a_ans_email) VALUES ((SELECT MAX(a_id) from "answers") + 1, ${val},'${req.body.body}','${req.body.name}', 0, 0, '${req.body.email}')`,
        rowMode: "object",
      };
    };
    pool.query(query(id)).then((response) => {
      res.sendStatus(201);
      console.log("sucess");
    });
  },
  markQuestionHelpful: (req, res) => {
    var id = req.params.id;
    const query = (val) => {
      console.log("vallll", val);
      return {
        text: `UPDATE questions SET q_helpfulness = q_helpfulness + 1 WHERE q_id = ${val};`,
        rowMode: "object",
      };
    };
    pool.query(query(id)).then((response) => {
      res.sendStatus(201);
      console.log("sucess");
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
      console.log("sucess");
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
      console.log("sucess");
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
      res.send(response);
      console.log("sucess");
    });
  },
};
