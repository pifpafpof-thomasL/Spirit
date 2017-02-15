/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Consultant', {
    id_consultant: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      references: {
        model: "Consultant",
        key: "id_consultant"
      }
    },
    Prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TelPortable: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TelFixe: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DateNaissance: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DateEntreeEntreprise: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CoutJournalier: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    id_Statut: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'Statut',
        key: 'id_Statut'
      }
    }
  }, {
    tableName: 'Consultant',
    timestamps: false,
    timestamps: false
  });
};
