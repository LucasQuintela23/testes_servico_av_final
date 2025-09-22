## Exemplos de requisições

### Login
```bash
curl -X POST http://localhost:3000/login \
   -H 'Content-Type: application/json' \
   -d '{"username": "admin", "password": "123456"}'
```

### Cadastro de paciente
```bash
curl -X POST http://localhost:3000/patients \
   -H 'Content-Type: application/json' \
   -H 'Authorization: Bearer <SEU_TOKEN_JWT>' \
   -d '{"cpf": "12345678900", "name": "Paciente Teste"}'
```

### Listar pacientes
```bash
curl -X GET http://localhost:3000/patients \
   -H 'Authorization: Bearer <SEU_TOKEN_JWT>'
```

### Agendar consulta
```bash
curl -X POST http://localhost:3000/appointments \
   -H 'Content-Type: application/json' \
   -H 'Authorization: Bearer <SEU_TOKEN_JWT>' \
   -d '{"cpf": "12345678900", "datetime": "2025-09-22T10:00:00Z"}'
```

### Listar consultas
```bash
curl -X GET http://localhost:3000/appointments \
   -H 'Authorization: Bearer <SEU_TOKEN_JWT>'
```
# API de Pacientes e Consultas

Esta API Node.js permite:
- Login de usuários
- Registro e listagem de pacientes
- Agendamento e consulta de horários

O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Como executar o projeto

1. Instale todas as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor ficará disponível em `http://localhost:3000`.

3. Acesse a documentação interativa Swagger em:
   - `http://localhost:3000/api-docs`

## Endpoints principais

- `POST /login` — Login (envie `username` e `password`)
- `POST /patients` — Cadastro de paciente (CPF e nome obrigatórios, não permite duplicados)
- `GET /patients` — Lista todos os pacientes
- `POST /appointments` — Agenda consulta (CPF e datetime obrigatórios, não permite horários duplicados)
- `GET /appointments` — Lista todas as consultas
- `GET /api-docs` — Documentação Swagger

## Testes automatizados

Para rodar todos os testes:
```bash
npm run test:unit        # Testes unitários (controllers com mocks)
npm run test:external    # Testes externos (API real via HTTP)
```
Os testes utilizam Mocha, Chai, Sinon e Supertest.

## Observações importantes
- O banco de dados é resetado ao reiniciar o servidor.
- O arquivo `app.js` exporta o app Express para facilitar testes automatizados.
- O projeto segue padrão MVC (controllers, services, models, middleware).
- Para novos endpoints, lembre-se de atualizar o arquivo `swagger.json`.
# API de Pacientes e Consultas

Esta API Node.js permite:
- Login de usuários
- Registro e listagem de pacientes
- Agendamento e consulta de horários

O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Como executar o projeto

1. Instale todas as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor ficará disponível em `http://localhost:3000`.

3. Acesse a documentação interativa Swagger em:
   - `http://localhost:3000/api-docs`

## Endpoints principais

- `POST /login` — Login (envie `username` e `password`)
- `POST /patients` — Cadastro de paciente (CPF e nome obrigatórios, não permite duplicados)
- `GET /patients` — Lista todos os pacientes
- `POST /appointments` — Agenda consulta (CPF e datetime obrigatórios, não permite horários duplicados)
- `GET /appointments` — Lista todas as consultas
- `GET /api-docs` — Documentação Swagger

## Testes automatizados

Para rodar todos os testes:
```bash
npm run test:unit        # Testes unitários (controllers com mocks)
npm run test:external    # Testes externos (API real via HTTP)
```
Os testes utilizam Mocha, Chai, Sinon e Supertest.

## Observações importantes
- O banco de dados é resetado ao reiniciar o servidor.
- O arquivo `app.js` exporta o app Express para facilitar testes automatizados.
- O projeto segue padrão MVC (controllers, services, models, middleware).
- Para novos endpoints, lembre-se de atualizar o arquivo `swagger.json`.
