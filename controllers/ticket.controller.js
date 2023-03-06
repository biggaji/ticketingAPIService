const { ValidationException } = require("../@helpers/errorHandlers");
const TicketService = require("../services/ticket.service");

const ticketService = new TicketService();


async function book(req, res, next) {
  try {

    const { passenger_name, passenger_email, train_id } = req.body;

    if (!train_id) {
      throw new ValidationException("train id is required", 400);
    }

    if (!passenger_email) {
      throw new ValidationException("passenger name is required", 400);
    }

    if (!passenger_name) {
      throw new ValidationException("passenger name is required", 400);
    }

    if (!req.body.class) {
      throw new ValidationException("cabin class is required", 400);
    }

    const results = await ticketService.book(req.body);

    res.status(201).json({
      status: "success",
      message: "Ticket booked successfully",
      data: results
    });
  } catch (error) {
    next(error)
  }
}

async function cancel(req, res, next) {
  try {

    if (!req.params.ticket_id) {
      throw new ValidationException("ticket id is required", 400);
    }

    const results = await ticketService.cancel(req.params.ticket_id);

    res.status(200).json({
      status: "success",
      message: "ticket deleted",
      data: results
    });
  } catch (error) {
    next(error);
  }
}

async function change_class(req, res, next) {
  try {

    if (!req.params.ticket_id) {
      throw new ValidationException("ticket id is required", 400);
    }

    if (!req.body.class) {
      throw new ValidationException("class to change to is required", 400);
    }

    const results = await ticketService.change_class(req.params.ticket_id, req.body.class);

    res.status(200).json({
      status: "success",
      message: "ticket updated",
      data: results
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { book, cancel, change_class };