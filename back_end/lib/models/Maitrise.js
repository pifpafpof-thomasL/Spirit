/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let Maitrise = sequelize.define('Maitrise', {
    id_Consultant: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Consultant',
        key: 'id_consultant'
      }
    },
    id_Techno: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Techno',
        key: 'id_Techno'
      }
    },
    Niveau: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    tableName: 'Maitrise',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Maitrise.belongsTo(models.Consultant, {foreignKey: 'id_Consultant'}),
        Maitrise.belongsTo(models.Techno, {foreignKey: 'id_Techno'})
      }
    }
  });
  return Maitrise
};
