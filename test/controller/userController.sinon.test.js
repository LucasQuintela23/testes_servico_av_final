const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const userService = require('../../service/userService');

let app;
describe('UserController com Sinon', () => {
  afterEach(() => sinon.restore());

  beforeEach(() => {
    sinon.restore();
    app = express();
    app.use(express.json());
    // Importa o controller após stubar
    const userController = require('../../controller/userController');
    app.use('/login', userController);
  });

  it('deve retornar sucesso se userService.login retornar usuário', async () => {
    sinon.stub(userService, 'login').returns({ username: 'admin', password: 'admin' });
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful.');
  });

  it('deve retornar erro 401 se userService.login retornar falso', async () => {
    sinon.stub(userService, 'login').returns(false);
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials.');
  });
});
