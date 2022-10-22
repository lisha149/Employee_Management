module.exports = (sequelize, Sequelize) => {
  const departmentSchema = sequelize.define("Departments", {
    DeptId: {
      field: "dept_id",
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    depatTitle: {
      field: "dept_title",
      type: Sequelize.STRING,
      allowNull: false,
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
  return departmentSchema;
};
