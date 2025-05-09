 // /MVC/routes/contentRoutes.js
import { Router } from 'express';
import { updateContentController, getAllContentController } from '../controllers/contentController.js';

const router = Router();

// Route to fetch all content
router.get('/content', getAllContentController);

// Route to post new content
router.post('/content', updateContentController);

export default router;
