/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Imputation', {
    id_Imputation: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_Consultant: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Consultant',
        key: 'id_consultant'
      }
    },
    id_Tache: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Tache',
        key: 'id_Tache'
      }
    },
    Pourcentage: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    DateDebut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DateFin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Imputation',
    timestamps: false
  });
};
