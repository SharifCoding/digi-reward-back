const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  access_token: { type: String, require: true },
  // user_name: { type: String, require: false },
});

userSchema.statics.findOneOrCreate = function findOneOrCreate(key, data) {
  return this.findOne(key).then((user) => {
    if (user) {
      return user;
    }
    return this.create(data).then((newUser) => {
      return newUser;
    });
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
