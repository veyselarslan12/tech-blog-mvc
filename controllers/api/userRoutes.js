const router = require('express').Router()
const { User } = require('../../models')

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username }})
        if(!user) {
            res.status(400).json({ message: 'Invalid username'})
            return;
        }

        const validPassword = await user.checkPassword(req.body.password)
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.json({ user, message: 'You are logged in!' })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).redirect('/')
        })
    } else {
        res.status(400).json({ message: 'Not logged in'})
    }
})

module.exports = router;