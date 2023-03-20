const express = require("express");
const ReservationController = require("../controllers/controllers");
const reservationService = require("../../domain/services/service");

function ReservationRouters(reservationService) {
  console.log("Comming...");
  const listController = new ReservationController(reservationService);
  console.log(listController);
  const router = express.Router();

  router.post("/reservation", listController.createItem);
  router.get("/list", listController.getAllItems);
  router.get("/:id", listController.getItemById);
  router.put("/", listController.updateItem);
  router.delete("/:id", listController.deleteItem);

  return router;
}

module.exports = ReservationRouters;
