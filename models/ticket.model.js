const mongoose = require("mongoose");

const { Schema } = mongoose;

const TicketSchema = new Schema({
  train_id: {
    type: String,
    required: true,
  },
  ticket_number: {
    type: String,
    required: true,
  },
  journey_date: {
    type: String,
    required: true,
  },
  departure_station: {
    type: String,
    required: true,
  },
  arrival_station: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    enum: ["FIRST", "BUSINESS"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  passenger_name: {
    type: String,
    required: true,
  },
  passenger_email: {
    type: String,
    required: true,
  },
  booking_date: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now()
  },
});

const ticketModel = mongoose.model('ticket', TicketSchema);

module.exports = ticketModel;