import Router from 'express';
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
} from '../controllers/user';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

export default router;
