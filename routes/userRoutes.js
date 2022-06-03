import express from "express";
import {signup,login} from '../controllers/authController.js'
import {createUser} from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.route('/register').post(createUser)

export default router