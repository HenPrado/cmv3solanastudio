import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ||
  WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;
// const network = WalletAdapterNetwork.Devnet;
export const rpcHost =
  process.env.NEXT_PUBLIC_RPC_HOST || clusterApiUrl(network);

export const candyMachineId = new PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID ||
    "5vyoZ3vVrsVqzY2JcNvxRHyfA36x8Bu12etfiP7Yjsnz"
);
export const defaultGuardGroup =
  process.env.NEXT_PUBLIC_DEFAULT_GUARD_GROUP || undefined; // undefined means default

// "qasJ6jhgtngKk2QnEPdDjuFH8NMoM58W8TxPBXAChPY"
// "3zwFR3spiwbSSMtvVKG2bRT6ttqFoC3MHCafGP8ZrdLz"
// "DAA8yRLu7acVs3kxaTyCjoEjNWGinLaCKVhDY29ASNua"

export const whitelistedWallets = [
  "3s1kMoajrGEFgNV65rA4Gu8gXXAFzH3g2FtmBxP4ciKn",
  "3sCdgq2CmfUmXjjaHgmd2L2ovtBqLLkVFxc4w7SRgCtz",
  "3sD4cf43Fudq5EygHZCSnUUBmgi6eSJUKpWqfKeVhyBo",
  "3smqDN3MSH21dPG8MNjxcaCrQGu5QcDgpB1RFfxV728a",
  "3snwKhqXpG7pMH4Hq6PRhuSMGAASQQz8uaqksAo1rFWL",
  "3sqCjJoQtiq7Lf16XWSpPVXL4deooynvQETNKtMdQmRN",
  "3sT87diTMHE7D1PmdVbgM3d8MJ1TEzLBHN9kJnpXGnJF",
  "3stApeMJ9YPYdrGr9HknoW192v9LAizxVyaHXLWSZio5",
  "3sv4S2WNRCesaJSA3TnaRCKaAB1kCcpvPReqQ1A7RgiM",
  "3swUC7ShbrTFb3qmWGAzDcK9ehjpZRjhNsBgnSKW3M6M",
];
