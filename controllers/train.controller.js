const { ValidationException, NotFoundException } = require("../@helpers/errorHandlers");
const TrainService = require("../services/train.service");

const trainService = new TrainService();

async function addTrain(req, res, next) {
  try {

    // validation
    const { name, routes, ticket_classes } = req.body;
    if (!name) {
      throw new ValidationException("train name is required", 400);
    }

    if (!routes) {
      throw new ValidationException("routes are required required", 400);
    }

    if (!ticket_classes) {
      throw new ValidationException("ticket classes are required", 400);
    }

    const results = await trainService.addTrain(req.body);

    return res.status(201).json({
      status: "success",
      message: "Train added successfully",
      data: results
    });
  } catch (error) {
    next(error);
  }
}

async function getScheduleForTrain(req, res, next) {
  try {
    const results = await trainService.getScheduleForTrain(req.params.train_id);

    if (!results) {
      throw new NotFoundException("train not found", 404);
    }

    return res.status(200).json({
      status: "success",
      message: "Schedule fetched successfully",
      data: results
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { addTrain, getScheduleForTrain };