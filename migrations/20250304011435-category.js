const { DataTypes } = require("sequelize"); // ✅ DataTypes 사용

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("category", {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("category");
  },
};
