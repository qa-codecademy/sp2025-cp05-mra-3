 // /MVC/routes/cardRoutes.js
import { Router } from 'express';
import { saveCardController, getAllCardsController, updateCardController} from '../controllers/cardController.js';
const router = Router();

// Route to fetch all cards
router.get('/card', getAllCardsController);

// Route to post new card
router.post('/card', saveCardController);

// Route to update card
router.put('/card', updateCardController);

export default router;
