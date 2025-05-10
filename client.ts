import { createWalletClient, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";
import axios from "axios";

import { config } from "dotenv";
config();

const privateKey = process.env.PRIVATE_KEY as Hex;
console.log("🚀 ~ privateKey:", privateKey);
// Create a wallet client (using your private key)
const account = privateKeyToAccount(privateKey);

const url = "http://localhost:4021";
const endpointPath = "/weather"; // e.g. /paid-endpoint

async function main() {
  // Create an Axios instance with payment handling
  const api = withPaymentInterceptor(
    axios.create({
      baseURL: "http://localhost:4021", // ✅ use baseURL
    }),
    account
  );

  // await api.get("/weather");

  // console.log("🚀 ~ url:", account);
  // console.log("🚀 ~ api:", api);
  api
    .get(endpointPath) // e.g. /paid-endpoint
    .then((response) => {
      console.log("data", response.data);

      const paymentResponse = decodeXPaymentResponse(
        response.headers["x-payment-response"]
      );
      console.log("response:", paymentResponse);
    })
    .catch((error) => {
      console.error(error.response?.data?.error);
    });
}

await main();
