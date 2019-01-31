'use strict';
const bcrypting = require('../helpers/bcryprting')
const Op = require('sequelize').Op

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Wrong email format'
        },
        isUnique: function (value) {
            let self = this
            return new Promise((resolve, reject) => {
              User
                .findOne({where: {email: value}})
                .then(dataUser => {
                  if (dataUser && dataUser.id != self.id) {
                    reject('Email has been used')
                  }
                  resolve()
                })
                .catch(err => {
                  reject(err)
                })
            })
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function (value) {
          let self = this
          return new Promise((resolve, reject) => {
            User
              .findOne({where: {username: value}})
              .then(dataUser => {
                if (dataUser && dataUser.id != self.id) {
                  reject('Username has been used')
                }
                resolve()
              })
              .catch(err => {
                reject(err)
              })
          })
        }
      }
      
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password should contain at least 6 characters'
        }
      }
    },
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
    User.belongsToMany(User, {as: 'temanteman', through: models.Friend, foreignKey: 'user'})
    User.hasMany(models.Post)
    User.belongsToMany(User, {as: 'b', through: models.Friend, foreignKey: 'friend'})
    User.hasMany(models.FriendRequest)
    // User.hasMany(models.Post, {foreignKey: 'UserId'})
  };

  User.timeline = function(userId, page) {
    return new Promise ( (resolve, reject) => {
      let arrayTimeline = []
      let timeline = []
      let theUser = null
      User.findByPk(userId, { // req.session.userLogin.id
        attributes : ['id','name', 'email', 'username', 'friendsCount'],
        include : [{
          model : User,
          as : 'temanteman',
          attributes : ['id','username', 'friendsCount']
        }] 
      })
        .then( user => {
          // arrayTimeline.push({UserId : user.id})
          arrayTimeline.push(user.id)
          user.temanteman.forEach( teman => {
            // arrayTimeline.push({UserId: teman.id})
            arrayTimeline.push(teman.id)
          })
          theUser = user
          return sequelize.models.Post.findAll({include: [{model: User}], 
            where : { 
              UserId : {
                [Op.or] : arrayTimeline
              }
            },
            order : [[ 'createdAt' , 'DESC']],
            limit : 5,
            offset : (page - 1) * 5
          })
        })
        .then( post => {
          resolve({post : post, theUser: theUser})
        })
        .catch( err => {
          // console.log('here')
          reject(err)
        })
    })
  }

  User.countFriendRequest = function(array) {
    return array.length
  }

  User.prototype.countFriend = function() {
    return this.temanteman.length
  }

  return User;
};