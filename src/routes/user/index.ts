import { Router } from 'express';
import { UserController } from '../../controllers';
import { isAuth } from '../../middleware/auth';

const router = Router();

router.get('/:id', isAuth, UserController.profile);
router.put('/:id', isAuth, UserController.updateProfile);

export default router;
