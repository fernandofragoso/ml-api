const express = require('express');
const fetch = require('node-fetch');
const { getAuthor, getCategoriesArray, getItemsArray, getItem } = require('./utils/json.js');

const app = express();

const SEARCH_URL = 'https://api.mercadolibre.com/sites/MLB/search?limit=4&q=';
const ITEM_URL = 'https://api.mercadolibre.com/items/';

app.get('/api/items', (req, res) => {
  console.log('/api/items');
  const q = req.query.q;
  fetch(`${SEARCH_URL}${q}`)
    .then(res => res.json())
    .then(json => {
      const response = {
        author: getAuthor(),
        categories: getCategoriesArray(json.filters),
        items: getItemsArray(json.results)
      }
      res.send(response);
    });
});

app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  const { plain_text } = await fetch(`${ITEM_URL}${id}/description`).then(res => res.json());
  fetch(`${ITEM_URL}${id}`)
    .then(res => res.json())
    .then(json => {
      const response = {
        author: getAuthor(),
        item: getItem(json, plain_text)
      }
      res.send(response);
    });
});

app.listen(3001, function () {
  console.log('ML API - LISTENING ON PORT 3001');
});
