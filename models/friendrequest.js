'use strict';
module.exports = (sequelize, DataTypes) => {
  const friendRequest = sequelize.define('friendRequest', {
    requestFrom: DataTypes.INTEGER,
    requestTo: DataTypes.INTEGER,
    response: DataTypes.ENUM
  }, {});
  friendRequest.associate = function(models) {
    // associations can be defined here
  };
  return friendRequest;
};