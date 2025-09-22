import { expect } from 'chai';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';

describe('UserController - Testes Externos', () => {
  it('deve logar com credenciais corretas', async () => {
    const res = await request(baseUrl)
      .post('/login')
      .send({ username: 'admin', password: 'admin' });
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('Login successful.');
  });

  it('deve falhar com credenciais incorretas', async () => {
    const res = await request(baseUrl)
      .post('/login')
      .send({ username: 'admin', password: 'errado' });
    expect(res.statusCode).to.equal(401);
    expect(res.body.message).to.equal('Invalid credentials.');
  });
});
