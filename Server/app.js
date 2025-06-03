import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import './utils/connection.js'
import courseRoute from './routes/course.routes.js'
import userRoute from './routes/user.routes.js'
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary'

// initialize the app
const app = express();

// load enviorment variables
configDotenv();

// initialize the PORT
const PORT = process.env.PORT || 8001;

// middlewares
app.use(express.json())  // Parse JSON request
app.use(express.urlencoded({ extended: true }))  // Parse URL-encoded request bodies
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

// test route
app.get('/', (req,res) => {
    res.send('Hello Server Is Runing');
})

// defining the routes for the app
app.use('/api/course', courseRoute)  // course route
app.use('/api/user', userRoute)  // user route

// start the server
app.listen(PORT, () => console.log(`Server is Running at PORT: ${PORT}`))
