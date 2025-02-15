import { Router } from 'express';
import { v4 } from 'uuid';
import User from './app/models/User';

const router = Router();

router.get('/', async (req, res) => {
    const user = await User.create({
        id: v4(),
        name: 'Guilherme',
        email: 'guilhermetxt53@gmail.com',
        password_hash: 'hbfhbfsdjfjsdnfj',
    });
    return res.status(201).json(user);
});

export default router;