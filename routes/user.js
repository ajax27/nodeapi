const express = require('express');
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  userImage,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  deleteUser,
  hasAuthorization
  } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

// Follow Routes
router.put('/user/follow', requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, hasAuthorization, updateUser);
router.delete('/user/:userId', requireSignin, hasAuthorization,  deleteUser);

// User image
router.get('/user/photo/:userId', userImage);

// who to follow
router.get("/user/findpeople/:userId", requireSignin, findPeople);

// Auth/Params Routes containing userId will be authorized by userById()
router.param("userId", userById);

module.exports = router;