import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import { errorHandler, notFound, } from './middleware/errorMiddleware.js';
import userRouter from './router/userRoute.js';
dotenv.config();
const port = process.env.PORT || 5000
const app = express();


connectDB();


app.use(cookieParser());
//parse in json format
app.use(express.json());
//sending data form 
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

// verification du mode d'excution du project

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

     console.log(__dirname);
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend','dist',
     'index.html')));
} else {

    app.get('/', (req, res) => res.send('server running at http://localhost'))
}


app.use(notFound)
app.use(errorHandler);
app.listen(port, ()=> console.log(`listing to the port ${port}`));