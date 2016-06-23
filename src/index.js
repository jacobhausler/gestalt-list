// Init app
import express from 'express';
const app = express();

// Register modules
import { hello } from 'modules';
app.use('/', hello);

// Listen on port 3000
app.listen(__DEV__ ? 3000 : undefined);
