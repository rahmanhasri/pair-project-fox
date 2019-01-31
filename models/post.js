'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    likeCount: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    urlPhoto : DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    // Post.hasMany(models.MentionHistory, {foreignKey: 'postId'})
    Post.belongsTo(models.User)
  };
  return Post;
};