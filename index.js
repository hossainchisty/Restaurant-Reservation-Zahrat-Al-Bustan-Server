const express = require("express");
const dotenv = require("dotenv").config();
// Database connection with mongoose
const connectDB = require("./config/db");
connectDB();
// Set up middleware, controllers, and routes
const { errorHandler } = require("./middlewares/errorMiddleware");

// Server Port
const port = process.env.PORT || 5000;

// Routers
const chefRouters = require('./routers/chefRouters');
const campaignRouters = require('./routers/marketing/campaignRouters');
const categoryRouters = require('./routers/categoryRouters');
const reservationRouters = require('./routers/reservationRouters');
const subscriptionRouters = require('./routers/subscriptionRouters')

// Express app initialization
const app = express();
app.use(express.json());
app.use(errorHandler);


// Application routes
app.use("/api/v1/chef/", chefRouters);
app.use("/api/v1/subscription/", subscriptionRouters);
app.use("/api/v1/our/campaign/", campaignRouters);
app.use("/api/v1/category/", categoryRouters);
app.use("/api/v1/reservation/", reservationRouters);

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "Fail", data: "Not Found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
