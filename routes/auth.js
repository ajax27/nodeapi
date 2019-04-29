const express = require('express');
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  socialLogin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { userSignupValidator, passwordResetValidator } = require('../validator');

const router = express.Router();

// Post Routes
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/social-login', socialLogin);

// Get Routes
router.get('/signout', signout);

// Forgot and Reset Password Routes
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', passwordResetValidator, resetPassword);

// Auth/Params Routes containing userId will be authorized by userById()
router.param("userId", userById);

module.exports = router;