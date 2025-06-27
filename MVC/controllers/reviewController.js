// /MVC/controllers/reviewController.js
import { v4 as uuidv4 } from 'uuid';
import { saveReview, getAllReviews, updateReview } from '../models/reviewModel.js';  // Import the model functions
import { reviewCreateSchema, reviewUpdateSchema  } from '../middlewares/zodSchema.js'; // Import Zod schema for validation

// Controller to save review
export async function saveReviewController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = reviewCreateSchema.parse(req.body);

    // add unique id to review
    const newReviewWithId = {
      ...parsedData,
      id: uuidv4(),
    };

    // Use the model to save the validated review
    await saveReview(newReviewWithId);


    res.status(201).json({ message: 'Review saved successfully!' });
  } catch (err) {
    // If validation fails, send an error response
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error saving review.' });
    }
  }
}

// Controller to update review
export async function updateReviewController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = reviewUpdateSchema.parse(req.body);

    // Use the model to save the review
    await updateReview(parsedData);


    res.status(201).json({ message: 'Review updated successfully!' });
  } catch (err) {
    // If validation fails, send an error response
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error saving review.' });
    }
  }
}

// Controller to get all reviews
export async function getAllReviewsController(req, res) {
  try {
    // Use the model to fetch all reviews
    const review = await getAllReviews();

    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews.' });
  }
}

