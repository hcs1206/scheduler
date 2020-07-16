module.exports =(sequelize, DataTypes) => {
  return sequelize.define('event', {
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(50),
      allowNull:false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull:false,
    },
  }, {
    timestamps: true,
  });
};