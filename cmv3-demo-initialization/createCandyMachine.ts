import {
  Metaplex,
  PublicKey,
  toBigNumber,
  keypairIdentity,
  sol,
  toDateTime,
  getMerkleRoot,
  token,
  CandyGuardsSettings,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { writeFileSync } from "fs";

(async function () {
  const cache = require("./cache.json");
  // if (cache.program)
  //   return console.log("Program already found in your cache, exiting...");

  const allowList = require("./allowlist.json");
  const demoNftCollection = new PublicKey(
    "AVkcdHB4dgsKJvMBNCQx5i6gofMm5anzJhuwpRg4vCWG"
  );
  const demoTokenMint = new PublicKey(
    "DYMs37sUJz65KmYa31Wzj2TKcTe5M5rhvdkKgcKWiEAs"
  );
  const demoDestination = new PublicKey(
    "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF"
  );

  const key = Keypair.fromSecretKey(Uint8Array.from(require("./key.json")));
  const { number, creators, ...config } = require("./config.json");

  const metaplex = Metaplex.make(new Connection(clusterApiUrl("devnet"))).use(
    keypairIdentity(key)
  );
  config.creators = creators.forEach((c) => {
    c.address = new PublicKey(c.address);
  });
  const collectionMint = cache.program?.collectionMint
    ? new PublicKey(cache.program?.collectionMint)
    : (
        await metaplex.nfts().create({
          name: "Numbers Collection",
          uri: "https://arweave.net/TKpUAanj-YoFdZ1Dx-UFkJ6GrBBjedWnrmPfwbuPbkg",
          creators: [
            {
              "address": "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF",
              "share": 100
            }
          ],
          sellerFeeBasisPoints: 500,
          isCollection: true,
          updateAuthority: key,
        })
      ).nft.address;
  const createOrUpdateCandyMachine = async (
    config: CandyGuardsSettings & any,
    {
      candyMachine,
      candyGuard,
    }: { candyMachine?: string; candyGuard?: string } = {}
  ): Promise<{ candyMachine: PublicKey; candyGuard?: PublicKey }> => {
    if (candyMachine) {
      // await metaplex.candyMachines().update({
      //   candyMachine: new PublicKey(candyMachine),
      //   ...config,
      // });
      if (candyGuard) {
        await metaplex.candyMachines().updateCandyGuard({
          candyGuard: new PublicKey(candyGuard),
          ...config,
        });
      }
      return {
        candyMachine: new PublicKey(candyMachine),
        candyGuard: candyGuard && new PublicKey(candyGuard),
      };
    } else {
      return metaplex
        .candyMachines()
        .create(config)
        .then(({ candyMachine }) => ({
          candyMachine: candyMachine.address,
          candyGuard: candyMachine.candyGuard?.address,
        }));
    }
  };
  // Create the Candy Machine.
  const { candyMachine, candyGuard } = await createOrUpdateCandyMachine(
    {
      ...config,
      itemsAvailable: toBigNumber(number),
      collection: {
        address: collectionMint,
        updateAuthority: key,
      },
      guards: {
        startDate: {
          date: toDateTime("2023-03-03 05:00:00 +0000"),
        },
      },
      groups: [
        {
          label: "10",
          guards: {
            solPayment: {
              value: 0.1,
              destination: "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF",
            },
            startDate: {
              date: toDateTime("2023-03-03 05:00:00 +0000"),
            },
            allowlist: {
              merkleRoot: "86553717b69b1370209256c8f4c440fd3ff7c7055a49fc8465858f4ffd2c282b",
            },
          },
        },
        {
          label: "100",
          guards: {
            solPayment: {
              value: 0.15,
              destination: "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF",
            },
            startDate: {
              date: toDateTime("2023-03-03 05:00:00 +0000"),
            },
            allowlist: {
              merkleRoot: "d2cfec2117fa8a44390868c14e00deef13388cba80e201cf393a2dcb8eeef36f",
            },
          },
        },
        {
          label: "500",
          guards: {
            solPayment: {
              value: 0.2,
              destination: "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF",
            },
            startDate: {
              date: toDateTime("2023-03-03 05:00:00 +0000"),
            },
            allowlist: {
              merkleRoot: "c1b44c2f7e13bd86d5cef332d8ae51c77145f937a2d2681c8bb3cdf131f356d3",
            },
          },
        },
        {
          label: "FC",
          guards: {
            solPayment: {
              value: 0.25,
              destination: "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF",
            },
            startDate: {
              date: toDateTime("2023-03-03 05:00:00 +0000"),
            },
            allowlist: {
              merkleRoot: "e54eff527272719496361b3cccd8e5e1e97a5a07eb07feda431a5db614c8b0f9",
            },
          },
        },
        {
          label: "EC",
          guards: {
            solPayment: {
              value: 0.3,
              destination: "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF",
            },
            startDate: {
              date: toDateTime("2023-03-03 05:00:00 +0000"),
            },
            allowlist: {
              merkleRoot: "edba5b25d6a9896cc3970b0e9ba4687eff24dcb7fe5bcad7567c0cae693fe688",
            },
          },
        },
        {
          label: "PM",
          guards: {
            solPayment: {
              value: 0.35,
              destination: "CrnXZQaC5auxPKLd99w1T9cKbjMvNgfKmkBvE46EnFRF",
            },
            startDate: {
              date: toDateTime("2023-03-03 05:00:00 +0000"),
            },
          },
        },
      ],
    },
    cache.program || {}
  );
  cache.program = {
    candyMachine: candyMachine.toString(),
    candyGuard: candyGuard.toString(),
    candyMachineCreator: key.publicKey.toString(),
    collectionMint: collectionMint.toString(),
  };
  writeFileSync("./cache.json", JSON.stringify(cache, null, 2));
})();
