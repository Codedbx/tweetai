import express from 'express';
import { createDatabaseIfNotExists, sequelize } from './config/db.js'; 
import { createAutobotsJob } from './jobs/createAutobotsJob.js';
import apiLimiter from './middlewares/rateLimiter.js';
import apiRoutes from './routes/apiRoutes.js';
import swaggerConfig from './config/swagger.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());



app.use('/api/', apiLimiter);

app.use('/api', apiRoutes);

// Set up Swagger UI
app.use('/api-docs', swaggerConfig.swaggerUi.serve, swaggerConfig.swaggerUi.setup(swaggerConfig.swaggerSpec));

createDatabaseIfNotExists()
  .then(() => sequelize.sync())
  .then(() => {
    console.log('Database synced');
    createAutobotsJob();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to initialize the database:', err.message);
  });
