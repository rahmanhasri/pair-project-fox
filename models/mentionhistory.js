'use strict';
module.exports = (sequelize, DataTypes) => {
  const MentionHistory = sequelize.define('MentionHistory', {
    userSource: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    userTarget: DataTypes.INTEGER
  }, {});
  MentionHistory.associate = function(models) {
    // associations can be defined here
  };
  return MentionHistory;
};