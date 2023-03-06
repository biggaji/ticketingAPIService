const { book, change_class, cancel } = require("../controllers/ticket.controller");

const ticketRouter = require("express").Router();

ticketRouter.post(`/book`, book)
ticketRouter.delete(`/cancel/:ticket_id`, cancel);
ticketRouter.patch(`/change_class/:ticket_id`, change_class)

module.exports = ticketRouter;