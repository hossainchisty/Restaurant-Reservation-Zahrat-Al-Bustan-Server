const express = require("express");
const app = express();
const port = 3000;

// Set up middleware, controllers, and routes
// const authMiddleware = require('./src/application/middlewares/authMiddleware');
// const userController = require('./src/application/controllers/userController');
// const userRoutes = require('./src/interfaces/api/routes/user');

app.use(express.json());
// app.use(authMiddleware);
// app.use('/users', userRoutes);

app.get("", (req, res) => {
  res.send({
    message: 'Oky bad boy!'
  })
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
