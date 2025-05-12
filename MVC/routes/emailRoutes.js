 // /MVC/routes/emailRoutes.js
import { Router } from 'express';
import { saveEmailController, getAllEmailsController, sendEmailController } from '../controllers/emailController.js';

const router = Router();

// Route to fetch all email
router.get('/contact', getAllEmailsController);

// Route to post new email
router.post('/contact', saveEmailController);

// Route to send new email
router.post('/contact', sendEmailController);

export default router;
