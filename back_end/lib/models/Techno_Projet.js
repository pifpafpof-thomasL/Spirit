/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Techno_Projet', {
    id_Techno: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Techno',
        key: 'id_Techno'
      }
    },
    id_Projet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Projet',
        key: 'id_projet'
      }
    }
  }, {
    tableName: 'Techno_Projet',
    timestamps: false
  });
};
