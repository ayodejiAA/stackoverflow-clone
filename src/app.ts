import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { serve, setup } from 'swagger-ui-express';
import YAML from 'yamljs';

import { notFoundErrorHandler, serverErrorHandler } from './common/';
import { appRoutes } from './app.routes';

const swaggerDoc = YAML.load(path.join(__dirname, './docs/docs.yml'));

// Create express application
const app: express.Application = express();

// allow cross-origin requests
app.use(cors());

// Logger
app.use(morgan('dev'));

// middleware to parse all incoming requests as JSON
app.use(express.json());

// API docs route
app.use('/api/v1/api-docs', serve, setup(swaggerDoc));

// Base Route
app.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

// App Routes
appRoutes(app);

// Error handlers
app.use(serverErrorHandler, notFoundErrorHandler);

export default app;
