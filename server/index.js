const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config();

app.use(cors());

app.get('/allCoins', async (req, resp) => {
    const url = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            'Accept': 'application/json'
        },
    });
    const data = url.data;
    let coins = data.data.slice(0, 100).map(crypto => ({
      name: crypto.name,
      symbol: crypto.symbol,
      currentPrice: crypto.quote.USD.price,
      marketCap: crypto.quote.USD.market_cap
    }));
    resp.status(200).send(coins);
   });



   app.get('/exchangeRate/:crypto/:currency/:amount', async (req, res) => {
    const crypto = req.params.crypto;
    const currency = req.params.currency;
    const amount = req.params.amount;
    try {
        const url = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${crypto}&convert=${currency}`, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
                'Accept': 'application/json'
            },
        });
        const data = url.data;
        const price = data.data[crypto][0].quote[currency].price;
        const TotalValue = price * amount;
        res.status(200).send({
                    TotalValue: TotalValue
                });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching the exchange rate.' });
    }
   });


   app.get('/allSymbols', async (req, resp) => {
    const url = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            'Accept': 'application/json'
        },
    });
    const data = url.data;
    let coins = data.data.slice(0, 100).map(crypto => ({
      name: crypto.symbol,
    }));
    resp.status(200).send(coins);
   });

   app.get('/allCurrency', async (req, resp) => {
    const url = await axios.get('https://pro-api.coinmarketcap.com/v1/fiat/map', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
            'Accept': 'application/json'
        },
    });
    const data = url.data;
    let coins = data.data.slice(0, 25).map(crypto => ({
      name: crypto.symbol,
    }));
    resp.status(200).send(coins);
   });


   module.exports = app;

app.listen(5001);