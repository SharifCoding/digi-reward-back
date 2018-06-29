const mongoose = require('mongoose');

const { Schema } = mongoose;

const rewardSchema = new Schema({
  reward: {
    reward_id: { type: String, require: true },
    reward_merchant_id: { type: String, require: true },
    reward_merchant_name: { type: String, require: true },
    reward_redeem: { type: Boolean, require: true },
  },
});

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;