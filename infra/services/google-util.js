const { google } = require("googleapis");
const googleConfig = require("../../config/google-api");

class GoogleApi {
  static createConnection() {
    return new google.auth.OAuth2(
      googleConfig.CLIENT_ID,
      googleConfig.CLIENT_SECRET,
      googleConfig.AUTH_REDIRECT
    );
  }

  static defaultScope = [
    "https://www.googleapis.com/auth/plus.me",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  static getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: ["profile", "email"],
    });
  }

  static urlGoogle() {
    const auth = this.createConnection(); // this is from previous step
    const url = this.getConnectionUrl(auth);
    return url;
  }

  static getGooglePeopleApi(auth) {
    return google.people({ version: "v1", auth });
  }

  static async getGoogleAccountFromCode(code) {
    const auth = this.createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);

    const peopleApi = this.getGooglePeopleApi(auth);
    const me = await peopleApi.people.get({
      resourceName: "people/me",
      personFields: ["emailAddresses", "names"],
    });

    const name =
      me.data.names && me.data.names.length && me.data.names[0].displayName;
    const userGoogleEmail =
      me.data.emailAddresses &&
      me.data.emailAddresses.length &&
      me.data.emailAddresses[0].value;

    return {
      name: name,
      email: userGoogleEmail,
      //   tokens: tokens,
    };
  }
}

module.exports = GoogleApi;
