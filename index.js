const express = require("express");
const port = 3000;
const dotenv = require("dotenv").config();
// Database connection with mongoose
const connectDB = require("./src/infrastructure/dataSources/database");
connectDB();
// Set up middleware, controllers, and routes
const { errorHandler } = require("./src/application/middlewares/errorMiddleware");

// Express app initialization
const app = express();
app.use(express.json());
app.use(errorHandler);
// app.use('/users', userRoutes);

app.get("", (req, res) => {
  res.send({
    message: "Oky bad boy!",
  });
});

// Undefined Route Implement
app.use("*",(req,res)=>{
  res.status(404).json({status:"fail",data:"Not Found"})
})

app.use("/api/v1/", require("./src/application/routers/routers"));

// Practice Mongodb database
// run();
// async function run() {
//   try {
//     const reservation = await Reservation.create({
//       full_name: "Reza",
//       email: "Reza@gmail.com",
//       phone_number: "+8801537377306",
//       date: 3 / 14 / 2023,
//       time: "8.00PM",
//       branch: 'Baddubai',
//     });
//     console.log(reservation);
//     // const data = await Reservation.find({});
//     // console.log(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
