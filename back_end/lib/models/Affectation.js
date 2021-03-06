/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Affectation', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_Affectation', // name in the db
      references: {
        model: "Affectation",
        key: "id_Affectation"
      }
    },
    id_Consultant: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Consultant',
        key: 'id_consultant'
      }
    },
    id_Projet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Projet',
        key: 'id_projet'
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
      tableName: 'Affectation',
      timestamps: false
    });
};
