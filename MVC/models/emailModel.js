import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the emails.json file inside the data folder
const dataFile = path.join(__dirname, '/../../data/emails.json');
console.log(__dirname)
console.log(__filename)


// Function to get all emails from the file
export async function getAllEmails() {
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

// Function to save new email to the file
export async function saveEmail(newEmail) {
  try {
    // Get the existing email from the file
    const email = await getAllEmails();

    // Add the new email
    email.push(newEmail);

    // Save the email back to the file
    await fs.writeFile(dataFile, JSON.stringify(email, null, 2));
  } catch (err) {
    throw new Error('Error saving email: ' + err.message);
  }
}
