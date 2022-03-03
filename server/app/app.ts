// Vendor
import http from 'http';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fs from "fs";
// Custom middleware
import authMiddleware from "./modules/auth/middleware";
// Controllers
import {createUser} from "./modules/users/controllers";
// Routes
import authRoutes from "./modules/auth/routes";
import userRoutes from "./modules/users/routes";
// Utils
import {DB_PATH, createDb} from "./modules/db/utils";

// ###################################################################
// Config
// ###################################################################
const app = express();
const api = express();

if (!fs.existsSync(DB_PATH)) {
  createDb();
}

const allowedOrigins = ['http://localhost:3000'];

// ###################################################################
// Api
// ###################################################################
app.use(bodyParser.json());
// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware for cookie
app.use(cookieParser());
// Cors
api.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// Register auth routes
api.use('/', authRoutes);
// Register public user routes
api.post('/users', createUser);
// Register protected user routes
// api.use('/users', authMiddleware.validate('verifyToken'), authMiddleware.verifyToken, userRoutes);
// TODO: Use the below code instead once done
if (process.env.NODE_ENV === 'development') {
  api.use('/users', userRoutes);
} else {
  api.use('/users', authMiddleware.validate('verifyToken'), authMiddleware.verifyToken, userRoutes);
}

// ###################################################################
// App
// ###################################################################
// Api
app.use('/api/v1/', api);


// ###################################################################
// Server
// ###################################################################
const server = http.createServer(app);
const PORT = process.env.PORT || '5000';
server.listen(PORT, function () {
  console.log(`Server app listening on port ${PORT}!`);
});