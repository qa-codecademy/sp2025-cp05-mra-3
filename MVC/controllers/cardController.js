// /MVC/controllers/cardController.js
import { v4 as uuidv4 } from 'uuid';
import { saveCard, getAllCards, updateCard } from '../models/cardModel.js';  // Import the model functions
import { cardCreateSchema, cardUpdateSchema  } from '../middlewares/zodSchema.js'; // Import Zod schema for validation

// Controller to save card
export async function saveCardController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = cardCreateSchema.parse(req.body);

    // add unique id to card
    const newCardWithId = {
      ...parsedData,
      id: uuidv4(),
    };

    // Use the model to save the validated card
    await saveCard(newCardWithId);


    res.status(201).json({ message: 'Card saved successfully!' });
  } catch (err) {
    // If validation fails, send an error response
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error saving card.' });
    }
  }
}

// Controller to update card
export async function updateCardController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = cardUpdateSchema.parse(req.body);

    // Use the model to save the card
    await updateCard(parsedData);


    res.status(201).json({ message: 'Card updated successfully!' });
  } catch (err) {
    // If validation fails, send an error response
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error saving card.' });
    }
  }
}

// Controller to get all cards
export async function getAllCardsController(req, res) {
  try {
    // Use the model to fetch all cards
    const cards = await getAllCards();

    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cards.' });
  }
}

