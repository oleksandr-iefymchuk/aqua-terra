import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import cors from 'cors';

import { apiEndpoints } from './constants.js';
import { swaggerSpec } from './swaggerOptions.js';
import productsRouter from './routes/products.js';
import reviewsRouter from './routes/reviews.js';

export const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const uri = 'mongodb+srv://bizmailer24:u1i0e2e0@cluster0.o3szzil.mongodb.net/aqua-terra';
mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.use(apiEndpoints.PRODUCTS, productsRouter);
app.use(apiEndpoints.REVIEWS, reviewsRouter);

app.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
});
