const bcrypt = require('bcryptjs')

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