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
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
      },
      age: {
        type: DataTypes.STRING(40),
      },
      number: {
        type: DataTypes.STRING(25),
      },
      gender: {
        type: DataTypes.STRING(11),
      },
      loginType: {
        type: DataTypes.STRING(10),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // CURRENT_TIMESTAMP를 사용하지 않고 DataTypes.NOW로 변경
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // CURRENT_TIMESTAMP를 사용하지 않고 DataTypes.NOW로 변경
      },
    },
    {
      tableName: "users",
      timestamps: true, // createdAt과 updatedAt을 자동으로 처리하도록 설정
    }
  );
};

module.exports = users;
