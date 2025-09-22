import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { userService } from '../../service/userService.js';
import userController from '../../controller/userController.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

const respostas = JSON.parse(fs.readFileSync(path.resolve('test/fixture/respostas/user.json')));

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
    sinon.stub(userService, 'login').returns(respostas.loginSuccess.body);
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin' });
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('Login successful.');
  });

  it('deve retornar erro 401 se userService.login retornar falso', async () => {
    sinon.stub(userService, 'login').returns(respostas.loginFail.body);
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });
    expect(res.statusCode).to.equal(401);
    expect(res.body.message).to.equal('Invalid credentials.');
  });
});
