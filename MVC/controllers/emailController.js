// /MVC/controllers/emailController.js
import { saveEmail, getAllEmails, sendEmail } from '../models/emailModel.js';  // Import the model functions

import { emailSchema } from '../middlewares/zodSchema.js'; // Import Zod schema for validation

// Controller to get all emails
export async function getAllEmailsController(req, res) {
  try {
    // Use the model to fetch all emails
    const email = await getAllEmails();

    res.status(200).json(email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching emails.' });
  }
}

// Controller to send email
export async function sendEmailController(req, res, next) {
  try {
    const parsedData = emailSchema.parse(req.body);

    await sendEmail(parsedData);
    console.log("Email sent successfully.");

    res.status(201).json({ message: 'Email processed successfully!' });
    next();
  } catch (err) {
    console.error('Error in sendEmailController:', err);
    res.status(400).json({ message: err.message || 'Unknown error' });
  }
}

// Controller to save email
export async function saveEmailController(req, res) {
  try {
    const parsedData = emailSchema.parse(req.body);

    await saveEmail(parsedData);
    console.log("Email saved successfully.");

    res.status(201).json({ message: 'Email processed successfully!' });
  } catch (err) {
    console.error('Error in saveEmailController:', err);
    res.status(400).json({ message: err.message || 'Unknown error' });
  }
}