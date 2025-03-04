const { DataTypes } = require("sequelize");

const like = (sequelize) => {
  return sequelize.define(
    "likes",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        references: {
          model: "Users", // `Users` 테이블의 `email`을 참조
          key: "email",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      postId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "Free", // `Free` 테이블의 `id`를 참조
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      tableName: "likes", // 실제 테이블 이름
      timestamps: true, // 'createdAt', 'updatedAt' 필드를 자동으로 처리하도록 설정
    }
  );
};

module.exports = like;
