const { addTrain,  getScheduleForTrain } = require("../controllers/train.controller");
const TrainService = require("../services/train.service");

const trainRouter = require("express").Router();

trainRouter.post(`/`, addTrain)
trainRouter.get(`/:train_id/schedules`, getScheduleForTrain);

module.exports = trainRouter;