import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

const router = Router();

router.post('/users', UserController.store);
router.post('/session', SessionController.store);
router.post('/products', ProductController.store);

export default router;