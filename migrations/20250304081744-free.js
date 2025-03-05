const { DataTypes } = require("sequelize"); // ✅ DataTypes 사용

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Free", {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      img: {
        //메인 이미지
        type: DataTypes.TEXT("long"),
      },
      title: {
        // 제목
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      detail: {
        //toasteditor 내용 들어가기
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      userId: {
        // 작성한 사람의 아이디
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "Users", // 🔥 `Users` 테이블의 `id`를 참조
          key: "id",
        },
        onUpdate: "CASCADE", // `Users`의 `id` 변경 시 자동 반영
        onDelete: "CASCADE", // `Users` 삭제 시 `Free` 데이터도 삭제
      },
      likecnt: {
        // 좋아요 갯수
        type: DataTypes.INTEGER(10),
      },
      categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "category", // 🔥 `Users` 테이블의 `id`를 참조
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
    await queryInterface.dropTable("Free");
  },
};
