import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the emails.json file inside the data folder
const dataFile = path.join(__dirname, '/../../data/emails.json');

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
// Function to send new email
const mailOptions1 = {}
export function sendEmail(newEmail) {
  mailOptions1 = {
  from: newEmail.email,
  to: 'mrallround5@gmail.com',
  subject: newEmail.name,
  text: newEmail.message
};
sendMail1(mailOptions1)
// return mailOptions1;
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mrallround5@gmail.com',
    pass: 'sbgv vaoy jrnp euva'  // Use the App Password here
  }
});

// const mailOptions = {
//   from: 'stevan.rufceski@gmail.com',
//   to: 'mrallround5@gmail.com',
//   subject: 'Test Email',
//   text: 'Hello, this is a test email.'
// };

transporter.sendMail1(mailOptions1, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
