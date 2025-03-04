const { DataTypes } = require("sequelize"); // ✅ DataTypes 사용

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("likes", {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        //좋아요 누른 사람의 아이디
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        references: {
          model: "Users", // 🔥 `Users` 테이블의 `id`를 참조
          key: "email",
        },
        onUpdate: "CASCADE", // `Users`의 `id` 변경 시 자동 반영
        onDelete: "CASCADE", // `Users` 삭제 시 `Free` 데이터도 삭제
      },
      postId: {
        // 게시글의 아이디
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "free", // 🔥 `Users` 테이블의 `id`를 참조
          key: "id",
        },
        onUpdate: "CASCADE", // `Users`의 `id` 변경 시 자동 반영
        onDelete: "CASCADE", // `Users` 삭제 시 `Free` 데이터도 삭제
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
    await queryInterface.dropTable("likes");
  },
};
