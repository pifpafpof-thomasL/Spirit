/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Projet', {
    id_projet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DateDebut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DateFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IdentifiantMinos: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IdentifiantHermes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Adm: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    id_Client: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Client',
        key: 'id_Client'
      }
    }
  }, {
    tableName: 'Projet',
    timestamps: false
  });
};
