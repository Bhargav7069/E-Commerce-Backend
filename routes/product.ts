import { Router } from 'express';
import { checkCompanyAuth, adminOnly } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';
import { createProduct, getProducts } from '../controller/product';

const router = Router();

// Swagger Doc Comment (Example)
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 */
router.get('/', getProducts);

router.post(
  '/', 
  checkCompanyAuth, 
  adminOnly, 
  upload.single('image'), 
  createProduct
);

export default router;