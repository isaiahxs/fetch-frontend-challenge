const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const path = require('path');

dotenv.config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

// API routes
app.use('/', router); // Mount the router on the /api path

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

router.get('/test', (req, res) => {
    res.send('Test endpoint');
});

app.post('/auth/login', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: 'Login successful', name, email });
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all handler for the frontend should be at the end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});