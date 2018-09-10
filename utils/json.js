const { getAmount, getDecimals } = require('./helpers.js');

const getAuthor = () => {
  return {
    name: 'Fernando',
    lastName: 'Fragoso'
  };
};

const getCategoriesArray = (filters) => {
  return filters.reduce((accCat, curCat) => {
    const values = curCat.values.map(value => {
      return (value.path_from_root) ? 
        value.path_from_root.map(category => category.name) :
        value.name;
    });
    return [...accCat, ...values];
  }, []).reduce((accCat, curCat) => {
    return (Array.isArray(curCat)) ? [...accCat, ...curCat] : [...accCat, curCat];
  }, []);
};

const getItemsArray = (items) => {
  return items.map(item => getItem(item)); 
};

const getItem = (item, description = null) => {

  const obj = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: getAmount(item.price),
      decimals: getDecimals(item.price)
    },
    picture: item.thumbnail,
    condition: item.condition,
    state: item.seller_address.state.name,
    free_shipping: !!item.shipping.free_shipping
  }

  if (description) {
    obj.sold_quantity = item.sold_quantity;
    obj.picture = (item.pictures.length > 0) ? item.pictures[0].url : '';
    obj.description = description;
  }

  return obj;
};

module.exports = { getAuthor, getCategoriesArray, getItemsArray, getItem };