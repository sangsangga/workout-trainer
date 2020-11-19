const bcrypt = require('bcryptjs')

function compare(input,realPassword){
   return bcrypt.compareSync(input,realPassword)
}

module.exports = compare