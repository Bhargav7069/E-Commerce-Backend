import { Router } from 'express';
import { checkCompanyAuth, adminOnly } from '../middlewares/authMiddleware';
import { createCategory, getCategories } from '../controller/category';

const router = Router();

router.get('/', getCategories);

router.post('/', checkCompanyAuth, adminOnly, createCategory );

export default router;