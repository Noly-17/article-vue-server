import express from 'express';
import verifyToken from '../../config/verifyToken.js';
import { getUser, createUser } from '../controllers/user.js';

const router = express.Router();

router.post('/create-user', createUser);

router.post('/user/:id', verifyToken, getUser);

export default router;
