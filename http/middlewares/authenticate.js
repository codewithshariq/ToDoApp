const jwt = require("jsonwebtoken");

verify = function (req, res, next) {
  let accessToken = req.headers["x-access-token"];
  if (!accessToken) {
    return res.status(403).send();
  }
  try {
    let { userId, name, email } = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.body["userDetails"] = { userId, name, email };
    next();
  } catch (e) {
    return res.status(401).send(e);
  }
};

module.exports = verify;
