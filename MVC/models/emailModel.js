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

  // Function to send new email with dynamic content

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mrallround5@gmail.com', // ovoj e FROM email address
    pass: 'sbgv vaoy jrnp euva'  // Gmail App Password here
  }
});

export async function sendEmail({ email, name, message }) {
  const mailOptions = {
    from: '',
    to: 'mrallround5@gmail.com',
    subject: email,
    text: `New message from ${name}:
    ${message}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('sendEmail error:', error);
    throw new Error('Failed to send email');
  }
}
