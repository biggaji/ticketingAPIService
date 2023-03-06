const mongoose = require("mongoose");

const { Schema } = mongoose;

const TrainSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  train_id: {
    type: String,
    required: true
  },
  routes: {
    type: [{
      journey_date: String,
      departure_station: String,
      arrival_station: String,
      departure_time: Date,
      arrival_time: Date,
    }],
    required: true
  },
  ticket_classes: {
    type: [{
      class_name:  {
        type: String,
        enum: ["FIRST", "BUSINESS"]
      } ,
      price: Number,
    }],
    required: true
  },
});

const trainModel = mongoose.model('train', TrainSchema);

module.exports = trainModel;