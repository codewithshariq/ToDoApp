const { jwtConfig, serverConfig } = require("../../config");
const { UserService } = require("../../application");
const UserFactory = require("../database/factories/UserFactory");

const userService = new UserService(UserFactory.getRepo(serverConfig.db));

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtConfig.ACCESS_TOKEN_SECRET;

const initialize = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await userService.getUserById(jwt_payload.userId);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

module.exports = initialize;
