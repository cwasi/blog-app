import express from "express";
import {signup} from '../controllers/authController.js'
import {createUser} from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', signup)

router.route('/register').post(createUser)

export default router