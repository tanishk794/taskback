const express = require("express"); 
const dotenv = require("dotenv");
const cors = require("cors"); 
const connectDB = require("./src/config/connectDb"); 
const authRoutes = require("./src/routes/authRoutes"); 
const taskRoutes = require("./src/routes/taskRoutes"); 

dotenv.config(); // load variables from .env file

connectDB(); // connect to MongoDB

const app = express(); 


app.use(
  cors({
    origin: "http://localhost:5173", //  React frontend's origin
    credentials: true, // allow cookies and auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  })
);

// middleware to parse incoming JSON in request bodies
app.use(express.json());

// route handler for authentication-related endpoints (/api/auth/register, /api/auth/login)
app.use("/api/auth", authRoutes);

// route handler for task-related endpoints (/api/tasks)
app.use("/api/tasks", taskRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
