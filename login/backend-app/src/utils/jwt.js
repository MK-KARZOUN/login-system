const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    "mySecretKey"
  );
};
module.exports = { generate: generateAccessToken };
