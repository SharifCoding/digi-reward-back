const groupByMerchant = (merchants) => {

  const myMerchants = merchants.map(transaction => transaction.merchant.id);
  console.log(myMerchants);

};

module.exports = groupByMerchant;
