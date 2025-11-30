import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from '../controller/auth';
import { validate } from '../middlewares/validationMiddleware';

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
    validate,
  register // You should wrap this with validation middleware handler
);

router.post('/login', login); // You should wrap this with validation middleware handler

export default router;  