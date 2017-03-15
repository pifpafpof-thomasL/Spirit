/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  let Techno = sequelize.define('Techno', {
    id_Techno: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nom: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Techno',
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Techno.hasMany(models.Maitrise, {foreignKey: 'id_Techno'})
      }
    }
  });
  return Techno
};
