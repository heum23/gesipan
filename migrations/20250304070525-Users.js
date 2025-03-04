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
      adress: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER(12),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING(255), // ✅ 60 → 255 (길게 설정해도 무방)
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
