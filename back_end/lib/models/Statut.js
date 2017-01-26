/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Statut', {
    id_Statut: {
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
    tableName: 'Statut',
    timestamps: false
  });
};
