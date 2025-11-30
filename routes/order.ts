import { Router } from 'express';
import { checkCompanyAuth } from '../middlewares/authMiddleware';
import { addToCart, placeOrder,getOrderHistory } from '../controller/order';

const router = Router();

router.post('/cart', checkCompanyAuth, addToCart);
router.post('/', checkCompanyAuth, placeOrder);
router.get('/history', checkCompanyAuth, getOrderHistory)

export default router;