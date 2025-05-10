// import { createWalletClient, Hex, http } from "viem";
// import { privateKeyToAccount } from "viem/accounts";
// import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";
// import axios from "axios";

// import { config } from "dotenv";
// config();

// const privateKey = process.env.PRIVATE_KEY as Hex;
// console.log("🚀 ~ privateKey:", privateKey);

// const account = privateKeyToAccount(privateKey);

// const url = "http://localhost:4021";
// const endpointPath = "/test";

// async function main() {
//   const api = withPaymentInterceptor(
//     axios.create({
//       baseURL: url,
//     }),
//     account
//   );

//   api
//     .get(endpointPath)
//     .then((response) => {
//       console.log(response.data);

//       const paymentResponse = decodeXPaymentResponse(
//         response.headers["x-payment-response"]
//       );
//       console.log(paymentResponse);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// await main();

import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { wrapFetchWithPayment, decodeXPaymentResponse } from "x402-fetch";

// const privateKey = process.env.PRIVATE_KEY as Hex;
// if (!privateKey) {
//   throw new Error("Missing environment variables");
// }
const url = "http://localhost:4021";
const endpointPath = "/test";
const account = privateKeyToAccount(
  "0x0b9d9eeee8ebf54efdcd242ded9ce35193983dcca4afbe98367e5dcb11c93ce7"
);

async function main() {
  const fetchWithPayment = wrapFetchWithPayment(fetch, account);

  const res = await fetchWithPayment(url.concat(endpointPath), {
    //url should be something like https://api.example.com/paid-endpoint
    method: "GET",
  });
  console.log("🚀 ~ res ~ res:", res);
  const body = await res.json();
  console.log("🚀 ~ main ~ body:", body);

  const paymentResponse = decodeXPaymentResponse(
    res.headers.get("x-payment-response")!
  );

  // .then(async (response) => {
  //   console.log(response);
  //   const body = await response.json();
  //   console.log(body);
  //   console.log(response);
  //   // const paymentResponse = decodeXPaymentResponse(
  //   //   response.headers.get("x-payment-response")!
  //   // );
  //   // console.log(paymentResponse);
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
}
main();
