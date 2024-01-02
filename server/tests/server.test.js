const request = require('supertest');
const app = require('../index');

describe('Test the /allCoins endpoint', () => {
   test('It should respond with a status code of 200', async () => {
       const response = await request(app).get('/allCoins');
       expect(response.statusCode).toBe(200);
   });
});

describe('Test the /exchangeRate/:crypto/:currency/:amount endpoint', () => {
   test('It should respond with a status code of 200', async () => {
       const response = await request(app).get('/exchangeRate/BTC/USD/1');
       expect(response.statusCode).toBe(200);
   });
});

describe('Test the /allSymbols endpoint', () => {
   test('It should respond with a status code of 200', async () => {
       const response = await request(app).get('/allSymbols');
       expect(response.statusCode).toBe(200);
   });
});

describe('Test the /allCurrency endpoint', () => {
   test('It should respond with a status code of 200', async () => {
       const response = await request(app).get('/allCurrency');
       expect(response.statusCode).toBe(200);
   });
});
