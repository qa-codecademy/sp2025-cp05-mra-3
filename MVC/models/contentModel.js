import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the contents.json file inside the data folder
const dataFile = path.join(__dirname, '/../../data/contents.json');

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

// Function to update content to the file
export async function updateContent(updatedContent) {
  try {
    const content = await getAllContent();
    const index = content.findIndex(c => c.id === updatedContent.id);

    content[index] = updatedContent;

    await fs.writeFile(dataFile, JSON.stringify(content, null, 2));
  } catch (err) {
    throw new Error('Error updating content: ' + err.message);
  }
}
