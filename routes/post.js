const express = require('express');
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  postImage,
  singlePost,
  deletePost,
  like,
  unlike,
  comment,
  uncomment,
  updatePost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

// Post Like UnLike
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// POst Comment UnComment
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);

router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId', requireSignin, postsByUser);
router.get('/post/:postId', singlePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);

// Post image
router.get('/post/photo/:postId', postImage);

// Auth/Params Routes containing userId will be authorized by userById()
router.param("userId", userById);
router.param("postId", postById);

module.exports = router;