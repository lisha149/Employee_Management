const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
  const userSchema = sequelize.define("Users", {
    userId: {
      field: "user_id",
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      field: "first_name",
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      field: "last_name",
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      field: "user_email",
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      field: "user_password",
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      field: "is_admin",
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    deptId: {
      field: "dept_id",
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "departments", // the table name
        key: "dept_id", // the PK column name
      },
    },
    isPasswordChanged: {
      field: "is_password_changed",
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    status: {
      field: "user_status",
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
