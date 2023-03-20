const reservationService = require("../../domain/services/service");

// Reservation controllers
class ReservationController {
  constructor(reservationService) {
    this.reservationService = reservationService;
  }

  createItem = async (req, res, next) => {
    try {
      const item = req.body;
      console.log(item);
      const createdItem = await this.reservationService.createReservation(item);
      res.status(201).json(createdItem);
    } catch (error) {
      next(error);
    }
  };

  getAllItems = async (req, res, next) => {
    console.log("controllers");
    try {
      const items = await this.reservationService.getAllreservations();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  };

  getItemById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const item = await this.reservationService.getreservationById(id);
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  };

  updateItem = async (req, res, next) => {
    try {
      const item = req.body;
      const updatedItem = await this.reservationService.updatereservation(item);
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  };

  deleteItem = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedItem = await this.reservationService.deletereservation(id);
      res.status(200).json(deletedItem);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ReservationController;
