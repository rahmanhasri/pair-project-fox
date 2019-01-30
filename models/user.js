'use strict';
const bcrypting = require('../helpers/bcryprting')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    friendsCount: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(user) {
        return new Promise ((resolve, reject) => {
          bcrypting(user.password) 
            .then((hash) => {
              user.password = hash
              resolve(user)
            })
            .catch((err) => {
              reject(err)
            })
        })
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};