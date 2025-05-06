import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the contents.json file inside the data folder
const dataFile = path.join(__dirname, '/../../data/contents.json');
console.log(__dirname)
console.log(__filename)


// Function to get all content from the file
export async function getAllContent() {
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

// Function to save new content to the file
export async function saveContent(newContent) {
  try {
    // Get the existing content from the file
    const content = await getAllContent();

    // Add the new content
    content.push(newContent);

    // Save the updated content back to the file
    await fs.writeFile(dataFile, JSON.stringify(content, null, 2));
  } catch (err) {
    throw new Error('Error saving content: ' + err.message);
  }
}
