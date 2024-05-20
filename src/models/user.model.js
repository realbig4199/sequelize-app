module.exports = (sequelize, Sequelize) => {
  // User 모델 정의
  const User = sequelize.define("user", {
    // firstName, lastName, hasCar 컬럼을 가진 테이블 생성 (필드 정의)
    firstName: {
      type: Sequelize.STRING, // 문자열 타입
    },
    lastName: {
      type: Sequelize.STRING, // 문자열 타입
    },
    hasCar: {
      type: Sequelize.BOOLEAN, // 불리언 타입
    },
  });
  return User; // 정의된 User 모델을 반환
};
