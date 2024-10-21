import express from 'express';
import verifyToken from '../../config/verifyToken.js';
import { getArticles, postArticles } from '../controllers/articles.js';

const router = express.Router();

router.get('/articles', getArticles);

router.post('/article/:id', postArticles);

export default router;
