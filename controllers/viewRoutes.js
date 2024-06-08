const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/authMiddleware')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        // serialize data
        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('home', {
            posts,
            logged_in: req.session.logged_in   
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [User]
                }
            ]
        })
        // serialize data
        const post = postData.get({ plain: true })

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/')
        return
    }

    res.render('login')
})

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/')
        return
    }

    res.render('signup')
})

router.get('/profile', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        // serialize data
        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('profile', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router