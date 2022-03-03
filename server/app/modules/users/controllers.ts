import {NextFunction, Request, Response} from 'express';
import {v4 as uuid} from "uuid";
import {hashSync} from 'bcrypt';
import {body, param, validationResult} from 'express-validator'
import {readFromDb, writeToDb} from "../db/utils";
import {
  getUserNotFoundMessage,
  validateByIdUserExists,
  validateByEmailUserNotExists,
  validateByEmailUserEmailNotExists,
} from "./utils";
import {IUser} from "./types";
import jwt from "jsonwebtoken";

// TODO: Create an automated test for createUser functionality
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    // Data preparation
    const { email, password } = req.body;
    const users = readFromDb();
    const newUser: IUser = {
      id: uuid().substring(0, 8),
      email,
      password: hashSync(password, 10),
    };

    if (req.body?.firstName) {
      newUser.firstName = req.body?.firstName;
    }
    if (req.body?.lastName) {
      newUser.lastName = req.body?.lastName;
    }

    // Creating user
    writeToDb([...users, newUser]);

    // Response - Auth token
    const accessToken = jwt.sign(newUser, process.env.AUTH_SECRET, {expiresIn: '600s'});
    const refreshToken = jwt.sign(newUser, process.env.AUTH_SECRET, {expiresIn: '3600s'});
    return res
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .status(200)
      .send(accessToken);
  } catch(err) {
    res.status(500).json({
      code: 'Creating user Failed',
      message: 'Failed to add the new user to the DB!'
    })
    return next(err)
  }
}

const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    // Data preparation
    const { id } = req.params;
    const users = readFromDb();
    const user = users.find(user => user.id === id);

    // Response
    if (user) return res.send(user);
    const userNotFoundMessage = getUserNotFoundMessage(req.method);
    res.status(404).json({code: 'Not Found', message: userNotFoundMessage});
  } catch(err) {
    return next(err)
  }
}

const getUsers = (req: Request, res: Response) => {
  const users = readFromDb();
  return res.send(users);
}

// Other endpoint should be dedicated for updating password.
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    // Data preparation
    const { id } = req.params;
    const { email, password } = req.body
    const users = readFromDb();
    const filteredUsers = users.filter(user => user.id !== id);
    const newUser: IUser = {
      id,
      email,
      password: hashSync(password, 10),
    };

    // Update
    writeToDb([...filteredUsers, newUser]);

    // Response
    res.send(`User with the id ${id} updated!`);

  } catch(err) {
    res.status(500).json({code: 'Update Failed', message: 'Failed to update the user to the DB!'});
    return next(err)
  }
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    // Data preparation
    const { id } = req.params;
    const users = readFromDb();
    const user = users.find(user => user.id === id);

    // Deletion
    if (user) {
      const filteredUsers = users.filter(user => user.id !== id);
      writeToDb(filteredUsers);

      // Response
      return res.status(200).json({code: 'Delete successful', message: 'Successfully deleted user from the DB!'});
    }
    const userNotFoundMessage = getUserNotFoundMessage(req.method);
    res.status(404).json({code: 'Not Found', message: userNotFoundMessage});
  } catch(err) {
    return next(err)
  }
}

const validate = (method) => {
  const missingPropMsg = 'Missing property!';
  const users = readFromDb();
  switch (method) {
    case 'createUser': {
      return [
        body('email', missingPropMsg).exists(),
        body('email', 'Incorrect format').isEmail(),
        body('email', 'Already exists').custom(
          (id) => validateByEmailUserNotExists(id, users)
        ),
        body('password', missingPropMsg).exists(),
      ]
    }
    case 'getUser': {
      return [
        param('id', missingPropMsg).exists(),
      ]
    }
    case 'updateUser': {
      return [
        param('id', missingPropMsg)
          .exists()
          .custom((id, {req}) => validateByIdUserExists(id, req, users)),
        body('email', missingPropMsg).exists(),
        body('email', 'Incorrect format').isEmail(),
        body('email', 'Invalid email')
          .custom(
            (email, {req}) => validateByEmailUserEmailNotExists(email, req, users)
          ),
        body('password', missingPropMsg).exists().isString(),
      ]
    }
    case 'deleteUser': {
      return [
        param('id', missingPropMsg).exists(),
      ]
    }
  }
}

export default {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  validate,
}