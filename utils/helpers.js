const getAmount = (price) => {
  if (price.toString().split('.').length === 2) {
    return parseInt(price.toString().split('.')[0]);
  }
  return parseInt(price);
};

const getDecimals = (price) => {
  let decimals = 0;
  if (price.toString().split('.').length === 2) {
    const priceArray = price.toString().split('.');
    decimals = (priceArray[1].length === 2) ? priceArray[1] : priceArray[1]*10;
  } 
  return parseInt(decimals);
};

module.exports = { getAmount, getDecimals };