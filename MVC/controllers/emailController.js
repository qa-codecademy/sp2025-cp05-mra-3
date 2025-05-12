// /MVC/controllers/emailController.js
import { saveEmail, getAllEmails, sendEmail } from '../models/emailModel.js';  // Import the model functions
import { emailSchema } from '../middlewares/zodSchema.js'; // Import Zod schema for validation

// Controller to save email
export async function saveEmailController(req, res) {
  try {
    // Validate the incoming request body using Zod
    const parsedData = emailSchema.parse(req.body);

    // Use the model to save the validated email
    await saveEmail(parsedData);

    res.status(201).json({ message: 'Email saved successfully!' });
  } catch (err) {
    // If validation fails, send an error response
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Error saving email.' });
    }
  }
}

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
export async function sendEmailController(req, res) {
  try {
    const parsedData = emailSchema.parse(req.body);
    await sendEmail(parsedData);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Email failed to send.' });
  }
}

