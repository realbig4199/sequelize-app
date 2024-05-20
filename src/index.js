// express 모듈 임포트
const express = require("express");
// express 앱 생성
const app = express();

// 데이터베이스 모듈 임포트 (db 객체에는 데이터베이스 연결 및 모델 정의가 포함되어 있음)
const db = require("./models");
// User 모델 가져오기
const User = db.users;

// 데이터베이스 동기화 (필요에 따라 사용 가능)
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("데이터베이스 초기화 완료");
// });

// 파싱된 JSON 데이터를 req.body에 넣어주는 미들웨어
app.use(express.json());

// CRUD API 라우팅
// Create (생성) - POST
app.post("/users", (req, res) => {
  const { firstName, lastName, hasCar } = req.body;

  const user = {
    firstName,
    lastName,
    hasCar,
  };
  // create 메서드로 데이터베이스에 데이터를 생성
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "사용자 생성 중 오류 발생",
      });
    });
});

// Read (조회) - GET
// 전체 사용자 조회
app.get("/users", (req, res) => {
  // findAll 메서드로 모든 사용자 데이터를 조회
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "사용자 조회 중 오류 발생",
      });
    });
});

// 특정 사용자 조회
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  // findByPk 메서드로 특정 id의 사용자 데이터를 조회
  User.findByPk(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({
          message: `id가 ${id}인 유저가 없습니다.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `${id}인 유저를 찾는데 에러가 났습니다.`,
      });
    });
});

// Update (수정) - PUT
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  // update 메서드로 특정 조건의 데이터를 수정
  User.update(req.body, {
    where: { id },
  })
    .then((result) => {
      if (result[0] === 1) {
        res.send({
          message: `${id}인 유저 수정 완료`,
        });
      } else {
        res.status(404).send({
          message: `id가 ${id}인 유저가 없습니다.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `${id}인 유저를 수정하는데 에러가 났습니다.`,
      });
    });
});

// Delete (삭제) - DELETE
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  // destroy 메서드로 특정 조건의 데이터를 삭제
  User.destroy({
    where: { id },
  })
    .then((result) => {
      if (result === 1) {
        // result는 삭제된 레코드 수를 나타냄
        res.send({
          message: `${id}인 유저 삭제 완료`,
        });
      } else {
        res.status(404).send({
          message: `id가 ${id}인 유저가 없습니다.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `${id}인 유저를 삭제하는데 에러가 났습니다.`,
      });
    });
});

// 서버 실행
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 실행 중`);
});
