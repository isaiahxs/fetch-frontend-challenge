import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

function verifyToken(token) {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (err) {
        return false;
    }
}

app.get('/auth/status', (req, res) => {
    if (req.cookies['fetch-access-token'] && verifyToken(req.cookies['fetch-access-token'])) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/api/test', (req, res) => {
    res.send('Check the console');
});

app.post('/auth/login', (req, res) => {
    const { name, email } = req.body;
    // Handle authentication logic here
    res.json({ message: 'Login successful', name, email });
});