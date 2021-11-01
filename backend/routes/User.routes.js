const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User.model")


// Signup
router.route('/signup').post(async(req, res) => {
    try {
        const {
            username,
            dp,
            email,
            password
        } = req.body;

        if (!username || !email || !password) return res.status(406).json({ Error: "Not Acceptale. All fields are required." })

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            dp,
            email,
            password: hash
        })

        const savedUser = await newUser.save()
        if (!savedUser) return res.status(400).json("Please try again.")

        res.json(savedUser)
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

router.route("/add").post(async(req, res) => {

})


// Signin
router.route('/signin').post(async(req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        if (!username || !password) return res.status(400).json("Error: All fields are required.")

        const user = await User.findOne({ username })
        if (!user) return res.status(400).json("Invalid Credentials.")
        const pwdMatch = await bcrypt.compare(password, user.password)
        if (!pwdMatch) return res.status(400).json("Invalid Credentials.")

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (e) {
        res.status(400).json({ error: e })
    }
})

// Update user
router.route('/update/').post(async(req, res) => {
    try {
        const {
            username
        } = req.body;
        const token = req.headers['x-auth-token']
        const verified = jwt.verify(token, process.env.JWT_KEY)
        if (!verified) return res.status(401).json("Unauthorized access.")
        const updated = await User.updateOne({ _id: verified.id }, { username })
        res.json(updated)
    } catch (e) { res.status(400).json("Error occured while retreiving user data.") }
})

router.route('/delete').delete(async(req, res) => {
    try {} catch (e) { res.status(400).json("Error occured while deleting user data."); }
})

module.exports = router