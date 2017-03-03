/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Consultant', {
    // at least one field called "id" is required by admin-on-rest (to JSON to client)
    id: {  // "id"" will be used by server to JSON to client 
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_consultant', // name in the db
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
