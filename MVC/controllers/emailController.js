import { emailSchema } from '../schemas/emailSchema.js';
import fileService from '../services/fileServices.js';

exports.createEmail = (req, res) => {
  const result = emailSchema.safeParse(req.body);
  if (!result.success) return res.status(400).send('Invalid input.');

  const email = { id: Date.now().toString(), ...result.data }; // Assign unique ID
  fileService.addEmail(email);
  res.send('Email created successfully.');
};

exports.updateEmail = (req, res) => {
  const result = emailSchema.safeParse(req.body);
  if (!result.success) return res.status(400).send('Invalid input.');

  const updated = fileService.updateEmail(result.data);
  if (updated) res.send('Email updated.');
  else res.status(404).send('Email not found.');
};

exports.deleteEmail = (req, res) => {
  const { email } = req.body;
  const deleted = fileService.deleteEmail(email);
  if (deleted) res.send('Email deleted.');
  else res.status(404).send('Email not found.');
};

exports.getAllEmails = (req, res) => {
  const emails = fileService.getAllEmails();
  res.json(emails);
};

exports.getEmailById = (req, res) => {
  const email = fileService.getEmailById(req.params.id);
  if (!email) return res.status(404).send('Email not found.');
  res.json(email);
};
