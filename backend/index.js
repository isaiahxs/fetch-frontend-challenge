import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import axios from 'axios';
import FormData from 'form-data';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/api/test', (req, res) => {
    res.send('Check the console');
});
