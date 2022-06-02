import { requiredAuth } from '@mobileorg/common-lib';
import express from 'express';
import { User } from '../models/user';
const router = express.Router();

router.get('/api/users/allUsers', requiredAuth, async (req, res) => {
  const user = await User.find({});
  res.send(user);
});

export { router as allUsersRouter };
