const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');

// [POST] : /v1/blog/post (create blog post)
router.post('/post', [
    body('title').isLength({min: 5}).withMessage('input title minimum 5 karakter'),
    body('body').isLength({min: 5}).withMessage('input body minimum 5 karakter')],
    blogController.createBlogPost);
// [GET] : /v1/blog/posts (Get All blog)
router.get('/posts', blogController.getAllBlogPost);
// [GET] : query parameter (pagination) : contoh oleh user (Get All blog) only example from frontend
// router.get('/posts?page=1&perPage=5', blogController.getAllBlogPost);
// [GET] : /v1/blog/post/:postId (Get blog by id)
router.get('/post/:postId', blogController.getBlogPostById);
// [PUT] : /v1/blog/post/:postId (Update blog post by id)
router.put('/post/:postId', [
    body('title').isLength({min: 5}).withMessage('input title minimum 5 karakter'),
    body('body').isLength({min: 5}).withMessage('input body minimum 5 karakter')],
    blogController.updateBlogPost);

// [DELETE] : /v1/blog/post/:postId
router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;