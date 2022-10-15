const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

const DB_CON = "mongodb://localhost:27017/Medicine"

// DB Connection
mongoose
  .connect(DB_CON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Database is not connected");
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected");
});

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Basic Testing Purposes
app.get("/", (req, res) => {
  res.json({
    message:
      "App backend is runing",
  });
});

// Import Routes
 const userRoutes = require("./routes/user");
 const medineRoutes = require('./Routes/medicine')
 const orderRoutes = require('./Routes/order')
 const addtocartRoutes = require('./Routes/cart')

// Use Routes
 app.use("/api", userRoutes);
 app.use("/api",medineRoutes)
 app.use("/api",orderRoutes)
 app.use("/api", addtocartRoutes)
 

// PORT
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
