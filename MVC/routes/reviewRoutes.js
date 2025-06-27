 // /MVC/routes/reviewRoutes.js
import { Router } from 'express';
import { saveReviewController, getAllReviewsController, updateReviewController} from '../controllers/reviewController.js';

const router = Router();

// Route to fetch all reviews
router.get('/review', getAllReviewsController);

// Route to post new review
router.post('/review', saveReviewController);

// Route to update review
router.put('/review', updateReviewController);

export default router;
