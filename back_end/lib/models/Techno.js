/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Techno', {
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
    timestamps: false
  });
};
