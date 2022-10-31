module.exports = (sequelize, Sequelize) => {
  const profileSchema = sequelize.define("Profiles", {
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
        key: "id", // the PK column name
      },
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    citizenship_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    pan_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bank_account: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bank_account_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    gender: {
      type: Sequelize.ENUM("Male", "Female", "Others"),
      allowNull: false,
    },
    marital_status: {
      type: Sequelize.ENUM("Married", "Unmarried"),
      allowNull: false,
    },
    profile_pic: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    joined_date: {
      type: Sequelize.DATEONLY,
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
  return profileSchema;
};
