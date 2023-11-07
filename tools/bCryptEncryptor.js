const bCrypt = require('bcrypt')
const saltRound = 10

const encryptPassword = async (password) => {
    return bCrypt.hashSync(password, saltRound)
}

module.exports = {
    encryptPassword
}
