const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

// Display all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('home', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Display a form to create a new blog post
router.get('/new', (req, res) => {
    res.render('new');
});

// Handle creating a new blog post
router.post('/new', async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('new', { error: 'Failed to create a new blog post.' });
    }
});

// Display a specific blog post
router.get('/post/:postId', async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        res.render('post', { post });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
