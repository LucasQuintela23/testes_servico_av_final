# API de Pacientes e Consultas

Esta API permite login, registro e listagem de pacientes, além de agendamento de consultas. O banco de dados é em memória.

## Instalação

1. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```
2. Inicie o servidor:
   ```bash
   node server.js
   ```

## Endpoints

- `POST /login`: Realiza login (username e password obrigatórios)
- `POST /patients`: Registra paciente (CPF e nome obrigatórios, não permite duplicados)
- `GET /patients`: Lista pacientes
- `POST /appointments`: Agenda consulta (CPF e datetime obrigatórios, não permite horários duplicados)
- `GET /appointments`: Lista consultas
- `GET /api-docs`: Documentação Swagger

## Testes
Para testar a API, utilize ferramentas como Postman, Insomnia ou Supertest (em testes automatizados).

## Observações
- O banco é resetado ao reiniciar o servidor.
- O arquivo `app.js` exporta o app Express para facilitar testes automatizados.
