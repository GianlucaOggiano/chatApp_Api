import { Router } from 'express';
import { AuthController } from '../../controllers';

const router = Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/logout', AuthController.logout);

export default router;
