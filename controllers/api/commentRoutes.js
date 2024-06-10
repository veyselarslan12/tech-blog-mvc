const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/authMiddleware')

router.post('/', withAuth, async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(403).json({ message: 'User not logged in.'})
        }
        
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        })

        res.status(200).json(newComment)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

module.exports = router