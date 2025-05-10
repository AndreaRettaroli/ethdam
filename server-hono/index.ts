import { config } from "dotenv";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { paymentMiddleware, Network, Resource } from "x402-hono";

config();

const facilitatorUrl = "https://x402.org/facilitator";
const payTo = "0x3147297a3DCb4a19012428A8A3711eAE96bEd0a5";

if (!facilitatorUrl || !payTo) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = new Hono();

console.log("Server is running");

app.use(
  paymentMiddleware(
    payTo,
    {
      "/weather": {
        price: "$0.001",
        network: "base-sepolia",
      },
      "/test": {
        price: "$0.005",
        network: "base-sepolia",
      },
    },
    {
      url: facilitatorUrl,
    }
  )
);

app.get("/weather", (c) => {
  return c.json({
    report: {
      weather: "sunny",
      temperature: 70,
    },
  });
});

app.get("/test", (c) => {
  return c.json({
    report: {
      value: "hallo",
    },
  });
});

serve({
  fetch: app.fetch,
  port: 4021,
});
