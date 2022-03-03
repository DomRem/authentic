import express from 'express';
import usersController from "../users/controllers";
import authController from "./controllers";

const router = express.Router();

router.post('/signup', usersController.validate('createUser'), usersController.createUser);
router.post('/login', authController.validate('login'), authController.login);
// TODO: Implement controller for refresh token
router.post('/refresh', () => {});

export default router;