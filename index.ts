// import express from "express";
// import { paymentMiddleware, Network } from "x402-express";

// const app = express();

// const andrea = "0x3147297a3DCb4a19012428A8A3711eAE96bEd0a5";
// const federico = "0x6b91931BCA13828b915517c9555A3046dfCa79F3";

// app.use(
//   paymentMiddleware(
//     //andrea
//     //federico
//     andrea, // your receiving wallet address
//     {
//       // Route configurations for protected endpoints
//       "GET /weather": {
//         // USDC amount in dollars
//         price: "$0.001",
//         network: "base-sepolia",
//         // config: {
//         //   maxTimeoutSeconds: 300,
//         // },
//       },
//     },
//     {
//       url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet.
//     }
//   )
// );

// // Implement your route
// app.get("/weather", (req, res) => {
//   res.send({
//     report: {
//       weather: "sunny",
//       temperature: 70,
//     },
//   });
// });

// app.listen(4021, () => {
//   console.log(`Server listening at http://localhost:4021`);
// });

import express from "express";
import { paymentMiddleware, Network } from "x402-express";

const app = express();

app.use(paymentMiddleware(
  "0x3147297a3DCb4a19012428A8A3711eAE96bEd0a5", // your receiving wallet address 
  {  // Route configurations for protected endpoints
      "GET /weather": {
        // USDC amount in dollars
        price: "$0.001",
        network: "base-sepolia",
      },
    },
  {
    url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet. 
  }
));

// Implement your route
app.get("/weather", (req, res) => {
  res.send({
    report: {
      weather: "sunny",
      temperature: 70,
    },
  });
});

app.listen(4021, () => {
  console.log(`Server listening at http://localhost:4021`);
});