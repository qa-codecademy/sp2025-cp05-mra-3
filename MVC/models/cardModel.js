import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the cards.json file inside the data folder
const dataFile = path.join(__dirname, '/../../data/cards.json');

// Function to get all cards from the file
export async function getAllCards() {
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

// Function to update card to the file
export async function updateCard(updatedCard) {
  try {
    const cards = await getAllCards();
    const index = cards.findIndex(card => card.id === updatedCard.id);

    cards[index] = updatedCard;

    await fs.writeFile(dataFile, JSON.stringify(cards, null, 2));
  } catch (err) {
    throw new Error('Error updating card: ' + err.message);
  }
}

// Function to save new card to the file
export async function saveCard(newCard) {
  try {
    // Get the existing card from the file
    const cards = await getAllCards();

    // Add the new card
    cards.push(newCard);

    // Save the card back to the file
    await fs.writeFile(dataFile, JSON.stringify(cards, null, 2));
  } catch (err) {
    throw new Error('Error saving card: ' + err.message);
  }
}
