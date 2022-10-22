const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
  const userSchema = sequelize.define("Users", {
    user_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    dept_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "departments", // the table name
        key: "dept_id", // the PK column name
      },
    },
    is_password_changed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    user_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: false,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
      defaultValue: sequelize.fn("NOW"),
      allowNull: false,
    },
  });
  return userSchema;
};
