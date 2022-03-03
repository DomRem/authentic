import {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import {validateUserPasswordHash} from "../users/utils";
import {readFromDb} from "../db/utils";

const login = async (req: Request, res: Response) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array({
        onlyFirstError: true
      })});
    return;
  }

  const { email, password } = req.body;

  const users = readFromDb();
  const user = await validateUserPasswordHash({email, password}, users);
  if (!user) {
    return res.status(403).json({code: 'Invalid Payload'});
  }

  // Auth token
  const accessToken = jwt.sign(user, process.env.AUTH_SECRET, {expiresIn: '600s'});
  const refreshToken = jwt.sign(user, process.env.AUTH_SECRET, {expiresIn: '3600s'});
  return res
    .cookie('refreshToken', refreshToken, { httpOnly: true })
    .status(200)
    .send(accessToken);
}

const validate = (method) => {
  const missingPropMsg = 'Missing property!';
  switch (method) {
    case 'login': {
      return [
        body('email', missingPropMsg).exists(),
        body('email', 'Incorrect format').isEmail(),
        body('password', 'Invalid email').exists(),
      ]
    }
  }
}

export default {
  login,
  validate,
}