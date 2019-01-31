const bcrypt = require('bcryptjs')

function bcrypting(password) {
    return new Promise ((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                reject(err)
            } else {
                bcrypt.hash(password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                });
            }
        });
    })
    
}

module.exports = bcrypting