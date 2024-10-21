import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/user.js';
import articleRoutes from './routes/articles.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', [userRoutes, articleRoutes]);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
