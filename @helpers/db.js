const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`Database connected`);
  } catch (error) {
    console.log(`${error.name} <> ${error.message}`);
  }
}

module.exports = connectDb;