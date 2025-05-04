// /app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import contentRoutes from './MVC/routes/contentRoutes.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(express.static(path.join(__dirname, 'HTML')));  // Serve HTML files
app.use(express.static(path.join(__dirname, 'css')));   // Serve CSS files
app.use(express.static(path.join(__dirname, 'scripts'))); // Serve JS files
app.use(express.static(path.join(__dirname, 'data'))); // Serve JS files

// app.use(express.static(path.join(__dirname))); // Serve JS files


// Routes
app.use('/api', contentRoutes);  // All API routes for content

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
