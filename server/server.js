import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './configs/database.js'
import authRouter from './routes/authRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js'
import interviewRouter from './routes/interviewRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import reportRouter from './routes/reportRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://veriq-ochre.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/dashboard/interview", interviewRouter);
app.use("/api/dashboard/report", reportRouter);

const PORT = process.env.PORT || 3000; 

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})