/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tache', {
    id_Tache: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DateDebut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_Projet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Projet',
        key: 'id_projet'
      }
    },
    id_TacheParent: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Tache',
        key: 'id_Tache'
      }
    }
  }, {
    tableName: 'Tache',
    timestamps: false
  });
};
