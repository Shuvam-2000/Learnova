import express from 'express'
import { newUser, userLogin, userLogout, userProfileUpdate } from '../Controllers/user.controller.js';
import { isUserAuthenticated } from '../middlewares/user.middleware.js';

const router = express.Router();

// new user registration
router.post('/signup', newUser);

// user login
router.post('/login', userLogin);

// user profile update
router.put('/update-profile/:userid', isUserAuthenticated, userProfileUpdate);

// user logout
router.get('/logout', userLogout);

export default router;