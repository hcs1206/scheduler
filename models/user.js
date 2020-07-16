/* models/person.js */
module.exports =(sequelize, DataTypes) => {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull:false,
    },
    engName: {
      type: DataTypes.STRING(20),
      allowNull:false,
    },
  }, {
    timestamps: true,
  });
};