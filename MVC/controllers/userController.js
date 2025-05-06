// /MVC/controllers/userController.js
import { saveUser, getAllUsers } from '../models/userModel.js';  // Import the model functions
import { userSchema } from '../middlewares/zodSchema.js'; // Import Zod schema for validation

// Controller to save user
export async function saveUserController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = userSchema.parse(req.body);

    // Use the model to save the validated user
    await saveUser(parsedData);

    res.status(201).json({ message: 'User saved successfully!' });
  } catch (err) {
    // If validation fails, send an error response
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error saving user.' });
    }
  }
}

// Controller to get all users
export async function getAllUsersController(req, res) {
  try {
    // Use the model to fetch all users
    const content = await getAllUsers();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users.' });
  }
}

