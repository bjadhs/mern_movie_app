import express from 'express';
import {createUser, getAllUsers, loginUser, logoutUser}  from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';


const router = express.Router();

router
    .route('/')
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers)

router.post('/auth',loginUser);
router.post('/logout',logoutUser);


export default router;