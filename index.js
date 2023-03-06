if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const connectDb = require("./@helpers/db");
const { register } = require("./controllers/auth.controller");
const { verifyAuth, verifyApiKey } = require("./middlewares/basic_auth");
const ticketRouter = require("./routes/ticket.router");
const trainRouter = require("./routes/train.router");

const app = express();
connectDb();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const api_version = "v1";
app.post(`/${api_version}/auth/signup`, register);

app.use(verifyApiKey);
app.get(`/${api_version}`, (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: "Welcome to ticketing API service v1",
  });
})


app.use(`/${api_version}/trains`, trainRouter);
app.use(`/${api_version}/tickets`, ticketRouter);

// error middleware

app.use((error, req, res, next) => {
  const statusCode = error.statusCode ? error.statusCode : 500;
  let message = error.message;
  if (statusCode == 500) {
    message = "An error occured on our server, we have been notified";
  } 

  res.status(statusCode).json({
    status: "error",
    message: message,
    error_code: statusCode,
    data: null
  });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ticketingAPIService is running on port ${PORT}`);
})

module.exports = app;