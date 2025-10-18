const mongoose = require('mongoose')

// ========================================================================================
// User Scheme
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    minlength: [3, 'username must be at least 3 characters long']
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minlength: [3, 'password must be at least 3 characters long']
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }
  ],
})
// ========================================================================================

// ========================================================================================
// User Scheme to JSON
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})
// ========================================================================================


// ========================================================================================
// User Model
const User = mongoose.model('User', userSchema)
// ========================================================================================




module.exports = User