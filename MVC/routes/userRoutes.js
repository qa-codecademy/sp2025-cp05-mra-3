 // /MVC/routes/userRoutes.js
import { Router } from 'express';
import { saveUserController, getAllUsersController } from '../controllers/userController.js';

const router = Router();

// Route to fetch all users
router.get('/dashboard', getAllUsersController);

// Route to post new user
router.post('/dashboard', saveUserController);

export default router;
