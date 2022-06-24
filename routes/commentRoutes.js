import express from 'express';
import { restrictTo } from '../controllers/authController';
import { getAll } from '../controllers/handlerFactory';

const router = express.Router([mergeParams:true])

router.use(protect)

router('/')get(getAllComments).post(restrictTo('user',) SetCommentAndUserIds, createCommnet)

export default router;
