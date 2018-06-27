const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  accessToken: { type: String, require: true }, 
  // user_name: { type: String, require: true },

  // reward: {
  //   reward_id: { type: String, require: true },
  //   reward_merchant_id: { type: String, require: true },
  //   reward_merchant_name: { type: String, require: true },
  //   reward_redeem: { type: Boolean, require: true },
  // },
});

const UserModel = mongoose.model('UserListing', UserSchema);

module.exports = UserModel;
