import OpenAI from "openai";
import { config } from "dotenv";
import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { wrapFetchWithPayment } from "x402-fetch";

config();

const privateKey = process.env.PRIVATE_KEY as Hex;
console.log("🚀 ~ privateKey:", privateKey)
const baseURL = process.env.RESOURCE_SERVER_URL as string; 
console.log("🚀 ~ baseURL:", baseURL)
const apiKey = process.env.OPENAI_API_KEY as string;
console.log("🚀 ~ apiKey:", apiKey)

if (!baseURL || !privateKey) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const account = privateKeyToAccount(privateKey);

const openai = new OpenAI({
  baseURL, // where your x402-enabled proxy is running
  apiKey: apiKey, // request is signed, so a key isn’t required
  fetch: wrapFetchWithPayment(fetch, account),
});

(async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // pick any model exposed by your proxy
      max_tokens: 1024,
      messages: [
        { role: "user", content: "Hello chat, — do you know what x402 is?" },
      ],
    });
    console.log(completion);
  } catch (err) {
    console.error(err);
  }
})();
