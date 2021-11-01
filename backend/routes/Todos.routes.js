const router = require("express").Router()
const Todo = require("../models/Todo.model")
const User = require("../models/User.model")
const jwt = require("jsonwebtoken")

router.route("/test-route").get(async(req, res) => {
    res.json({ "response": "api endpoint worked" })
})

// My Todos
router.route('/').get(async(req, res) => {
    const token = req.headers["x-auth-token"]
    const valid = jwt.verify(token, process.env.JWT_KEY)
    if (!valid) return res.status(401).json("Error: Unauthorized access.")
    const myTodos = await Todo.find({
        user_id: valid.id
    })
    res.json(myTodos)
})

// Add Todo
router.route('/add').post(async(req, res) => {
    try {
        const {
            title,
            description
        } = req.body;
        const token = req.headers["x-auth-token"];
        const valid = jwt.verify(token, process.env.JWT_KEY);
        if (!valid) return res.status(401).json("Error: Unauthorized access.");
        const user = await User.find({ _id: valid.id })

        const newTodo = new Todo({
            user_id: user[0]._id,
            title,
            description
        })

        const savedTodo = await newTodo.save()
        if (!savedTodo) return res.status(400).json("Error: Error while adding todo");
        res.json(savedTodo)
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

// Update Todo
router.route('/update/:id').post(async(req, res) => {
    const {
        title,
        description
    } = req.body;
    const token = req.headers["x-auth-token"]
    if (!token) res.status(401).json("Error: Unauthorized access");

    const valid = jwt.verify(token, process.env.JWT_KEY)
    if (!valid) res.status(401).json("Error: Unauthorized access");

    const todo = await Todo.findById(req.params.id)
    if (valid.id === todo.user_id) {
        todo.title = title
        todo.description = description
        const savedUpdatedTodo = await todo.save()
        res.json(savedUpdatedTodo)
    } else {
        res.status(401).json("Error: Unauthorized access")
    }
})

// Delete Toto
router.route('/delete/:id').post(async(req, res) => {
    const token = req.headers["x-auth-token"]
    if (!token) res.status(401).json("Error: Unauthorized access");

    const valid = jwt.verify(token, process.env.JWT_KEY);
    if (!valid) res.status(401).json("Error: Unauthorized access");

    const todo = await Todo.findById(req.params.id)
    if (todo.user_id === valid.id) {
        const deletedTodo = await Todo.deleteOne({ _id: req.params.id })
        res.json(deletedTodo)
    } else {
        res.status(401).json("Error: Unauthorized access");
    }
})

module.exports = router