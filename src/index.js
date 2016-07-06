import express from 'express';
import gestaltServer from 'gestalt-server';
import gestaltPostgres from 'gestalt-postgres';
import cors from 'cors';

import { API_URL, DATABASE_URL } from 'config';
import { getModuleAtoms } from 'helpers/modules';
import * as modules from 'modules';

const app = express();

app.use(cors({
  origin: API_URL,
  credentials: true,
}));

app.use(gestaltServer({
  schemaPath: `${__root}/schema.graphql`,
  objects: getModuleAtoms(modules, 'object'),
  mutations: getModuleAtoms(modules, 'mutations'),
  database: gestaltPostgres({ databaseURL: DATABASE_URL }),
  secret: '༼ つ ◕_◕ ༽つ',
  development: true,
}));

const port = 8000;
app.listen(port, () => console.log(`Gestalt server running on port ${port}`));
