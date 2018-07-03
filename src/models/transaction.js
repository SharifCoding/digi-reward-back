const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new schema({

    transaction_id: { type: String, require: true },
    transaction_description: { type: String, require: true }
});

const TransactionsModel = mongoose.model('TransactionListing', TransactionsSchema);

module.exports = TransactionsModel;