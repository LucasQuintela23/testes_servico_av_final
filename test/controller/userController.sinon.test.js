import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { userService } from '../../service/userService.js';
import userController from '../../controller/userController.js';
import { expect } from 'chai';

let app;
describe('UserController com Sinon', () => {
  afterEach(() => sinon.restore());

  beforeEach(() => {
    sinon.restore();
  app = express();
  app.use(express.json());
  app.use('/login', userController);
  });

  it('deve retornar sucesso se userService.login retornar usuário', async () => {
  sinon.stub(userService, 'login').returns({ username: 'admin', password: 'admin' });
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin' });
  expect(res.statusCode).to.equal(200);
  expect(res.body.message).to.equal('Login successful.');
  });

  it('deve retornar erro 401 se userService.login retornar falso', async () => {
  sinon.stub(userService, 'login').returns(false);
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });
  expect(res.statusCode).to.equal(401);
  expect(res.body.message).to.equal('Invalid credentials.');
  });
});
