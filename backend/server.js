const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const port = process.env.POST || 5000
const usersRouter = require("./routes/User.routes");
const todosRouter = require("./routes/Todos.routes");

require("dotenv").config();

mongoose.connect(process.env.ATLAS_CONNECT_STRING);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established...")
})

app.use(cors())
app.use(express.json())
app.use('/users', usersRouter)
app.use('/todos', todosRouter)


app.listen(port, e => {
    if (e) throw e;
    console.log(`Server listening at ${port}`)
})