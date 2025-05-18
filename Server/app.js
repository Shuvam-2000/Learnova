import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import './utils/connection.js'
import courseRoute from './routes/course.routes.js'

// initialize the app
const app = express();

// load enviorment variables
configDotenv();

// initialize the PORT
const PORT = process.env.PORT || 8001;

// middlewares
app.use(express.json())  // Parse JSON request
app.use(express.urlencoded({ extended: true }))  // Parse URL-encoded request bodies
app.use(cors());

// test route
app.get('/', (req,res) => {
    res.send('Hello Server Is Runing');
})

// defining the routes for the app
app.use('/api/course', courseRoute)  // course route

// start the server
app.listen(PORT, () => console.log(`Server is Running at PORT: ${PORT}`))
