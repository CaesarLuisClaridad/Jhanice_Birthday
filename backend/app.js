import express from 'express';

const app = express();

import dotenv from 'dotenv';
import greetingsRoutes from "./routes/greetings.js";
import CloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import { connectDataBase } from './config/dbConnect.js';
import ErrorMiddleware from './middleware/error.js';
import path from "path";
import { fileURLToPath } from 'url';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
});

if(process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({path: "backend/config/config.env"});
}

console.log("Current working directory:", __dirname);
console.log("Frontend dist path:", path.join(__dirname, "../frontend/dist"));

// Connecting to database
connectDataBase();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: "*", 
}));

// Add CORS headers globally (custom)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Routes
app.use("/api/v1", greetingsRoutes);
app.use("/api/v1", CloudinaryRoutes); 

if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}

// For error middleware
app.use(ErrorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT} and in ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down due to unhandled rejection');
    server.close(() => {
        process.exit(1);
    });
});
