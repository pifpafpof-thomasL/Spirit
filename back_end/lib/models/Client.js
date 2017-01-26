/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Client', {
    id_Client: {
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
    tableName: 'Client',
    timestamps: false
  });
};
