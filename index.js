const express = require('express');
const fetch = require('node-fetch');
const { getAuthor, getCategoriesArray, getItemsArray, getItem } = require('./utils/json.js');

const app = express();

const LIMIT = 4;
const URL = 'https://api.mercadolibre.com/';
const SEARCH_URL = `${URL}sites/MLB/search?limit=${LIMIT}&q=`;
const ITEM_URL = `${URL}items`;
const DESCRIPTION = 'description';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/api/items', (req, res) => {
  const q = req.query.q;
  console.log('search: ' + q);
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
  console.log('get: ' + id);
  const { plain_text } = await fetch(`${ITEM_URL}/${id}/${DESCRIPTION}`).then(res => res.json());
  fetch(`${ITEM_URL}/${id}`)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(json => {
      const response = {
        author: getAuthor(),
        item: getItem(json, plain_text)
      }
      res.send(response);
    })
    .catch(({message}) => {
      res.status(404);
      res.send({error: message});
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`ML API - LISTENING ON PORT ${ PORT }`);
});
