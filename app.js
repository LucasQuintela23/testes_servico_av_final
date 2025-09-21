// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const patientController = require('./controller/patientController');
const appointmentController = require('./controller/appointmentController');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/login', userController);
app.use('/patients', patientController);
app.use('/appointments', appointmentController);

module.exports = app;
