import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TweetAI API',
      version: '1.0.0',
      description: 'API documentation for the TweetAI platform',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/apiRoutes.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default {
  swaggerUi,
  swaggerSpec,
};
