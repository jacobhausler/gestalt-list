// Init app
import express from 'express';
const app = express();

// Register routes
import routes from 'routes';
routes(app);

// Start server
app.listen(__DEV__ ? 3000 : undefined);
