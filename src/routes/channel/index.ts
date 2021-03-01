import { Router } from 'express';
import { ChannelController } from '../../controllers';
import { isAuth } from '../../middleware/auth';

const router = Router();

router.get('/', isAuth, ChannelController.findAll);
router.get('/:id', isAuth, ChannelController.findById);
router.post('/create', isAuth, ChannelController.create);
router.put('/subscribe/:id', isAuth, ChannelController.subscribe);
router.put('/unsubscribe/:id', isAuth, ChannelController.unSubscribe);
router.delete('/:id', isAuth, ChannelController.remove);
export default router;
