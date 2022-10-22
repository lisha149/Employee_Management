module.exports = (sequelize, Sequelize) => {
  const leaveSchema = sequelize.define("Leaves", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", // the table name
        key: "user_id", // the PK column name
      },
    },
    leave_reason: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    leave_status: {
      type: Sequelize.ENUM("Approved", "Rejected", "Pending"),
      defaultValue: "Pending",
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
  return leaveSchema;
};
