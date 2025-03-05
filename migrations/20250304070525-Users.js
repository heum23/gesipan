const { DataTypes } = require("sequelize"); // ✅ DataTypes 사용

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(40), // ✅ DataTypes.STRING 사용
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255), // ✅ 비밀번호는 해싱 후 길어질 수 있으므로 255 추천
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
        type: DataTypes.STRING(40),
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // 변경: DataTypes.NOW 사용
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // 변경: DataTypes.NOW 사용
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
