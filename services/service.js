const reservationRepository = require("../../infrastructure/repositories/repository");

// Service for reservations
class reservationService {
  constructor(reservationRepository) {
    console.log("Service");
    this.reservationRepository = reservationRepository;
  }

  async createReservation(reservation) {
    const createdreservation = await this.reservationRepository.create(
      reservation
    );

    return createdreservation;
  }

  async getAllreservations() {
    const reservations = await this.reservationRepository.readAll();

    return reservations;
  }

  async getreservationById(id) {
    const reservation = await this.reservationRepository.readById(id);

    if (!reservation) {
      throw new Error(`reservation with ID ${id} not found`);
    }

    return reservation;
  }

  async updatereservation(reservation) {
    const updatedreservation = await this.reservationRepository.update(
      reservation
    );

    if (!updatedreservation) {
      throw new Error(`reservation with ID ${reservation.id} not found`);
    }

    return updatedreservation;
  }

  async deletereservation(id) {
    const deletedreservation = await this.reservationRepository.delete(id);
    if (!deletedreservation) {
      throw new Error(`reservation with ID ${id} not found`);
    }

    return deletedreservation;
  }
}

module.exports =  reservationService ;
