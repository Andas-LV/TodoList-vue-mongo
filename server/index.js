const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {login} = require("./routes/login.js");
const {register} = require("./routes/register.js");
const {protectedPage} = require("./routes/protected.js");
const {create} = require("./task/create.js");
const {read} = require("./task/read.js");
const {update} = require("./task/update.js");
const {deleteTask} = require("./task/delete.js");

require('dotenv').config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

const uri = process.env.MONGO_URI;
const secret = process.env.SECRET;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.post("/register", async (req, res) => {
    register(req, res)
});

app.post('/login/', (req, res)=>{
    login(req, res)
})

app.get("/protected", (req, res) => {
    //
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication failed by cause of token" });
    }
    try {
        const payload = jwt.verify(token, secret);
        res.json({ message: `Hello, ${payload.username}! This is a protected route.` });
    } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
    }
});

app.post('/tasks/:userId', async (req, res) => {
    create(req, res)
});

app.get('/tasks/user/:userId', async (req, res) => {
    read(req, res)
});

app.put('/tasks/:taskId', async (req, res) => {
    update(req, res)
});

app.delete('/tasks/:taskId', async (req, res) => {
    deleteTask(req, res)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
