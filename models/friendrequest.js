'use strict';
module.exports = (sequelize, DataTypes) => {
  const FriendRequest = sequelize.define('FriendRequest', {
    requestFrom: DataTypes.INTEGER,
    requestTo: DataTypes.INTEGER,
    response: {
      type : DataTypes.ENUM,
      values : ['true', 'false']
    }
  }, {});
  FriendRequest.associate = function(models) {
    // associations can be defined here
  };
  return FriendRequest;
};