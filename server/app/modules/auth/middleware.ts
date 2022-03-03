import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import {cookie} from "express-validator";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  try {
    jwt.verify(token, process.env.AUTH_SECRET);
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({code: 'Unauthorized', message: `${err.name}: ${err.message}`});
  }
}


const validate = (method) => {
  switch (method) {
    case 'verifyToken': {
      return [
        cookie('token', 'Invalid token').exists().isString(),
      ]
    }
  }
}

export default {
  verifyToken,
  validate,
}