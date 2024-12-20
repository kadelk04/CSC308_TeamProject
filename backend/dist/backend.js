var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import express from 'express';
import cors from 'cors';
import { getDbConnection } from './utils/connection';
import routes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables
//dotenv.config({ path: '../.env.local' });
//console.log('Loaded TOKEN_SECRET:', process.env.TOKEN_SECRET);
const result = dotenv.config({ path: '.env.local' });
if (result.error) {
  console.error('Failed to load .env.local file:', result.error);
} else {
  console.log('Environment variables loaded:', result.parsed);
}
const app = express();
const PORT = process.env.PORT || 8000;
// Middleware
app.use(cors());
app.use(express.json());
// Initialize DB and start server
const startServer = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield getDbConnection();
    // Routes
    app.use('/api', routes);
    // Basic route
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  });
startServer();
