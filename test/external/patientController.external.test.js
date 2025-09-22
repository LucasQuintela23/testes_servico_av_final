import { expect } from 'chai';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';

describe('PatientController - Testes Externos', () => {
  it('deve registrar um novo paciente', async () => {
    const res = await request(baseUrl)
      .post('/patients')
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('Patient registered.');
  });

  it('não deve registrar paciente duplicado', async () => {
    await request(baseUrl)
      .post('/patients')
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    const res = await request(baseUrl)
      .post('/patients')
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    expect(res.statusCode).to.equal(409);
    expect(res.body.message).to.equal('Patient already registered.');
  });

  it('deve listar pacientes', async () => {
    const res = await request(baseUrl)
      .get('/patients');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
