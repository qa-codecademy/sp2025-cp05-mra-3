import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the users.json file inside the data folder
const dataFile = path.join(__dirname, '/../../data/users.json');

// Function to get all users from the file
export async function getAllUsers() {
  try {
    const fileData = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array
      return [];
    }
    throw err;
  }
}

// Function to update user to the file
export async function updateUser(updatedUser) {
  try {
    const users = await getAllUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);

    users[index] = updatedUser;

    await fs.writeFile(dataFile, JSON.stringify(users, null, 2));
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
}

// Function to save new user to the file
export async function saveUser(newUser) {
  try {
    // Get the existing user from the file
    const user = await getAllUsers();

    // Add the new user
    user.push(newUser);

    // Save the user back to the file
    await fs.writeFile(dataFile, JSON.stringify(user, null, 2));
  } catch (err) {
    throw new Error('Error saving user: ' + err.message);
  }
}
