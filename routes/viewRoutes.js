import express from 'express';
import { getLoginForm,getBlogs } from '../controllers/viewsController.js';

const router = express.Router();

router.get('/',getBlogs)
router.get('/login',getLoginForm)

export default router