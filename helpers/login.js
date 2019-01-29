const bcrypt = require('bcryptjs')


// function login1(password, input) {
//   return new Promise( (resolve, reject) => {

//     bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(input, salt, function(err, hash) {
//         // if(hash == password) {
//         //   return true
//         // } else {
//         //   return false
//         // }
//         resolve(hash)
//       })
//     })
//   })
// }

function login(password, input) {
  return new Promise( (resolve, reject) => {
    
    bcrypt.compare(input, password)
    .then( res => {
      resolve(res)
    })
    .catch( err => {
      reject(err)
    });
  })
}

module.exports = login