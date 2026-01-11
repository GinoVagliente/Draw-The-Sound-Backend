import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

let accessToken = null;
let tokenExpiration = null;

export async function getAccessToken(forceRefresh = false) {
  const now = Date.now();

  if (accessToken && tokenExpiration && now < tokenExpiration && !forceRefresh) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: { grant_type: "client_credentials" },
        auth: { username: clientId, password: clientSecret },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiration = now + response.data.expires_in * 1000;

    console.log("Token generated");
    return accessToken;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
}
