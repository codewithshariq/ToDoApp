const { google } = require("googleapis");
const googleConfig = require("../../config/google-api");

class GoogleApi {
  constructor() {
    this.auth = new google.auth.OAuth2(
      googleConfig.CLIENT_ID,
      googleConfig.CLIENT_SECRET,
      googleConfig.AUTH_REDIRECT
    );
  }

  getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: ["profile", "email"],
    });
  }

  urlGoogle() {
    const url = this.getConnectionUrl(this.auth);
    return url;
  }

  getGooglePeopleApi(auth) {
    return google.people({ version: "v1", auth });
  }

  getGoogleAccountFromCode(code) {
    const data = await this.auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);

    const peopleApi = this.getGooglePeopleApi(this.auth);
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
    };
  }
}

module.exports = GoogleApi;
