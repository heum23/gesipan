const { DataTypes } = require("sequelize");

const users = (sequelize) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    },
    {
      tableName: "users", // 실제 테이블 이름을 지정합니다.
      timestamps: true, // 'createdAt', 'updatedAt' 필드를 자동으로 처리하도록 설정
    }
  );
};

module.exports = users;
