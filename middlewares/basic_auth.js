const { InvalidOrExpiredAuthToken, AuthForbiddenException } = require("../@helpers/errorHandlers");
const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs")

async function verifyAuth(req, res, next) {
  try{
    if (!req.headers.authorization) {
      throw new InvalidOrExpiredAuthToken("auth token missing", 403);
    }
  
    const token = req.headers.authorization.split(" ")[1];

    const userCred = Buffer.from(token, "base64").toString();

    const username = userCred.split(":")[0];
    const pass = userCred.split(":")[1];

    const auth = await authModel.findOne({ username: username.toLowerCase() }).exec();

    if (!auth) {
      throw new AuthForbiddenException("access denied", 403);
    }

    const isPassword = await bcrypt.compare(pass, auth.pwd);

    if (!isPassword) {
      throw new InvalidOrExpiredAuthToken("invalid or expired creds", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function verifyApiKey(req, res, next) {
  try {
    if (!req.headers.devapikey) {
      throw new InvalidOrExpiredAuthToken("api key is missing", 403);
    }

    const apiKey = req.headers.devapikey;

    const userAuth = await authModel.findOne({ apiKey: apiKey }).exec();

    if (!userAuth) {
      throw new AuthForbiddenException("invalid api key: access denied", 403);
    }

    next();
  } catch(error) {
    next(error);
  }
}

module.exports = {
  verifyAuth,
  verifyApiKey
}