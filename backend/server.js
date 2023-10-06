const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// routes
const userRoutes = require("./routes/userRoutes");
const tasksRoutes = require("./routes/taskRoutes");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

// mongoose config
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB is ready : ${connection.connection.host}`);
    } catch (err) {
        console.log(`Connection error : ${err}`);
    }
};
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//app routes
app.use("/user", userRoutes);
app.use("/tasks", tasksRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => console.log(`Server running on port: ${port} !`));
