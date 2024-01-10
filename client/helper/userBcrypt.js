const bcrypt = require('bcrypt')

// hashed password
const hashedPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((12, (err, salt) => {
            if (err) {
                reject(salt)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        }))
    })
}

const comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

module.exports = {
    hashedPassword, comparePassword
} 