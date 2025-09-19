import pkg from "googleapis";
const { google } = pkg;

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  process.env.CLIENT_URL
);

async function getGoogleUserInfo(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
  const { data: user } = await oauth2.userinfo.get();

  return user;
}

export default getGoogleUserInfo;
