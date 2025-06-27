// /MVC/controllers/contentController.js
import { updateContent, getAllContent } from '../models/contentModel.js';  // Import the model functions
import { contentSchema } from '../middlewares/zodSchema.js'; // Import Zod schema for validation

// Controller to save content
export async function updateContentController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = contentSchema.parse(req.body);

    // Use the model to save the validated content
    await updateContent(parsedData);

    res.status(201).json({ message: 'Content changed successfully!' });
  } catch (err) {
    // If validation fails, send an error response
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error changing content.' });
    }
  }
}

// Controller to get all content
export async function getAllContentController(req, res) {
  try {
    // Use the model to fetch all content
    const content = await getAllContent();

    res.status(200).json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching content.' });
  }
}

