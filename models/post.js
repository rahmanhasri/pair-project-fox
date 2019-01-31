'use strict';
const mailNotifications = require('../nodemailer')
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

  Post.afterCreate( (post, options) => {
    console.log(post)
      let mention = post.content.indexOf('@')
      if(mention !== -1) {
        let people = ''
        for( let i = mention+1 ; i < post.content.length ; i++ ) {
          if(post.content[i] === ' ') {
            break
          } else {
            people += post.content[i]
          }
        }

        if(!people) {
          return ''
        } else {
          let mentioned = null
          return sequelize.models.User.findOne( { where : { username : people }})
            .then( target => {
              mentioned = target
              console.log('masuk','=====================')
              if(target) {
                return sequelize.models.MentionHistory.create({userSource : post.UserId, postId : post.id, userTarget : target.id})
              }
            })
            .then( () => { // masih dummy
              return mailNotifications(mentioned.email, 'Your friend', 'http://google.com')
            })
        }
      }
  })
  return Post;
};