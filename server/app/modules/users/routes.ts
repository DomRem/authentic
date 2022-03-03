import express from 'express';
import userController from "./controllers";

const router = express.Router();

router.get('/create', userController.validate('createUser'), userController.createUser)
router.get('/:id', userController.validate('getUser'), userController.getUser)
router.get('/', userController.getUsers)
router.put('/:id', userController.validate('updateUser'), userController.updateUser)
router.delete('/:id', userController.validate('deleteUser'), userController.deleteUser)

export default router;