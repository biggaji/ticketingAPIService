const mongoose = require("mongoose");
const generateApiKey = require("../@helpers/apiGen");

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  access_role:  {
    type:  String,
    enum: ["user", "admin"],
    default: "user",
  },
  apiKey: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

AuthSchema.pre('save', function(next) {
  try {
    const apikey = generateApiKey(`${this.username}:${this.pwd}`);
    this.apiKey = apikey;
    next();
  } catch (error) {
    next(error);
  }
});

const authModel = mongoose.model("auth", AuthSchema);

module.exports = authModel;