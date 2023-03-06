const crypto = require("crypto");

function generateApiKey(payload) {
  return crypto.createHash("sha256").update(payload).digest("hex");
}

module.exports = generateApiKey;