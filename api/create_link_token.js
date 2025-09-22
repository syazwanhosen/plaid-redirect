import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);


export default async function handler(req, res) {
  try {
    const { redirect_uri } = req.body;

    const response = await client.linkTokenCreate({
      user: { client_user_id: "user-123" },
      client_name: "Dorsal App",
      products: ["auth",],
      language: "en",
      country_codes: ["US"],
      hosted_link: {
       is_mobile_app: true,
       completion_redirect_uri: redirect_uri
      },
      redirect_uri: "https://www.google.com"
    });

    res.json({ hosted_link_url: response.data.hosted_link_url });
  } catch (err) {
    console.error("Error creating link token:", error);
    res.status(500).json({ error: error.message });
  }
}
