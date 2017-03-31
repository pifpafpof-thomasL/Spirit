/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Projet', {
    // at least one field called "id" is required by admin-on-rest
    id: {  // "id"" will be used by server to JSON to client  
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      field: "id_projet", // name of "id" in the databse
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
