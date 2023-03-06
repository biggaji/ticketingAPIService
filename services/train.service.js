const { NotFoundException } = require("../@helpers/errorHandlers");
const trainModel = require("../models/train.model");

class TrainService {
  constructor() {}

  async addTrain(payload) {
    const { name, routes, ticket_classes } = payload;

    // check if train exist before

    const randomInt1 = Math.floor(Math.random() * 10) + 1;
    const randomInt2 = Math.floor(Math.random() * 10) + 1;
    const randomInt3 = Math.floor(Math.random() * 10) + 1;

    const train_id = `T${randomInt1}${randomInt2}${randomInt3}`;

    try {
      const train = new trainModel({
        name,
        train_id,
        ticket_classes,
        routes
      });

      await train.save();
      return train;
    } catch(e) {
      throw e;
    }
  }

  async getScheduleForTrain(train_id) {
    try {
      const stopsExpress = [
        {
          "station": "Philadelphia",
          "arrival_time": "2023-02-06T09:15:00Z",
          "departure_time": "2023-02-06T09:30:00Z"
        },
        {
          "station": "Washington DC",
          "arrival_time": "2023-02-06T09:45:00Z",
          "departure_time": "2023-02-06T10:00:00Z"
        }
      ];

      const stopsTrail = [
        {
          "station": "Abeokuta",
          "arrival_time": "2023-02-06T09:15:00Z",
          "departure_time": "2023-02-06T09:30:00Z"
        },
        {
          "station": "Omi-adio",
          "arrival_time": "2023-02-06T09:45:00Z",
          "departure_time": "2023-02-06T10:00:00Z"
        }
      ];

      let schedule;

      switch (train_id) {
        case "T449":
          schedule = stopsExpress;
          break;

        case "T365":
          schedule = stopsTrail;
          break;
      }

      return schedule;
    } catch(e) {
      throw e;
    }
  }

  async getSeatAvailibilty(train_id) {
    
  }
}

module.exports = TrainService;