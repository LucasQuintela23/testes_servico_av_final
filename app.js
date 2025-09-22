// app.js
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import userController from './controller/userController.js';
import patientController from './controller/patientController.js';
import appointmentController from './controller/appointmentController.js';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/login', userController);
app.use('/patients', patientController);
app.use('/appointments', appointmentController);

export default app;
