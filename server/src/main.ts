import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';

import { apiEndpoints } from './constants.js';
import { swaggerSpec } from './swaggerOptions.js';
import productsRouter from './routes/products.js';
import reviewsRouter from './routes/reviews.js';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();
const PORT = process.env.PORT;
const uri = process.env.URI;

if (!uri) {
  console.error('URI is not defined in the environment variables');
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.use(apiEndpoints.PRODUCTS, productsRouter);
app.use(apiEndpoints.REVIEWS, reviewsRouter);

app.use('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
