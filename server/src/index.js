import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import userRouter from './routes/userRoutes.js';
import wasteReqRouter from './routes/wasteReqRoutes.js';
import contributionsRouter from './routes/contributionsRoutes.js';
import innovativeProdsRouter from './routes/innovativeProdsRoutes.js';
import bulkWasteRouter from './routes/bulkWasteRoutes.js';
import authRouter from './routes/authRoutes.js';
import satisfiedWasteOrdersRouter from './routes/satisfiedWasteOrdersRoutes.js';
import innovativeProdOrdersRouter from './routes/innovativeProdOrdersRouter.js';
import bulkWasteOrdersRouter from './routes/bulkWasteOrdersRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

const app = express();

const corsOptions = {
  origin: [
    process.env.CLIENT_URL, 
    'http://localhost:5173'
    // 'https://punarnavah.abhiramverse.tech',
    // 'https://punarnavah.vercel.app'
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/waste-req", wasteReqRouter);
app.use("/api/v1/contributions", contributionsRouter);
app.use("/api/v1/innovative-prod", innovativeProdsRouter);
app.use("/api/v1/satisfied-waste-orders", satisfiedWasteOrdersRouter);
app.use("/api/v1/innovative-prod-orders", innovativeProdOrdersRouter);
app.use("/api/v1/bulk-waste-orders", bulkWasteOrdersRouter);
app.use("/api/v1/bulk-waste", bulkWasteRouter);
app.use("/api/v1/payment", paymentRouter);

const start = async () => {
  try {
    const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/Ecohub';
    await mongoose.connect(mongoUrl, { dbName: undefined });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();