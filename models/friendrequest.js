'use strict';
module.exports = (sequelize, DataTypes) => {
  const FriendRequest = sequelize.define('FriendRequest', {
    requestFrom: DataTypes.INTEGER,
    requestTo: DataTypes.INTEGER,
    response: DataTypes.STRING
  }, {});
  FriendRequest.associate = function(models) {
    // associations can be defined here
    FriendRequest.belongsTo(models.User, {foreignKey: 'requestFrom'})
  };
  return FriendRequest;
};