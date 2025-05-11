import { create7702KernelAccount, create7702KernelAccountClient } from "@zerodev/ecdsa-validator";
import { createZeroDevPaymasterClient } from "@zerodev/sdk";
import { KERNEL_V3_3, KernelVersionToAddressesMap, getEntryPoint } from "@zerodev/sdk/constants";
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
   
const kernelVersion = KERNEL_V3_3;
const kernelAddresses = KernelVersionToAddressesMap[kernelVersion];
const entryPoint = getEntryPoint("0.7"); 

const pk = process.env.PRIVATE_KEY! as `0x${string}`
const pb2 = process.env.PUBLIC_KEY! as `0x${string}`
const rpc = process.env.RPC! as string
const account = privateKeyToAccount(pk);

const baseSepoliaPublicClient = createPublicClient({
  chain: baseSepolia,
  transport: http()
});


async function main() { 

if(!baseSepoliaPublicClient) {
    return "No Sepolia CLient initialization";
}  

const paymasterClient = createZeroDevPaymasterClient({
    chain: baseSepolia,
    transport: http(rpc),
  });

const authorization = await account.signAuthorization({
  chainId: baseSepolia.id,
  nonce: 0,
  address: kernelAddresses.accountImplementationAddress,
});

if(!authorization) {
    return "No authorization";
}

const kernelAccount = await create7702KernelAccount(baseSepoliaPublicClient, {
  signer: account,
  entryPoint,
  kernelVersion,
  eip7702Auth: authorization,
});

if(!kernelAccount) {
    return "No kernel account";
}

const kernelAccountClient = create7702KernelAccountClient({
  account: kernelAccount,
  chain: baseSepolia,
  bundlerTransport: http(rpc),
  paymaster: paymasterClient,
  client: baseSepoliaPublicClient,
});
if(!kernelAccountClient) {
    return "No kernel account client";
}
const tx = await kernelAccountClient.sendTransaction({
    account: kernelAccount as any,
    to: pb2,
    value: BigInt(0),
    chain: baseSepolia,
  })

  console.log("tx: "+tx)

}

main();
