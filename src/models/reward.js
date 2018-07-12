const mongoose = require('mongoose');

const { Schema } = mongoose;

const rewardSchema = new Schema({
  description: { type: String, require: true },
  merchant_id: { type: String, require: true },
  merchant_name: { type: String, require: true },
  merchant_logo: { type: String, require: true },
  latitude: { type: Number, require: true },
  longitude: { type: Number, require: true },
  redeemed: { type: Boolean, require: true },
});

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;
