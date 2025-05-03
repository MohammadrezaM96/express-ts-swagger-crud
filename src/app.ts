import express from 'express';
import userRoutes from './routes/user.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log('Swagger docs available at http://localhost:3000/docs');
});
