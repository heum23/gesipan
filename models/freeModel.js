const { DataTypes } = require("sequelize");

const free = (sequelize) => {
  return sequelize.define(
    "free",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      img: {
        type: DataTypes.TEXT("long"),
        allowNull: true, // 이미지가 없을 수 있기 때문에 allowNull을 true로 설정
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      detail: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        references: {
          model: "Users", // 참조할 모델 이름
          key: "email", // `Users` 모델의 `email` 필드를 참조
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      like: {
        type: DataTypes.INTEGER(10),
        allowNull: true, // 좋아요 수는 없을 수 있으므로 allowNull을 true로 설정
        defaultValue: 0, // 기본값을 0으로 설정
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
      tableName: "free", // 실제 테이블 이름
      timestamps: true, // 'createdAt', 'updatedAt' 필드를 자동으로 처리하도록 설정
    }
  );
};

module.exports = free;
