import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendErrorResponse } from './utils/resoponseHandler';
import CustomError from './utils/customError';
dotenv.config();
import admin from 'firebase-admin';
import authRouter from './routers/authRoute';
import userRouter from './routers/userRouter';
import { initializeDatabase } from './config/dbSetup';

const app = express();
const PORT = process.env.PORT || 3000;

const serviceAccountJson = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);
if (!serviceAccountJson) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
});

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/auth',authRouter);

app.use('/user',userRouter)

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (err instanceof CustomError) {
     return sendErrorResponse(res, err.message, err.statusCode);
    } else {
     return  sendErrorResponse(res, 'Internal Server Error');
    }
  });
  
  initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize the database:', err);
    process.exit(1); // Exit if the database couldn't be initialized
  });