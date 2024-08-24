import express, { json } from 'express';
import apiRoutes from './routes/apiRoutes';

const app = express();

app.use(json());
app.use('/api', apiRoutes);

export default app;
