// /app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import contentRoutes from './MVC/routes/contentRoutes.js';
import emailRoutes from './MVC/routes/emailRoutes.js';
import userRoutes from './MVC/routes/userRoutes.js';
import cardRoutes from './MVC/routes/cardRoutes.js'
import reviewRoutes from './MVC/routes/reviewRoutes.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.static(path.join(__dirname, 'HTML')));  // Serve HTML files
app.use('/css',express.static(path.join(__dirname, 'css')));   // Serve CSS files
app.use('/scripts', express.static(path.join(__dirname, 'scripts'))); // Serve JS files
app.use('/modules',express.static(path.join(__dirname, 'modules'))); // Serve module files
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // Serve assets files
app.use(express.static(path.join(__dirname, 'data'))); // Serve data files

// Routes
app.use('/api', contentRoutes);  // All API routes for content
app.use('/api', emailRoutes);  // All API routes for emails
app.use('/api', userRoutes);  // All API routes for users
app.use('/api', cardRoutes);  // All API routes for cards
app.use('/api', reviewRoutes);  // All API routes for reviews

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
