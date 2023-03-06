const { NotFoundException } = require("../@helpers/errorHandlers");
const ticketModel = require("../models/ticket.model");
const trainModel = require("../models/train.model");

class TicketService {
  constructor() {}

  async book(payload) {
    try {
      const { train_id, passenger_name, passenger_email } = payload;

      const train = await trainModel.findOne({ train_id }).exec();

      if (!train) {
        throw new Error("Train not found");
      }

      const randomInt1 = Math.floor(Math.random() * 10) + 1;
      const randomInt2 = Math.floor(Math.random() * 10) + 1;
      const randomInt3 = Math.floor(Math.random() * 10) + 1;
  
      const ticket_number = `TICKET_${randomInt1}${randomInt2}${randomInt3}`;

      const data = {};

      data.departure_station = train.routes[0].departure_station;
      data.arrival_station = train.routes[0].arrival_station;
      data.journey_date = train.routes[0].journey_date;

      if (payload.class === "FIRST") {
        data.price = train.ticket_classes[1].price
      } else {
        data.price = train.ticket_classes[0].price
      }

      const ticket = new ticketModel({
        train_id,
        class: payload.class,
        passenger_email,
        passenger_name,
        ticket_number,
        ...data
      })

      await ticket.save();

      return ticket;

    } catch (error) {
      throw error;
    }
  }

  async cancel(ticket_id) {
    try {
      const ticket = await ticketModel.findOne({ _id: ticket_id }).exec();

      if (!ticket) {
        throw new NotFoundException("Ticket not found", 404);
      }

      const delete_ticket = await ticketModel.deleteOne({ _id: ticket_id }).exec();

      return delete_ticket;

    } catch (error) {
      throw error;
    }
  }

  async change_class(ticket_id, ticket_class) {
    try {

      const ticket = await ticketModel.findOne({ _id: ticket_id }).exec();

      if (!ticket) {
        throw new NotFoundException("Ticket not found", 404);
      }

      const train = await trainModel.findOne({ train_id: ticket.train_id }).exec();

      if (!train) {
        throw new Error("Train not found");
      }

      let price;
      
      if (ticket_class === "BUSINESS") {
        price = train.ticket_classes[0].price;
      } else {
        price = train.ticket_classes[1].price;
      }

      const ticket_update = await ticketModel.updateOne({ _id: ticket_id }, { class: ticket_class, price }).exec()
      return ticket_update;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketService;