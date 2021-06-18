const HttpError = require("../http/exceptions/HttpError");

class AuthService {
  constructor(jwtAuthService, googleAuthService, userService) {
    this.jwtAuthService = jwtAuthService;
    this.googleAuthService = googleAuthService;
    this.userService = userService;
  }

  generateAuthUrl() {
    return this.googleAuthService.googleAuthUrl();
  }

  async googleAuth(code) {
    const { name, email } =
      await this.googleAuthService.getGoogleAccountFromCode(code);
    const user = await this.userService.isUserRegistered(email);

    if (!user) {
      return await this.userService.createUser(name, email);
    }

    const accessToken = this.jwtAuthService.createToken(
      user._id,
      user.name,
      user.email
    );

    return { "access-token": accessToken };
  }

  async loginUser(email) {
    const user = await this.userService.isUserRegistered(email);

    if (!user) {
      throw new HttpError(400, "User with the given email is not registered.");
    }

    const accessToken = this.jwtAuthService.createToken(
      user._id,
      user.name,
      user.email
    );

    return { "access-token": accessToken };
  }
}

module.exports = AuthService;
