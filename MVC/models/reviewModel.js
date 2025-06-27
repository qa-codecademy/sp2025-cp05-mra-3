import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the reviews.json file inside the data folder
const dataFile = path.join(__dirname, '/../../data/reviews.json');

// Function to get all reviews from the file
export async function getAllReviews() {
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

// Function to update review to the file
export async function updateReview(updatedReview) {
  try {
    const reviews = await getAllReviews();
    const index = reviews.findIndex(review => review.id === updatedReview.id);

    reviews[index] = updatedReview;

    await fs.writeFile(dataFile, JSON.stringify(reviews, null, 2));
  } catch (err) {
    throw new Error('Error updating review: ' + err.message);
  }
}

// Function to save new review to the file
export async function saveReview(newReview) {
  try {
    // Get the existing review from the file
    const review = await getAllReviews();

    // Add the new review
    review.push(newReview);

    // Save the review back to the file
    await fs.writeFile(dataFile, JSON.stringify(review, null, 2));
  } catch (err) {
    throw new Error('Error saving review: ' + err.message);
  }
}
