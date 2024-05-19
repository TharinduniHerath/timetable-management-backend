const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
//const connecttestDB = require("./config/dbConnectionTest");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

connectDb();

// middlewares
app.use(express.json());
app.use("/api/courses" , require("./routes/courseRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));
app.use("/api/sessions" , require("./routes/sessionRoutes"));
app.use("/api/bookings" , require("./routes/bookingRoutes"));
app.use("/api/notifications" , require("./routes/notificationRoutes"));
app.use(errorHandler);


module.exports = app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});