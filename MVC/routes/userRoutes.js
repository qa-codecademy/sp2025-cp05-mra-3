 // /MVC/routes/userRoutes.js
import { Router } from 'express';
import { saveUserController, getAllUsersController, updateUserController} from '../controllers/userController.js';

const router = Router();

// Route to fetch all users
router.get('/user', getAllUsersController);

// Route to post new user
router.post('/user', saveUserController);

// Route to update user
router.put('/user', updateUserController);

export default router;
