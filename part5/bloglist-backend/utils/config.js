
require('dotenv').config()



// =================================================================
// if user run command "npm run test" then process.env.NODE_ENV mean run database testing
// else process.env.NODE_ENV mean run database production
let PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
// =================================================================



module.exports = { MONGODB_URI, PORT }