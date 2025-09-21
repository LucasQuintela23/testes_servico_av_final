const request = require('supertest');
const app = require('../../app');

describe('UserController', () => {
  it('deve logar com credenciais corretas', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'admin' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful.');
  });

  it('deve falhar com credenciais incorretas', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials.');
  });

  it('deve falhar sem username ou password', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Username and password required.');
  });
});
