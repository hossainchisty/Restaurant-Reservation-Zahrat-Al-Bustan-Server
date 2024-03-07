const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Database connection with mongoose
const connectDB = require('./config/db');
connectDB();
// Set up middleware, controllers, and routes
const { errorHandler } = require('./middlewares/errorMiddleware');

// Server Port
const port = process.env.PORT || 5000;

// Routers
const chefRouters = require('./routers/chefRouters');
const campaignRouters = require('./routers/marketing/campaignRouters');
const categoryRouters = require('./routers/categoryRouters');
const reservationRouters = require('./routers/reservationRouters');
const subscriptionRouters = require('./routers/subscriptionRouters');
const promoCodeRouters = require('./routers/promoCodeRouters');

// Express app initialization
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Application routes
app.use('/api/v1/chef/', chefRouters);
app.use('/api/v1/subscription/', subscriptionRouters);
app.use('/api/v1/our/campaign/', campaignRouters);
app.use('/api/v1/category/', categoryRouters);
app.use('/api/v1/promocode/', promoCodeRouters);
app.use('/api/v1/reservation/', reservationRouters);

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ statusCode: 200, success: true, data: 'Health ✅' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
