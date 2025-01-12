import express from 'express';
import createUser  from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(createUser);

export default router;