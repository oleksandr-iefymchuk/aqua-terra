import express from 'express';
import mongoose from 'mongoose';

import { apiEndpoints } from './constants.js';
import healthCheckRoute from './routes/healthCheck.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(apiEndpoints.HEALTH_CHECK, healthCheckRoute);

app.use('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server listening on port ${PORT}`);
});
