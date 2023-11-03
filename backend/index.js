// import dotenv from 'dotenv';
// import cors from 'cors';
// import express from 'express';
// import axios from 'axios';
// import FormData from 'form-data';
// const router = express.Router();

// dotenv.config();

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// router.get('/test', (req, res) => {
//     res.send('Test endpoint');
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/api/test', (req, res) => {
//     res.send('Check the console');
// });

// app.post('/auth/login', (req, res) => {
//     const { name, email } = req.body;
//     // Handle authentication logic here
//     res.json({ message: 'Login successful', name, email });
// });

// app.use('/', router);