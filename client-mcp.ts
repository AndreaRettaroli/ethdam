// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import axios from "axios";
// import { Hex } from "viem";
// import { privateKeyToAccount } from "viem/accounts";
// import { withPaymentInterceptor } from "x402-axios";
// import { config } from "dotenv";

config();

const privateKey = process.env.PRIVATE_KEY as Hex;
const baseURL = process.env.RESOURCE_SERVER_URL as string;
const endpointPath = process.env.ENDPOINT_PATH as string;

if (!privateKey || !baseURL || !endpointPath) {
  throw new Error("Missing environment variables");
}

const account = privateKeyToAccount(privateKey);
// // console.log("Account address:", account.address);

// const client = withPaymentInterceptor(axios.create({ baseURL }), account);

// // Create an MCP server
// const server = new McpServer({
//   name: "x402 MCP Client Demo",
//   version: "1.0.0",
// });

// // Add an addition tool
// server.tool(
//   "get-data-from-resource-server",
//   "Get data from the resource server (in this example, the weather)", //change this description to change when the client calls the tool
//   {},
//   async () => {
//     const res = await client.get(endpointPath);
//     return {
//       content: [{ type: "text", text: JSON.stringify(res.data) }],
//     };
//   }
// );
// process.on("uncaughtException", (err) => console.error(err));
// process.on("unhandledRejection", (err) => console.error(err));

// const transport = new StdioServerTransport();
// await server.connect(transport);

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import { createWalletClient, Hex, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { decodeXPaymentResponse, withPaymentInterceptor } from "x402-axios";
import { config } from "dotenv";

// config();

// const privateKey = process.env.PRIVATE_KEY as Hex;
// const baseURL = process.env.RESOURCE_SERVER_URL as string;
// const endpointPath = process.env.ENDPOINT_PATH as string;

// if (!privateKey || !baseURL || !endpointPath) {
//   throw new Error("Missing environment variables");
// }

// // Create wallet client
// const wallet = createWalletClient({
//   chain: baseSepolia,
//   transport: http(),
//   account: privateKeyToAccount(privateKey as Hex),
// }).extend(publicActions);

// Create Axios instance with payment handling
const client = withPaymentInterceptor(
  axios.create({ baseURL: baseURL }),
  account
);

// Create MCP server
const server = new McpServer({
  name: "x402 MCP Client Demo",
  version: "1.0.0",
});

server.tool(
  "get-data-from-resource-server",
  "Get data from the resource server (in this example, the weather)",
  {},
  async () => {
    try {
      const res = await client.get(endpointPath);
      // console.error("res:", res);
      // console.error(
      //   "x402 payment:",
      //   decodeXPaymentResponse(res.headers["x-payment-response"])
      // );
      return { content: [{ type: "text", text: JSON.stringify(res.data) }] };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { content: [{ type: "text", text: "Error fetching data" }] };
    }
  }
);

// process.on("uncaughtException", (e) => console.error(e));
// process.on("unhandledRejection", (e) => console.error(e));

// Connect to MCP transport
const transport = new StdioServerTransport();
await server.connect(transport);
