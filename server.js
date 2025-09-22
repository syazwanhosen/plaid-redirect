import express from 'express';
import cors from 'cors';
import createLinkToken from './api/create_link_token.js';

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/create_link_token', (req, res) => createLinkToken(req, res));

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ API is running at http://localhost:${PORT}`);
});