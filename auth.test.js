request = require('supertest');
const app = require('../src/server');
const db = require('../src/db');


// Note: you may want to run tests against a test database and reset tables between tests.


describe('Auth flows', () => {
test('register and login', async () => {
const username = 'testuser_' + Date.now();
const pw = 'StrongPass1!';
const reg = await request(app).post('/auth/register').send({ username, password: pw });
expect(reg.statusCode).toBe(201);
const login = await request(app).post('/auth/login').send({ username, password: pw });
expect(login.statusCode).toBe(200);
expect(login.body.token).toBeDefined();
});
});