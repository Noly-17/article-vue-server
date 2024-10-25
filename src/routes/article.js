import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { editorVerify } from '../middlewares/roleVerify.js';
import {
  getArticles,
  getSingleArticle,
  postArticles,
  publishArticle,
  editArticle,
} from '../controllers/articles.js';

const router = express.Router();

router.get('/articles', verifyToken, getArticles);

router.get('/articles/:id', verifyToken, getSingleArticle);

router.post('/articles', verifyToken, postArticles);

router.put('/articles/publish/:id', editorVerify, publishArticle);

router.put('/articles/:id', editorVerify, editArticle);

export default router;
