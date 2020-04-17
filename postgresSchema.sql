CREATE TABLE questions (
 q_id BIGSERIAL,
 p_id INTEGER,
 q_body VARCHAR(200),
 q_date VARCHAR(50),
 q_asker_name VARCHAR(100),
 q_asker_email VARCHAR(100),
 q_reported INTEGER,
 q_helpfulness INTEGER
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (q_id);

CREATE TABLE answers (
 a_id BIGSERIAL,
 q_id INTEGER,
 a_body VARCHAR(1000),
 a_date VARCHAR(200),
 a_ans_name VARCHAR(100),
 a_ans_email VARCHAR(150),
 a_reported INTEGER,
 a_helpfulness INTEGER
);


ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (a_id);

CREATE TABLE photos (
 photo_id BIGSERIAL,
 a_id INTEGER,
 url VARCHAR(300)
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);

ALTER TABLE answers ADD CONSTRAINT answers_q_id_fkey FOREIGN KEY (q_id) REFERENCES questions(q_id);
ALTER TABLE photos ADD CONSTRAINT photos_a_id_fkey FOREIGN KEY (a_id) REFERENCES answers(a_id);

CREATE INDEX idx_product_question ON questions(p_id);
CREATE INDEX idx_question_answer ON answers(q_id);
CREATE INDEX idx_answer_photo ON photos(a_id);