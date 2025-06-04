// /MVC/controllers/userController.js
import { v4 as uuidv4 } from 'uuid';
import { saveUser, getAllUsers, updateUser } from '../models/userModel.js';  // Import the model functions
import { userCreateSchema, userUpdateSchema  } from '../middlewares/zodSchema.js'; // Import Zod schema for validation

// Controller to save user
export async function saveUserController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = userCreateSchema.parse(req.body);

    // Check if email exists
    const existingUsers = await getAllUsers();
    const emailExists = existingUsers.some(user => user.email.toLowerCase() === parsedData.email.toLowerCase());

    if (emailExists) {
      return res.status(400).json({ error: 'Email already in use.' });
    }
    // add unique id to user
    const newUserWithId = {
      ...parsedData,
      id: uuidv4(),
    };

    // Use the model to save the validated user
    await saveUser(newUserWithId);


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

// Controller to update user
export async function updateUserController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = userUpdateSchema.parse(req.body);

    // Use the model to save the user
    await updateUser(parsedData);


    res.status(201).json({ message: 'User updated successfully!' });
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
    const user = await getAllUsers();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users.' });
  }
}

