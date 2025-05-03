import express from 'express';
const router = express.Router();
import emailController from '../controllers/emailController.js';

router.post('/create', emailController.createEmail);
router.post('/update', emailController.updateEmail);
router.post('/delete', emailController.deleteEmail);
router.get('/all', emailController.getAllEmails);
router.get('/:id', emailController.getEmailById);

module.exports = router;