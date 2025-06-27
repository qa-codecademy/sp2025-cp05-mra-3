 // /MVC/routes/emailRoutes.js
import { Router } from 'express';
import { saveEmailController, getAllEmailsController, sendEmailController } from '../controllers/emailController.js';

const router = Router();

// Route to fetch all email
router.get('/contact', getAllEmailsController);

// Route to save and send new email
router.post('/contact', sendEmailController, saveEmailController);

export default router;
