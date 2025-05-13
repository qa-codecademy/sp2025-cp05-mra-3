 // /MVC/routes/emailRoutes.js
import { Router } from 'express';
import { saveEmailController, getAllEmailsController, sendEmailController } from '../controllers/emailController.js';

const router = Router();

// Route to fetch all email
router.get('/contact', getAllEmailsController);

// // Route to send new email
// router.post('/contact', sendEmailController);

// Route to save new email
router.post('/contact', saveEmailController);

export default router;
