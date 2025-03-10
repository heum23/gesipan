const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";

const config = require("../config/config.json")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./userModel")(sequelize, Sequelize);
db.like = require("./likeModel")(sequelize, Sequelize);
db.free = require("./freeModel")(sequelize, Sequelize);

// 모델 간 관계 설정
db.User.hasMany(db.free, { foreignKey: "userId" }); // User와 Free의 관계 설정
db.free.belongsTo(db.User, { foreignKey: "userId" }); // Free와 User의 관계 설정

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;
