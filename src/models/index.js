// Sequelize 모듈 임포트
const Sequelize = require("sequelize");

// 데이터베이스 설정 값들을 담은 객체
const dbConfig = {
  HOST: "localhost", // 데이터베이스 서버 호스트 주소
  USER: "postgres", // 데이터베이스 사용자 이름
  PASSWORD: "password", // 데이터베이스 접속 비밀번호
  PORT: "5432", // 데이터베이스 접속 서버 포트
  DB: "postgres", // 데이터베이스 이름
  dialect: "postgres", // 사용할 데이터베이스 종류
};

// Sequelize 인스턴스를 생성하여 데이터베이스 연결 설정
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

// db 객체를 생성하여 Sequelize와 sequelize 인스턴스를 삽입
// Sequelize 클래스는 이를 직접 참조하여 새로운 모델을 정의하는 등의 작업을 할 수 있게 함
// sequelize 인스턴스는 데이터베이스 연결 설정을 포함하고 있는 인스턴스로 DB와의 상호작용을 처리
const db = {};
db.Sequelize = Sequelize; // Sequelize 모듈 자체를 db 객체에 삽입
db.sequelize = sequelize; // 데이터베이스 연결 설정이 완료된 Sequelize 인스턴스를 db 객체에 삽입

// 데이터베이스 모델을 정의하고 모델을 db 객체에 삽입
// 여기에 새로운 모델을 추가하면, db 객체에 해당 모델이 자동으로 추가됨 (require로 불러와서 db 객체에 삽입)
db.users = require("./user.model.js")(sequelize, Sequelize);

// db 객체를 모듈로 내보내서 다른 파일에서 사용할 수 있게 함
module.exports = db;
