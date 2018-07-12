/**
 * Seed the database with rewards
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Reward = require('../src/models/reward');

// create some rewards
const rewards = [
  {
    description: 'One free coffee', merchant_id: 'merch_00009PscnXnWOXxkHl7TGL', merchant_name: 'Caffè Nero', merchant_logo: 'https://mondo-logo-cache.appspot.com/twitter/caffenero_us/?size=large', latitude: 53.47879929999999, longitude: -2.2423163, redeemed: 0,
  },
  {
    description: 'One free PT session', merchant_id: 'merch_00009B4ag3ALK4Y6LnZRNh', merchant_name: 'Nuffield Health', merchant_logo: 'https://mondo-logo-cache.appspot.com/twitter/nuffieldhealth/?size=large', latitude: 53.4079883, longitude: -2.22044, redeemed: 0,
  },
  {
    description: 'A free bag of carrots', merchant_id: 'merch_000094lGqGRqpJkoKexpZJ', merchant_name: 'Co-op', merchant_logo: 'https://mondo-logo-cache.appspot.com/twitter/CoopukFood/?size=large', latitude: 53.4424001, longitude: -2.2787296, redeemed: 0,
  },
];

dotenv.config();

// connect to db & use the reward model to insert/save
mongoose.connect(process.env.DATABASE_URL, () => {
  Promise.all(rewards.map(reward => new Reward(reward).save()))
    .then(() => {
      mongoose.connection.close();
      console.log('Reward db seeded!');
    });
});
