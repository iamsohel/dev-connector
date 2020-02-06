const express = require('express');
const router = express.Router();
const jwtAuth = require('../../middleware/jwtAuth');
const validateObjectId = require('../../middleware/validateObjectId');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route  GET api/post
// @desc gel all posts
// @access Public
router.get('/', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.send(posts);
});

// @route  GET api/post/:id
// @desc gel a single post
// @access Public
router.get('/:id', validateObjectId, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send('No post found')
    res.send(post);
});

// @route  DELETE api/post/:id
// @desc delete a single post
// @access Private
router.delete('/:id', [jwtAuth, validateObjectId], async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    if (post.user != req.user.id) {
        return res.status(403).send('You are not permitted to delete this post');
    }
    await post.remove();
    res.send(post);
});

// @route  POST api/post
// @desc create new post
// @access Private
router.post('/', jwtAuth, async (req, res) => {
    const validatePostInput = require('../../validation/post');
    const { errors, isValid } = validatePostInput(req.body);
    //if error, isValid will false else true
    if (!isValid) return res.status(400).send(errors);
    const post = new Post({
        name: req.body.name,
        text: req.body.text,
        avatar: req.body.avatar,
        user: req.user.id
    })
    const newPost = await post.save();
    res.send(newPost);

});

// @route  POST api/post/like/:post_id
// @desc like a post
// @access Private
router.post('/like/:id', jwtAuth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send('No post found with given id');
    //check user already liked the post
    const checkLiked = post.likes.filter(item => item.user == req.user.id).length > 0;
    if (checkLiked) return res.status(400).send('You already liked the post');
    post.likes.unshift({ user: req.user.id });
    const updatedPost = await post.save();

    res.send(updatedPost);
});

// @route  DELETE api/post/unlike/:post_id
// @desc unlike a post
// @access Private
router.delete('/unlike/:id', jwtAuth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send('No post found with given id');
    //check user already liked the post
    const checkLiked = post.likes.filter(item => item.user == req.user.id).length == 0;
    if (checkLiked) return res.status(400).send('You have not liked this post yet');
    const removeIndex = post.likes.map(item => item.user).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    const updatedPost = await post.save();
    res.send(updatedPost);
});

// @route  POST api/post/comment/:post_id
// @desc comment a post
// @access Private
router.post('/comment/:id', jwtAuth, async (req, res) => {
    const validatePostInput = require('../../validation/post');
    const { errors, isValid } = validatePostInput(req.body);
    //if error, isValid will false else true
    if (!isValid) return res.status(400).send(errors);
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send('No post found with given id');
    const newComment = {
        text: req.body.text,
        user: req.user.id,
        avatar: req.body.avatar,
        name: req.body.name
    };
    post.comments.unshift(newComment);
    await post.save();
    res.send(post);
});

// @route  DELETE api/post/comment/:post_id/:comment_id
// @desc delete a comment from a post
// @access Private
router.delete('/comment/:post_id/:comment_id', jwtAuth, async (req, res) => {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(400).send('No post found with given id');
    //check user already liked the post
    const checkLiked = post.comments.filter(item => item._id == req.params.comment_id).length == 0;
    if (checkLiked) return res.status(400).send('Comment doesn\'t exist ');
    const removeIndex = post.comments.map(item => item._id).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    const updatedPost = await post.save();
    res.send(updatedPost);
});

module.exports = router;