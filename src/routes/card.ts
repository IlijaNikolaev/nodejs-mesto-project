import Router from 'express';
import {
  getCards, createCard, deleteCardById, likeCard, unlikeCard,
} from '../controllers/card';

const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCardById);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', unlikeCard);

export default router;
